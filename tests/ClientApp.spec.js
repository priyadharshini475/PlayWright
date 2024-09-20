//const {test,expect}=require('@playwright/test')
import {test,expect} from '@playwright/test'

test ("Login Test1",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("tamilpriya123@gmail.com");
    await page.locator("#userPassword").fill("Priya@123");
    await page.locator("#login").click();

    // It will Wait until all networks calls are made
    //await page.waitForLoadState('networkidle');

    //To use this waitFor Method to wait for one element
    await page.locator(".card-body b").last().waitFor();

    const itemNames=await page.locator(".card-body b").allTextContents();
  //  console.log(await itemNames.nth(1).textContent());
    console.log(itemNames);

})
test("AddToCartTest",async({page})=>{
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("tamilpriya123@gmail.com");
  await page.locator("#userPassword").fill("Priya@123");
  await page.locator("#login").click();
  const productLoc=page.locator("div.card-body");
  await productLoc.last().waitFor();
  const product='ZARA COAT 3';
  for(let i=0;i<await productLoc.count();i++){
      if(await productLoc.nth(i).locator("b").textContent()===product){
         await productLoc.nth(i).locator("text= Add To Cart").click();
         break;
      }
  }
   const cartbtnLoc=page.locator("button[routerlink='/dashboard/cart']");
   await cartbtnLoc.click();
   await page.locator("div.cart").waitFor();
   const boolean=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(boolean).toBeTruthy();

})
 
test.only("CheckOutTest",async({page})=>{
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("tamilpriya123@gmail.com");
  await page.locator("#userPassword").fill("Priya@123");
  await page.locator("#login").click();
  const productLoc=page.locator("div.card-body");
  await productLoc.last().waitFor();
  const product='ZARA COAT 3';
  for(let i=0;i<await productLoc.count();i++){
      if(await productLoc.nth(i).locator("b").textContent()===product){
         await productLoc.nth(i).locator("text= Add To Cart").click();
         break;
      }
  }
  const cartLoc=page.locator("button[routerlink='/dashboard/cart']");
  await cartLoc.click();
  const chkoutLoc=page.locator("li.totalRow button");
  await chkoutLoc.click();
  const lblUserLoc=page.locator("label[type='text']");
  await expect(lblUserLoc).toHaveText("tamilpriya123@gmail.com");
  const countryLoc=page.locator("input[placeholder*='Select Country']");
  await countryLoc.pressSequentially("Ind");
  const autodrpdwnLoc=page.locator("section.ta-results");
  await autodrpdwnLoc.waitFor();
  autodrpdwnLoc.locator("text=' India'").click();
  const placeOrderLoc=page.locator("div.actions a");
  await placeOrderLoc.click();
  const thankYoulblLoc=page.locator("td h1");
  await thankYoulblLoc.waitFor();
  const boolean=await page.locator("td h1:has-text('Thankyou for the order.')").isVisible();
  await expect(boolean).toBeTruthy();
  const orderIdLoc=page.locator("label.ng-star-inserted");
  const orderId=await orderIdLoc.textContent();
  const orderHistoryLoc=page.locator("label[routerlink='/dashboard/myorders']");
  await orderHistoryLoc.click();
  const allOrderIdLoc=page.locator("tbody tr th");
  await allOrderIdLoc.last().waitFor();
  
  for(let i=0;i<await allOrderIdLoc.count();i++ ){
    console.log(await allOrderIdLoc.count());
    if(await allOrderIdLoc.nth(i).textContent()===orderId){
      expect(await allOrderIdLoc.nth(i).isVisible()).toBeTruthy();
      break;
    }

  }
}
)






