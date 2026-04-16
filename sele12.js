const { Builder, Browser, By, Key } = require("selenium-webdriver");

async function dkan() {
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  let term = ['hi', 'dsd','sdfs']

  for(let i=0; i<term.length; i++){
  await driver.get("https://www.google.com");
  await driver.findElement(By.name('q')).sendKeys(term[i], Key.RETURN);
  }

}

dkan();