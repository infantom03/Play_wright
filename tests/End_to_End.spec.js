const { test, expect } = require('@playwright/test')

test('End to End testing ', async ({ page }) => {

    const product = "ADIDAS ORIGINAL";

    const email = "infantom.sabadotechnologies@gmail.com";
    page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const emailfield = page.locator("#userEmail");
    const pass = page.locator("#userPassword");
    const login = page.locator("#login");

    await emailfield.fill(email);
    await pass.fill("Hello@123");
    await login.click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const products = await page.locator(".card-body");

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === product) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await page.locator(".input.txt").nth(1).fill("232");
    await page.locator(".input.txt").nth(2).fill("MasterCard");
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator("text=Place Order ").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const text = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(text);

    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor();
    await expect(page.locator("h1")).toHaveText("Your Orders");

    const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (text.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
    page.locator(".email-wrapper.ng-star-inserted").waitFor();
    const orderSummaryPageID =await page.locator(".col-text.-main").textContent();
    await expect(text.includes(orderSummaryPageID)).toBeTruthy();
});