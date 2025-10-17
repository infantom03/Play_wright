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
    await page.getByRole("button", { name: 'Search' }).click();

    await page.locator(".result-item").first().waitFor();
    await page.locator("text= Expand All ").click();

    // Get all the containers
    const milesBoxes = page.locator(".text-right.flex-shrink-0");

    // Get total count
    const count = await milesBoxes.count();
    console.log("Total boxes:", count);

    for (let i = 0; i < count; i++) {
        // Get the miles text (e.g., "0.14 miles")
        const milesText = await milesBoxes
            .nth(i)
            .locator(".text-xs.text-gray-500")
            .textContent();

        //if (!milesText) continue; // Skip if null or undefined

        // Extract only the numeric part
        const milesValue = parseFloat(milesText.replace(/[^0-9.]/g, ""));

        console.log(`Miles value for box ${i}:`, milesValue);

        // Condition: check if <= 5 miles
        if (milesValue <= 5) {
            console.log(`Box ${i} has ${milesValue} miles (within 5 miles)`);
        } else {
            console.log(`Box ${i} has ${milesValue} miles (beyond 5 miles)`);
        }
    }

    const pages = await page.locator(".text-sm.text-gray-500").textContent();
    const array = pages.trim().split(" ");
    const RealPage = array[1];
    console.log(`Total page is ${RealPage}`);
});