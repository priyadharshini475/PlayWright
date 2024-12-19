import { test, expect } from '@playwright/test'

test.describe('Visual Testing', () => {

    test("ScreenShot test", async ({ page }) => {
        page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await expect(page.locator("#displayed-text")).toBeVisible();
        let nameTxtBox = await page.locator("#displayed-text").getAttribute('placeholder');

        //For taking screenshot for the particular locator in the page
        await page.locator("#displayed-text").screenshot({ path: `Screenshots/partialScreenshot.png` });

        await page.locator("#hide-textbox").click();

        // For taking screenshot for the page
        await page.screenshot({ path: `Screenshots/${nameTxtBox}.png` });

        await expect(page.locator("#displayed-text")).toBeHidden();
    })
    test.only('Screenshot Comparison',async({page})=>{
        page.goto("https://www.google.com/");
        await expect(await page.screenshot()).toMatchSnapshot('landingPage.png');
    })
})

