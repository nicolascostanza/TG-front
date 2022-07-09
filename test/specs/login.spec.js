const LoginPage = require('../pageobjects/login.page.js');

describe('Login page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  });

  describe('Username input test', () => {
    it('Empty email field should display an error message', async () => {
      await LoginPage.login('', 'qwer1234');
      await expect(LoginPage.errorMsgContainer).toHaveText('This field is required');
    });
    it('Invalid email field should display an error message', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.c', 'qwer1234');
      await expect(LoginPage.errorMsgContainer).toHaveText('Invalid email format');
    });
  });

  describe('Password input test', () => {
    it('Empty password field should display an error message', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', '');
      await expect(LoginPage.errorMsgContainer).toHaveText('This field is required');
    });
    it('Password field with less than 8 characters should display an error message', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwe1234');
      await expect(LoginPage.errorMsgContainer).toHaveText(
        'Password must contain at least 8 characters'
      );
    });
  });

  describe('Login with valid credentials', () => {
    it('It should login and redirect to the products page', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/admins');
    });
  });

  describe('Logout button display', () => {
    it('Logout button should be displayed in the top of the page', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');
      await expect(LoginPage.btnLogout).toExist();
    });
    it('Logout action should redirect to the landing page', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');
      await LoginPage.btnLogout.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/');
    });
  });
});
