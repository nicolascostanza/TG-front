const SignupPage = require('../pageobjects/signup.page.js');

describe('Sign Up page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/signup');
  });

  describe('Username input test - Employee credentials', () => {
    it('Empty fields should display error messages', async () => {
      await SignupPage.signup('', '', '', '');
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText('This field is required');
    });
    it('Invalid first name field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup('J', 'Doe', 'employee@test.com', 'qwer1234');
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'First name must contain at least 3 characters'
      );
    });
    it('Invalid last name field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup('Jane', 'D', 'employee@test.com', 'qwer1234');
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Last name must contain at least 3 characters'
      );
    });
    it('Invalid email field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup('Jane', 'Doe', 'employee@test.c', 'qwer1234');
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText('Invalid email format');
    });
    it('Short password field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup('Jane', 'Doe', 'employee@test.com', 'qwer');
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Password must contain at least 8 characters'
      );
    });
    it('Password field with only numbers should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup('Jane', 'Doe', 'employee@test.com', '12345678');
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Password must contain letters and numbers'
      );
    });
    it('Password field with only letters should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup('Jane', 'Doe', 'employee@test.com', 'aaaaaaaa');
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Password must contain letters and numbers'
      );
    });
    it('Test reset feature', async () => {
      await SignupPage.open();
      await SignupPage.signup('Jane', 'Doe', 'employee@test.com', 'qwer1234');
      await SignupPage.btnReset.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/signup');
    });
  });

  describe('Employee signup with valid credentials and login redirection', () => {
    /*it('Login redirection', async () => {
      await SignupPage.open();
      await SignupPage.loginRedirect.toExist();
      await SignupPage.loginRedirect.toBeClickable();
      await SignupPage.loginRedirect.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/login');
      await SignupPage.projectsTable.isDisplayed();
    });*/
    it('Sign up', async () => {
      await SignupPage.open();
      await SignupPage.signup('Jane', 'Doe', 'employee@test.com', 'qwer1234');
      await SignupPage.btnContinue.click();
      await SignupPage.modalSuccess.isDisplayed();
      await SignupPage.closeModal.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/signup');
      await SignupPage.projectsTable.isDisplayed();
    });
  });
});
