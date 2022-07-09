const SignupPage = require('../pageobjects/signup.page.js');

describe('Sign Up page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/signup');
  });

  describe('Username input test - Admin credentials', () => {
    it('Empty fields should display error messages', async () => {
      await SignupPage.signup('', '', '', '', '', '', '');
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText('This field is required');
    });
    it('Invalid first name field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'J',
        'Doe',
        'Alem 1500',
        '25051995',
        '3415550011',
        'adminkpo@admin.com',
        'qwer1234'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'First name must contain at least 3 characters'
      );
    });
    it('Invalid last name field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'D',
        'Alem 1500',
        '25051995',
        '3415550011',
        'adminkpo@admin.com',
        'qwer1234'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Last name must contain at least 3 characters'
      );
    });
    it('Invalid address field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Al',
        '25051995',
        '3415550011',
        'adminkpo@admin.com',
        'qwer1234'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Address must contain at least 5 characters'
      );
    });
    it('Empty date fields should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '2505',
        '3415550011',
        'adminkpo@admin.com',
        'qwer1234'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText('Date is not valid');
    });
    it('Date field filled with lower data than the end date should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25052500',
        '3415550011',
        'adminkpo@admin.com',
        'qwer1234'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveTextContaining('"dob" must be less than ');
    });
    it('Invalid phone field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25051995',
        'xxxxxxxx',
        'adminkpo@admin.com',
        'qwer1234'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Phone must contain only numbers, and should contain between 9 and 10 characters'
      );
    });
    it('Short phone field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25051995',
        '000',
        'adminkpo@admin.com',
        'qwer1234'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Phone must contain only numbers, and should contain between 9 and 10 characters'
      );
    });
    it('Invalid email field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25051995',
        '3415550011',
        'adminkpo@admin.c',
        'qwer1234'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText('Invalid email format');
    });
    it('Short password field should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25051995',
        '3415550011',
        'adminkpo@admin.com',
        'qwer'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Password must contain at least 8 characters'
      );
    });
    it('Password field with only numbers should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25051995',
        '3415550011',
        'adminkpo@admin.com',
        '12345678'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Password must contain letters and numbers'
      );
    });
    it('Password field with only letters should display an error message', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25051995',
        '3415550011',
        'adminkpo@admin.com',
        'aaaaaaaa'
      );
      await SignupPage.btnContinue.click();
      await expect(SignupPage.errorMsgContainer).toHaveText(
        'Password must contain letters and numbers'
      );
    });
    it('Test reset feature', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25051995',
        '3415550011',
        'jdoe@admin.com',
        'qwer1234'
      );
      await SignupPage.dropGender.click();
      await SignupPage.dropFemale.click();
      await SignupPage.btnReset.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/signup');
    });
  });

  describe('Signup with valid credentials', () => {
    it('Singn up and dropdown test', async () => {
      await SignupPage.open();
      await SignupPage.signup(
        'Jane',
        'Doe',
        'Alem 1500',
        '25051995',
        '3415550011',
        'jdoe@admin.com',
        'qwer1234'
      );
      await SignupPage.dropGender.click();
      await SignupPage.dropMale.click();
      await SignupPage.dropGender.click();
      await SignupPage.dropFemale.click();
      await SignupPage.dropGender.click();
      await SignupPage.dropOther.click();
      await SignupPage.btnContinue.click();
      await SignupPage.modalEmployee.isDisplayed();
      await SignupPage.btnModal.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/login');
    });
  });
});
