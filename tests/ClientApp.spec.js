const { test, expect } = require('@playwright/test')

test('Assignment for first test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const email = page.locator("#userEmail");
    const pass = page.locator("#userPassword");
    const login = page.locator("#login");

    await email.fill("infantom.sabadotechnologies@gmail.com");
    await pass.fill("Hello@123");
    await login.click();
    const items = page.locator(".card-body b")
    //console.log(await page.locator("[role='alert']").textContent());
    //await expect(await page.locator("[role='alert']").toContainText(" Incorrect email"));
    //console.log(await items.nth(1).textContent());

    await items.first().waitFor();
    await page.waitForLoadState('networkidle'); // Like implicit wait and explicit wait
    const allitem = await items.allTextContents();
    console.log(allitem);
});

test('DropDown checking', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const singIn = page.locator("input#signInBtn");

    await userName.fill("rahulshettyacadem");
    await password.fill("learning");

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Consultant");

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    console.log(await (page.locator(".radiotextsty").last()).isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await singIn.click();
});