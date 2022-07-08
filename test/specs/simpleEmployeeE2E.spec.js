const LoginPage = require('../pageobjects/login.page.js');
const ProfileEmployeePage = require('../pageobjects/profileEmployee.page.js');
const HomeEmployeePage = require('../pageobjects/homeEmployee.page.js');

describe('Basic employee login E2E', () => {
  beforeAll('Open browser in the login page', async () => {
    await LoginPage.openLogin();
  });
  it('E2E', async () => {
    await LoginPage.fillInputs('sarasa92@gmail.com', 'qwer1234');
    await LoginPage.continueBtn.click();
    await browser.pause(6000);
    await ProfileEmployeePage.goHomeBtn.click();
    await browser.pause(3000);
    await HomeEmployeePage.logoutBtn.click();
    await browser.pause(1000);
  });
});
