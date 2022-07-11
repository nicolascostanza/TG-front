const LoginPage = require('../pageobjects/login.page');
const LogoutPage = require('../pageobjects/logout.page');

describe('Login page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  });

  describe('Login with valid email and password', () => {
    it('Login success', async () => {
      await LoginPage.open();
      await LoginPage.emailInput.setValue('pastelitos@gmail.com');
      await LoginPage.passwordInput.setValue('pastelitos123');
      await LoginPage.continueBtn.click();
      await expect(browser).toHaveUrl(
        'https://alfonso-trackgenix-app.vercel.app/employees/profile/62c83da176c890e432bfc4cf'
      );
    });
    it('Logout success', async () => {
      await LogoutPage.logoutBtn.toBeClickable();
      await LogoutPage.logoutBtn.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/');
    });
  });
});
