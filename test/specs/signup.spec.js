const HomePage = require('../pageobjects/home.page');
const SignUpPage = require('../pageobjects/signup.page');

describe('Sign Up Page Testing', () => {
  beforeAll('Open browser', async () => {
    await HomePage.open();
    await HomePage.menuButton.click();
    await HomePage.signupLinkSidebar.click();
  });

  describe('Testing Register page elements', () => {
    it('Testing elements are present', async () => {
      await HomePage.open();
      await HomePage.menuButton.click();
      await HomePage.signupLinkSidebar.click();
      // await SignUpPage.open();
      await expect(SignUpPage.registerHeading).toBeExisting();
      await expect(SignUpPage.firstNameLabel).toBePresent();
      // await expect(SignUpPage.lastNameLabel).toBePresent();
      // await expect(SignUpPage.genderLabel).toBePresent();
      // await expect(SignUpPage.addressLabel).toBePresent();
      // await expect(SignUpPage.dobLabel).toBePresent();
      // await expect(SignUpPage.phoneLabel).toBePresent();
      // await expect(SignUpPage.emailLabel).toBePresent();
      // await expect(SignUpPage.passwordLabel).toBePresent();
    });
  });

  // describe('Testing Register page inputs', () => {
  //   it('Testing inputs have value ', async () => {
  //     await SignUpPage.open();
      // await expect(SignUpPage.firstNameInput).toHaveAttr('name');

      // await expect(SignUpPage.firstNameLabel).toHaveValue();
      // await expect(SignUpPage.lastNameLabel).toHaveValue();
      // await expect(SignUpPage.genderLabel).toHaveValue();
      // await expect(SignUpPage.addressLabel).toHaveValue();
      // await expect(SignUpPage.dobLabel).toHaveValue();
      // await expect(SignUpPage.phoneLabel).toHaveValue();
      // await expect(SignUpPage.emailLabel).toHaveValue();
      // await expect(SignUpPage.passwordLabel).toHaveValue();
    });
  });

  describe('Testing Register page error field', () => {
    it('Testing if error field exists', async () => {
      await SignUpPage.login('','Eusebi','Female','Monumento 123','02/02/1991','3415480857','tutest@gmail.com','allatestean123');
      await expect(SignUpPage.errorField).toHaveText('This field is required');
    });
  });

  describe('Testing Register page buttons', () => {
    it('Testing if reset button is clickable', async () => {
      await HomePage.open();
      await HomePage.menuButton.click();
      await HomePage.signupLinkSidebar.click();
      await SignUpPage.open();
      await expect(SignUpPage.resetButton).toBeClickable();
    });

    it('Testing if continue button is clickable', async () => {
      await HomePage.open();
      await HomePage.menuButton.click();
      await HomePage.signupLinkSidebar.click();
      await SignUpPage.open();
      await SignUpPage.login('Florencia','Eusebi','Female','Monumento 123','02/02/1991','3415480857','tutest@gmail.com','allatestean123');
      await expect(SignUpPage.continueButton).toBeClickable();
      await expect(SignUpPage.userCreatedModal).toExist();
    });
  });
});
