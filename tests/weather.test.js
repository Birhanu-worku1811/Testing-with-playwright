const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Testing Weather.com one', async ({ page, browser }) => {
  const cityName = 'Addis Ababa';

  // Navigate to the website
  await page.goto('https://weather.com/', { waitUntil: 'domcontentloaded' });

  // Waiting for the search input to be visible
  await page.waitForSelector('input[placeholder="Search City or Zip Code"]');

  // Searching for a weather of Addis Ababa
  await page.fill('input[placeholder="Search City or Zip Code"]', cityName);

  // Locate and click the first item in the dropdown menu
  const firstDropdownItem = page.locator('#LocationSearch_listbox button');
  await firstDropdownItem.first().click();

  // Waiting till the search result appears with selector class name of the city name and timestamp
  const resultLocator = page.locator('h1.CurrentConditions--location--1YWj_');
  const timestampLocator = page.locator('span.CurrentConditions--timestamp--1ybTk');
  await resultLocator.waitFor({ state: 'visible' });

  // Verify the result using assertions
  await expect(resultLocator).toHaveText('Addis Ababa, Ethiopia');
  await expect(timestampLocator).toBeVisible();

  // Take a screenshot of the results
  await page.screenshot({ path: `screenshots/weather-${cityName}.png` });

  // Generate the PDF report
  await page.pdf({
    path: `pdfs/weather-${cityName}.pdf`,
    format: 'A4', 
    printBackground: true,
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px',
    },
  });

  // Mock API response 
  await page.route('**/api/weather/*', (route) => {
    const mockResponse = {
      location: {
        name: 'Addis Ababa',
        country: 'Ethiopia'
      },
      current: {
        temperature: 25,
        condition: 'Clear'
      }
    };
    route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify(mockResponse),
    });
  });

  // Handling multiple browser contexts
  const context2 = await browser.newContext(); 
  const page2 = await context2.newPage(); 
  await page2.goto('https://example.com'); 

  await page2.waitForTimeout(5000);

  // Closing browsers and contexts
  await page.close(); 
  await page2.close();
  await context2.close();
});
