const { test, expect } = require('@playwright/test')

test('Mymenu webside lunching ', async ({ page }) => {
    await page.goto("https://mymenu.ai/", { timeout: 30000, waitUntil: "domcontentloaded" });
    console.log(await page.title());
    await expect(page).toHaveTitle("MyMenu.AI - AI-Powered Restaurant Menu Pricing & Optimization");
    await page.locator('text=ABOUT').first().click();
   

   await page.locator("text=LET'S START").first().click();

   await page.locator("#menuname").fill("burger");
   await page.locator("#address").pressSequentially("abc");
   await page.locator("text=Abc 4th St, Aurora, Indiana 47001, United States").click();
   await page.locator("text=Abc 4th St, Aurora, Indiana 47001, United States").click();
   await page.getByRole("button",{name: 'Search'}).click();

   await page.locator(".result-item").first().waitFor();
   await page.locator("text= Expand All ").click();
});