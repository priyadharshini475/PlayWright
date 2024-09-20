//const {test,expect}=require('@playwright/test');
// const { expect } = require('../playwright.config');
import {test,expect} from '@playwright/test'

test("Browser Context Test", async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
})

test("Page Fixture Test",async ({page})=>{
   await page.goto("https://www.google.co.in/");
   console.log( await page.title());
   await expect(page).toHaveTitle("Google");
})
test("Login Test",async ({page})=>{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await page.locator("input#username").fill("rahulshettyacademy");
   await page.locator("input#password").fill("learning");
   await page.locator("input#signInBtn").click();
 //  console.log(await page.locator("div[style*='block']").textContent());
 //  await expect(page.locator("div[style*='block']")).toContainText("Incorrect username/password");
   const listOfItems= await page.locator("//div[@class='card-body']//a");
   //For getting first element in the list
   //console.log(await listOfItems.first().textContent());
   
  //For getting nth element in the list
  //console.log(await listOfItems.nth(3).textContent());
   const listOfItemsName=await listOfItems.allTextContents();
   console.log(await listOfItemsName);
})
 test("UI chkBoxDrpdwnTest",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("input#password").fill("learning");
    const roleDrpdwn=await page.locator("select.form-control");
    await roleDrpdwn.selectOption("Teacher");
    await page.locator("span.checkmark").nth(1).click();
    await page.locator("#okayBtn").click();

    //For pause the webPage
    //await page.pause();

    //Assertion to check whether the chkbx selected or not
    console.log(await page.locator("span.checkmark").nth(1).isChecked()); //T/F
    //Assertion
    await expect(page.locator("span.checkmark").nth(1)).toBeChecked();
    await page.locator("input#terms").click();
    await page.locator("input#terms").uncheck();
    expect(await  page.locator("input#terms").isChecked()).toBeFalsy();

    const blinkingText=page.locator("a[href*='documents-request']");
    await expect(blinkingText).toHaveAttribute('class','blinkingText');
 }
)
   test("New Window Test",async ({browser})=>{
      const context=await browser.newContext();
      const page=await context.newPage();
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const  blinkingTextLoc=page.locator("a[href*='documents-request']");
      
      //Promise pending,promise fulfilled,promise rejected
     // Promise.all method that execute the seq of steps parallely.
      const [childPage1]=await Promise.all(
         [
            context.waitForEvent('page'), //It waits for the new page to open (parallely)
            blinkingTextLoc.click()
         ]
      )
       const textEmailLoc=childPage1.locator("p[class*='red']");
       const text=await textEmailLoc.textContent();
       const textEmail=text.split("@")[1].split(" ")[0];
       const userNameLoc=page.locator("input#username");
       await userNameLoc.fill(textEmail);
       await expect(userNameLoc).toHaveValue(textEmail);
     
       
   })
   



