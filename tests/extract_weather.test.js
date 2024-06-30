// extract-weather.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');

const cities = [
  'Addis Ababa',
  'Mekelle',
  'Gondar',
  'Bahir Dar',
  'Dire Dawa',
  'Awassa',
  'Jimma',
  'Harar',
  'Jijiga',
  'Arba Minch'
];

test('Extract weather information for Ethiopian cities', async ({ page }) => {
  // Array to hold the weather data
  const weatherData = [];

  // Loop through each city
  for (const cityName of cities) {
    // Navigate to the website
    await page.goto('https://weather.com/', { waitUntil: 'domcontentloaded' });

    // Wait for the search input to be visible
    await page.waitForSelector('input[placeholder="Search City or Zip Code"]');

    // Search for weather in a specific city
    await page.fill('input[placeholder="Search City or Zip Code"]', cityName);

    // Locate and click the first item in the dropdown menu
    const firstDropdownItem = page.locator('#LocationSearch_listbox button');
    await firstDropdownItem.first().click();

    // Wait for the specific search result content to appear
    const resultLocator = page.locator('h1.CurrentConditions--location--1YWj_');
    const temperatureLocator = page.locator('.CurrentConditions--tempValue--MHmYY');
    const conditionLocator = page.locator('.CurrentConditions--phraseValue--mZC_p');
    await resultLocator.waitFor({ state: 'visible' });

    // Extract the weather information
    const locationText = await resultLocator.innerText();
    const temperatureText = await temperatureLocator.innerText();
    const conditionText = await conditionLocator.innerText();

    // Collect weather data
    weatherData.push({
      city: cityName,
      location: locationText,
      temperature: temperatureText,
      condition: conditionText
    });

    // Wait for 2 seconds to avoid hitting rate limits
    await page.waitForTimeout(2000);
  }

  // Save all weather data to a single JSON file
  fs.writeFileSync('weather-data.json', JSON.stringify(weatherData, null, 2));

  await page.close();
  await context.close();
});
