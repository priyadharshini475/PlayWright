import { test, expect, request } from '@playwright/test'
import APIUtility from './Utils/APIUtils/APIUtility.spec.js';

let sessionId;
let orderIds;
let apiContext;
let apiUtilObj;
let createdOrderIds;
test.beforeAll("API Login Test", async () => {
  apiContext = await request.newContext();
   apiUtilObj = await new APIUtility(apiContext);
  sessionId = await apiUtilObj.getToken();
  console.log(sessionId);

})
test.only("Bypass the Login", async ({ page }) => {
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, sessionId);
  await page.goto("https://rahulshettyacademy.com/client");
})

test.only("Make the Order through API", async () => {
   createdOrderIds = await apiUtilObj.createOrder();
})

test.only("Verify the order", async ({ page }) => {
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, sessionId);
  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink='/dashboard/myorders']").click();
  const allOrderIdLoc = page.locator("tbody tr th");
  await allOrderIdLoc.last().waitFor();
  for (let i = 0; i < await allOrderIdLoc.count(); i++) {
    if (await allOrderIdLoc.nth(i).textContent() === createdOrderIds[0] || await allOrderIdLoc.nth(i).textContent() === createdOrderIds[1]) {
      expect(await allOrderIdLoc.nth(i).isVisible()).toBeTruthy();
      console.log("The ordered Id:", await allOrderIdLoc.nth(i).textContent());
    }
  }
})
