const { test, expect } = require('@playwright/test')

test('Playwright special locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Hello@123");
    await page.getByRole("button", { name: 'Submit' }).click();
    const boo = await page.getByText(" The Form has been submitted successfully!").isVisible();
    expect(boo).toBeTruthy();
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
});