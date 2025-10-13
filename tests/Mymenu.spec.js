const { test, expect } = require('@playwright/test')

test('Mymenu webside lunching ', async ({ page }) => {
    await page.goto("https://mymenu.ai/", { timeout: 30000, waitUntil: "domcontentloaded" });
    console.log(await page.title());
    await expect(page).toHaveTitle("MyMenu.AI - AI-Powered Restaurant Menu Pricing & Optimization");
    await page.locator('text=ABOUT').first().click();
});