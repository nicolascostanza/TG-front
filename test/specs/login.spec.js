const LoginPage = require('../pageobjects/login.page');

describe('Login page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  });

  describe('Elements in Login Page to be displayed', () => {
    it('Verify inputs to be displayed', async () =>{
      await LoginPage.open();
      await expect(LoginPage.emailInput).toBeDisplayed();
      await expect(LoginPage.passwordInput).toBeDisplayed();
      await expect(LoginPage.continueBtn).toBeDisplayed();
    });

    it('Verify header elements to be present', async () => {
      await LoginPage.open();
      await expect(LoginPage.headerLogo).toBeDisplayed();
      await expect(LoginPage.headerHome).toBeDisplayed();
      await expect(LoginPage.headerAdmin).toBeDisplayed();
      await expect(LoginPage.headerSuperAdmin).toBeDisplayed();
      await expect(LoginPage.headerEmployees).toBeDisplayed();
      await expect(LoginPage.headerProjects).toBeDisplayed();
      await expect(LoginPage.headerTimesheets).toBeDisplayed();
      await expect(LoginPage.headerTasks).toBeDisplayed();
    });
  });

  describe('Email input test', () => {
    it('Empty email should display an error', async () => {
      await LoginPage.open();
      await LoginPage.emailInput.setValue('');
      await LoginPage.passwordInput.setValue('pastelitos123');
      await LoginPage.continueBtn.click();
      await expect(LoginPage.errorContainer).toHaveText('This field is required');
    });

    it('Invalid email', async () => {
      await LoginPage.open();
      await LoginPage.emailInput.setValue('aaa');
      await LoginPage.passwordInput.setValue('pastelitos123');
      await LoginPage.continueBtn.click();
      await expect(LoginPage.errorContainer).toHaveText('Invalid email format');
    });
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
  });

});
