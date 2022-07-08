const LoginPage = require('../pageobjects/login.page.js');
const ProfileEmployeePage = require('../pageobjects/profileEmployee.page.js');
const HomeEmployeePage = require('../pageobjects/homeEmployee.page.js');

describe('Home page employee test', () => {
  beforeAll('Open browser in the login page', async () => {
    await LoginPage.openLogin();
    await LoginPage.fillInputs('sarasa92@gmail.com', 'qwer1234');
    await LoginPage.continueBtn.click();
    await browser.pause(6000);
    await ProfileEmployeePage.goHomeBtn.click();
    await browser.pause(3000);
  });
  it('Elements test', async () => {
    await expect(HomeEmployeePage.logoutBtn).toBeClickable();
    await expect(HomeEmployeePage.addBtn).toBeClickable();
    await expect(HomeEmployeePage.editProfileBtn).toBeClickable();
    await expect(HomeEmployeePage.putBtn).toBeClickable();
    await expect(HomeEmployeePage.deleteBtn).toBeClickable();
    await expect(HomeEmployeePage.leftArrowBtn).toBeClickable();
    await expect(HomeEmployeePage.rightArrowBtn).toBeClickable();
    await expect(HomeEmployeePage.table).toExist();
    await HomeEmployeePage.table.isDisplayed();
  });
});
//---------------------Discomment and npm run test for view the error--------------------

/*describe('Add timesheet test', () => {
  it('Complete inputs with short data', async () => {
    await HomeEmployeePage.addBtn.click();
    await HomeEmployeePage.fillInputs('6', 'E', 'P', '2', '0', 'D');
    await HomeEmployeePage.submitBtn.click();
    await HomeEmployeePage.crossBtn.click();
  });
  it('Complete inputs with invalid data', async () => {
    await HomeEmployeePage.addBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.fillInputs(
      '11111111111111111111111111111',
      '2222222222222222222',
      '333333333333',
      '44444444444444',
      '555555555555555555',
      '666666666666666666'
    );
    await browser.pause(2000);
    await HomeEmployeePage.submitBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.crossBtn.click();
    await browser.pause(2000);
  });
  it('Complete inputs with valid data', async () => {
    await HomeEmployeePage.addBtn.click();
    await HomeEmployeePage.fillInputs(
      '629d83d3d9d731ead71b218c',
      'Example text',
      'Project test',
      '20022020',
      '12',
      'DEV'
    );
    await expect(HomeEmployeePage.approvedInput).toBeClickable();
    await HomeEmployeePage.approvedInput.click();
    await HomeEmployeePage.approvedInput.click();
    await HomeEmployeePage.approvedInput.click();
    await HomeEmployeePage.approvedInput.click();
    await HomeEmployeePage.submitBtn.click();
  });
});*/
