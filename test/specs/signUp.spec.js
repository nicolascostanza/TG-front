const SignUpPage = require('../pageobjects/signUp.page.js');

describe('SignUp page test', () => {
  beforeAll('Open browser', async () => {
    await SignUpPage.openSignUp();
  });
  it('SignUp page elements test', async () => {
    //await expect(SignUpPage.formTitle).toExist();
    //await SignUpPage.formTitle.isDisplayed();
    await expect(SignUpPage.firstNameInput).toExist();
    await SignUpPage.firstNameInput.isDisplayed();
    await expect(SignUpPage.lastNameInput).toExist();
    await SignUpPage.lastNameInput.isDisplayed();
    await expect(SignUpPage.genderDropdown).toExist();
    await SignUpPage.genderDropdown.isDisplayed();
    await expect(SignUpPage.addressInput).toExist();
    await SignUpPage.addressInput.isDisplayed();
    await expect(SignUpPage.dobInput).toExist();
    await SignUpPage.dobInput.isDisplayed();
    await expect(SignUpPage.phoneInput).toExist();
    await SignUpPage.phoneInput.isDisplayed();
    await expect(SignUpPage.emailInput).toExist();
    await SignUpPage.emailInput.isDisplayed();
    await expect(SignUpPage.passInput).toExist();
    await SignUpPage.passInput.isDisplayed();
    await expect(SignUpPage.resetBtn).toExist();
    await SignUpPage.resetBtn.isDisplayed();
    await expect(SignUpPage.resetBtn).toBeClickable();
    await expect(SignUpPage.continueBtn).toExist();
    await SignUpPage.continueBtn.isDisplayed();
    await expect(SignUpPage.continueBtn).toBeClickable();
  });
});

describe('Complete inputs with data', () => {
  it('Without data', async () => {
    await SignUpPage.continueBtn.click();
  });
  it('With invalid data', async () => {
    await SignUpPage.fillInputs(
      'Luciano3213',
      'Claros31231',
      'sddadasdadad',
      '1111111111',
      'adsasdadasd',
      'adasdasdads',
      'dsasddadasdasd'
    );
    await SignUpPage.continueBtn.click();
    await SignUpPage.resetBtn.click();
  });
  it('With short data', async () => {
    await SignUpPage.fillInputs('L', 'C', 'Li', '18', '3', 'cl', 'c');
    await SignUpPage.continueBtn.click();
    await SignUpPage.resetBtn.click();
  });
  it('With correct data', async () => {
    await SignUpPage.fillInputs(
      'Luciano',
      'Claros',
      'Lindberg 5292',
      '18051996',
      '3416683395',
      'claros.luciano1996@gmail.com',
      'correctpwd1234'
    );
    await SignUpPage.genderChecker();
    await SignUpPage.resetBtn.click();
  });
});
