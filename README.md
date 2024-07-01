# Testing-with-playwright
# Weather.com Playwright Test Suite

This repository contains a Playwright test suite for testing weather information on the Weather.com website. The test suite includes features for mocking API responses, handling dynamic content and pagination, and managing multiple browser contexts.

## Features

- **Mock API Responses**: Simulate API responses for controlled testing.
- **Multiple Browser Contexts**: Test with isolated browser contexts to simulate different user sessions.
- Navigate to the website
- Search for weather in Addis Ababa city.
- Verify the results using assertions.
- Handle multiple browser contexts.
- Interact with elements (click, type).
- Take a screenshot of the results.
- Generate a PDF report.
- Mock API responses (for controlled testing).
- **Extract weather information of 10 Ethiopian cities**

## Prerequisites

Before you start, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (>= 16.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/weather-playwright-test.git
   cd weather-playwright-test
2. `npm install @playwright/test`
3. `npx playwright install`
4. `npx playwright test`
