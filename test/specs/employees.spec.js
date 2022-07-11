const LoginPage = require('../pageobjects/login.page.js');
const EmployeesPage = require('../pageobjects/employees.page.js');

describe('Employees page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  });

  describe('Redirection and edit employee profile', () => {
    it('Redirection test', async () => {
      await LoginPage.open();
      await LoginPage.login('sarasa92@gmail.com', 'qwer1234');
      await EmployeesPage.homeNavBtn.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/');
      await expect(EmployeesPage.employeeProfileBtn).toExist();
      await expect(EmployeesPage.employeeProfileBtn).toBeClickable();
      await EmployeesPage.employeeProfileBtn.click();
      // eslint-disable-next-line prettier/prettier
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/employees/profile/629d83d3d9d731ead71b218c');
      await expect(EmployeesPage.employeeProfileTable).toExist();
      await expect(EmployeesPage.employeeProfileEditBtn).toExist();
      await expect(EmployeesPage.employeeProfileEditBtn).toBeClickable();
      await expect(EmployeesPage.employeeProfileGoHomeBtn).toExist();
      await expect(EmployeesPage.employeeProfileGoHomeBtn).toBeClickable();
      await EmployeesPage.employeeProfileEditBtn.click();
    });
    it('Edit employee profile test', async () => {
      await LoginPage.open();
      await LoginPage.login('sarasa92@gmail.com', 'qwer1234');
      await EmployeesPage.homeNavBtn.click();
      await EmployeesPage.employeeProfileBtn.click();
      await EmployeesPage.employeeProfileEditBtn.click();
      await expect(EmployeesPage.employeeProfileCancelBtn).toExist();
      await expect(EmployeesPage.employeeProfileCancelBtn).toBeClickable();
      await expect(EmployeesPage.profileInputFirstName).toExist();
      await expect(EmployeesPage.profileInputLastName).toExist();
      await EmployeesPage.profileDropGender.click();
      await EmployeesPage.profileDropMale.click();
      await EmployeesPage.profileDropFemale.click();
      await EmployeesPage.profileDropOther.click();
      await expect(EmployeesPage.profileInputAddress).toExist();
      await expect(EmployeesPage.profileInputPhone).toExist();
      await expect(EmployeesPage.profileInputDOB).toExist();
      await expect(EmployeesPage.profileInputEmail).toExist();
      await expect(EmployeesPage.profileInputPassword).toExist();
      await expect(EmployeesPage.profileStatusCheckbox).toExist();
      await EmployeesPage.profileInputFirstName.setValue('Rosalia');
      await EmployeesPage.employeeProfileUpdateBtn.click();
    });
  });
});
