// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  reporter: 'html',
  timeout:30*1000,
  expect:{
    timeout:5000
  },
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {
    browserName:"chromium",
    headless:false,
    screenshot:'on',
    trace:'on' //Having three options like off,on,retain-on-failure
  }
  // projects: [
  //   {
  //     name: 'firefox',
  //     use: { browserName: 'firefox' }
  //   },
  //   {
  //     name: 'webkit',
  //     use: { browserName: 'webkit' }
  //   },
  //   {
  //     name: 'chromium',
  //     use: { browserName: 'chromium' }
  //   },
  // ]
};
 module.exports=config;

