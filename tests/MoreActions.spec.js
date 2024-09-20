import{test,expect} from '@playwright/test'
test("MoreActionTest",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.co.in/");
    await page.goBack();
    await page.goForward();
    await page.goBack();
    await expect( page.locator("#displayed-text")).toBeVisible();
    await page.getByRole("button",{name:'Hide'}).click();
    await expect(page.locator("#displayed-text")).toBeHidden();
})
test.only("PopUpHandlingTest",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   // await page.pause();
    //Handle the Dialog Popup
    //on is the listener that listens the event
    page.on("dialog",dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();

    //Hover Action
    await page.locator("button.btn-primary").locator("text='Login'").hover();

    //Switching to Iframe
    const iframeLoc=page.frameLocator("#courses-iframe");
    iframeLoc.locator("a.theme-btn").locator("text='Register'").hover();
    
})