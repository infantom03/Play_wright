// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 20 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium', //chromium
    headless: false,
    screenshot: 'on',
    trace:'retain-on-failure',
  },
});
