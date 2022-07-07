const LoginPage = require('../pageobjects/login.page.js');

describe('Login page test', () => {
  beforeAll('Open browser', async () => {
    await LoginPage.openLogin();
  });
  it('Login page elements test', async () => {
    await expect(LoginPage.mailInput).toExist();
    await LoginPage.mailInput.isDisplayed();
    await expect(LoginPage.pwdInput).toExist();
    await LoginPage.pwdInput.isDisplayed();
    await expect(LoginPage.continueBtn).toExist();
    await LoginPage.continueBtn.isDisplayed();
    await expect(LoginPage.continueBtn).toBeClickable();
  });
});

describe('Complete inputs with data', () => {
  it('Without data', async () => {
    await LoginPage.continueBtn.click();
  });
  it('With short data', async () => {
    await LoginPage.fillInputs('a', 'b');
    await LoginPage.continueBtn.click();
    await browser.refresh();
  });
  it('With invalid data', async () => {
    await LoginPage.fillInputs('111111111111', 'aaaaaaaaaaaaa');
    await LoginPage.continueBtn.click();
    await browser.refresh();
  });
  it('With correct data', async () => {
    await LoginPage.fillInputs('sarasa92@gmail.com', 'qwer1234');
    await LoginPage.continueBtn.click();
    await browser.pause(5000);
  });
});
