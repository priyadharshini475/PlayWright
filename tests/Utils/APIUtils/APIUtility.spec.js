import { expect } from '@playwright/test'
class APIUtility {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }
  async getToken() {

    const requestBody = {
      "userEmail": "tamilpriya123@gmail.com",
      "userPassword": "Priya@123"
    };
    const response = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: requestBody }
    );
    expect(await response.ok()).toBeTruthy();
    const responseJson = await response.json();
    return responseJson.token;

  }

  async createOrder() {
    const orderPayLoad = {
      "orders": [
        {
          "country": "India",
          "productOrderedId": "6581ca399fd99c85e8ee7f45"
        },
        {
          "country": "Cuba",
          "productOrderedId": "6581cade9fd99c85e8ee7ff5"
        }
      ]
    };
   
    const headerContent = {
      "Authorization":await this.getToken(), //token
      "content-type": "application/json"
    };
    const responseBody = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: headerContent
      });
    expect(await responseBody.ok()).toBeTruthy();
    const responseBodyJson = await responseBody.json();
    console.log("The first Order Id is:", responseBodyJson.orders[0], "The Second order Id is:", responseBodyJson.orders[1]);
    let orderedProduct1 = responseBodyJson.orders[0];
    let orderedProduct2 = responseBodyJson.orders[1];
    return [orderedProduct1, orderedProduct2];
  }
}
module.exports = APIUtility;
