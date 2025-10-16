const { test } = require('@playwright/test')

test('Calender validation', async ({ page }) => {

    const date = "15";
    const month = "7";
    const year = "2027";
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();

    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const inputs = page.locator('.react-date-picker__inputGroup__input');
});