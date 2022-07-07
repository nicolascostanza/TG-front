const LoginPage = require('../pageobjects/login.page.js');
const ProfileEmployeePage = require('../pageobjects/profileEmployee.page.js');
const SignUpPage = require('../pageobjects/signUp.page.js');

describe('Profile employee test', () => {
  beforeAll('Open browser in the login page', async () => {
    await LoginPage.openLogin();
    await LoginPage.fillInputs('sarasa92@gmail.com', 'qwer1234');
    await LoginPage.continueBtn.click();
    await browser.pause(6000);
  });
  it('Elements test', async () => {
    await expect(ProfileEmployeePage.employeeName).toExist();
    await ProfileEmployeePage.employeeName.isDisplayed();
    await expect(ProfileEmployeePage.firstNameDiv).toExist();
    await ProfileEmployeePage.firstNameDiv.isDisplayed();
    await expect(ProfileEmployeePage.lastNameDiv).toExist();
    await ProfileEmployeePage.lastNameDiv.isDisplayed();
    await expect(ProfileEmployeePage.genderDiv).toExist();
    await ProfileEmployeePage.genderDiv.isDisplayed();
    await expect(ProfileEmployeePage.addressDiv).toExist();
    await ProfileEmployeePage.addressDiv.isDisplayed();
    await expect(ProfileEmployeePage.phoneDiv).toExist();
    await ProfileEmployeePage.phoneDiv.isDisplayed();
    await expect(ProfileEmployeePage.dobDiv).toExist();
    await ProfileEmployeePage.dobDiv.isDisplayed();
    await expect(ProfileEmployeePage.emailDiv).toExist();
    await ProfileEmployeePage.emailDiv.isDisplayed();
    await expect(ProfileEmployeePage.pwdDiv).toExist();
    await ProfileEmployeePage.pwdDiv.isDisplayed();
    await expect(ProfileEmployeePage.statusDiv).toExist();
    await ProfileEmployeePage.statusDiv.isDisplayed();
    await expect(ProfileEmployeePage.editBtn).toExist();
    await ProfileEmployeePage.editBtn.isDisplayed();
    await expect(ProfileEmployeePage.editBtn).toBeClickable();
    await expect(ProfileEmployeePage.goHomeBtn).toExist();
    await ProfileEmployeePage.goHomeBtn.isDisplayed();
    await expect(ProfileEmployeePage.goHomeBtn).toBeClickable();
  });
});

describe('Edit profile info', () => {
  it('Edit with invalid data', async () => {
    await ProfileEmployeePage.editBtn.click();
    await SignUpPage.fillInputs('12', '21', '%%·##@', '1111111111', 'asasas', '%%$$&&', '%%$$##');
    await ProfileEmployeePage.updateBtn.click();
    await ProfileEmployeePage.cancelBtn.click();
    await browser.refresh();
  });
  it('Edit with correct data', async () => {
    await LoginPage.fillInputs('sarasa92@gmail.com', 'qwer1234');
    await LoginPage.continueBtn.click();
    await browser.pause(6000);
    await ProfileEmployeePage.editBtn.click();
    await SignUpPage.fillInputs(
      'Lara',
      'Croft',
      'randomplace 258',
      '25081992',
      '123456789',
      'sarasa92@gmail.com',
      'qwer1234'
    );
    await expect(ProfileEmployeePage.activeInput).toBeClickable();
    await ProfileEmployeePage.activeInput.click();
    await ProfileEmployeePage.activeInput.click();
    await ProfileEmployeePage.activeInput.click();
    await ProfileEmployeePage.activeInput.click();
    await ProfileEmployeePage.updateBtn.click();
    await browser.pause(3000);
    await ProfileEmployeePage.crossBtn.click();
    await browser.refresh();
    await LoginPage.fillInputs('sarasa92@gmail.com', 'qwer1234');
    await LoginPage.continueBtn.click();
    await browser.pause(6000);
  });
});
