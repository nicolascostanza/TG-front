const LandingPage = require('../pageobjects/landing.page');
const SignUpPage = require('../pageobjects/signup.page');

describe('Sign Up Page Testing', () => {
  beforeAll('Open browser', async () => {
    await LandingPage.open();
    await LandingPage.menuButton.click();
    await LandingPage.signupLinkSidebar.click();
  });

  describe('Testing Register page elements', () => {
    it('Testing elements are present', async () => {
      await LandingPage.open();
      await LandingPage.menuButton.click();
      await LandingPage.signupLinkSidebar.click();
      await SignUpPage.open();
      await expect(SignUpPage.registerHeading).toBeExisting();
      await expect(SignUpPage.firstNameLabel).toBeExisting();
      await expect(SignUpPage.lastNameLabel).toBeExisting();
      await expect(SignUpPage.genderLabel).toBeExisting();
      await expect(SignUpPage.addressLabel).toBeExisting();
      await expect(SignUpPage.dobLabel).toBeExisting();
      await expect(SignUpPage.phoneLabel).toBeExisting();
      await expect(SignUpPage.emailLabel).toBeExisting();
      await expect(SignUpPage.passwordLabel).toBeExisting();
    });
  });

  describe('Testing Register page inputs', () => {
    it('Testing inputs exist', async () => {
      await SignUpPage.open();
      await expect(SignUpPage.firstNameInput).toBeExisting();
      await expect(SignUpPage.firstNameLabel).toBeExisting();
      await expect(SignUpPage.lastNameLabel).toBeExisting();
      await expect(SignUpPage.genderLabel).toBeExisting();
      await expect(SignUpPage.addressLabel).toBeExisting();
      await expect(SignUpPage.dobLabel).toBeExisting();
      await expect(SignUpPage.phoneLabel).toBeExisting();
      await expect(SignUpPage.emailLabel).toBeExisting();
      await expect(SignUpPage.passwordLabel).toBeExisting();
    });
  });

  describe('Testing Reset button', () => {
    it('Testing if reset button is clickable', async () => {
      await LandingPage.open();
      await LandingPage.menuButton.click();
      await LandingPage.signupLinkSidebar.click();
      await SignUpPage.open();
      await expect(SignUpPage.resetButton).toBeClickable();
    });
  });

  describe('Testing continue button', () => {
    it('Testing if continue button is clickable', async () => {
      await LandingPage.open();
      await LandingPage.menuButton.click();
      await LandingPage.signupLinkSidebar.click();
      await SignUpPage.open();
      await expect(SignUpPage.continueButton).toBeClickable();
      await expect(SignUpPage.userCreatedModal).toExist();
    });
  });
});
