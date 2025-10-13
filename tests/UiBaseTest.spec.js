const { test, expect } = require('@playwright/test')

test('First test ', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const singIn = page.locator("input#signInBtn");

    await userName.fill("rahulshettyacad");
    await password.fill("learning");
    await singIn.click();

    console.log(await page.locator("[style*='none;']").textContent());
    await expect(page.locator("[style*='none;']")).toContainText("Incorrect");

    await userName.fill(" ");
    await userName.fill("rahulshettyacademy");
    await singIn.click();

    const cartTitle = await page.locator(".card-body a");

    // console.log(await page.locator(".card-body a").first().textContent());
    // console.log(await page.locator(".card-body a").nth(1).textContent());
    const allcarttitle = await cartTitle.allTextContents();
    console.log(allcarttitle);
});






test('Child window or Tab handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("input#username");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    console.log(text);
    const array = text.split("@");
    const domain = array[1].split(" ")[0];
    console.log(domain);

    await page.locator("input#username").fill(domain);
    console.log(await page.locator("input#username").inputValue());
});