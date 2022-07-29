const LoginPage = require('../pageobjects/login.page.js');
const SidebarPage = require('../pageobjects/sidebar.page.js');

describe('Login page testing for admin entity', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  });

  describe('Username input test', () => {
    it('Empty email field should display an error message', async () => {
      await LoginPage.login('', 'admin123');
      await expect(LoginPage.errorMsgContainer).toHaveText('This field is required');
    });
    it('Invalid email field should display an error message', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.c', 'admin123');
      await expect(LoginPage.errorMsgContainer).toHaveText('Invalid email format');
    });
  });

  describe('Password input test', () => {
    it('Empty password field should display an error message', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', '');
      await expect(LoginPage.errorMsgContainer).toHaveText('This field is required');
    });
    it('Password field with less than 8 characters should display an error message', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', 'admin12');
      await expect(LoginPage.errorMsgContainer).toHaveText(
        'Password must contain at least 8 characters'
      );
    });
  });

  describe('Sign up redirection and log out of admin entity', () => {
    it('Sign up redirection', async () => {
      await LoginPage.open();
      await expect(LoginPage.btnSignup).toExist();
      await expect(LoginPage.btnSignup).toBeClickable();
      await LoginPage.btnSignup.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/signup');
    });
    it('Logout action should redirect to the landing page', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', 'admin123');
      await expect(LoginPage.tableProjects).toBeDisplayed();
      await SidebarPage.btnBurger.click();
      await LoginPage.btnLogout.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/');
      await expect(LoginPage.landingDisplay).toBeDisplayed();
    });
  });
});
