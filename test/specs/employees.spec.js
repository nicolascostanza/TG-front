const LoginPage = require('../pageobjects/login.page.js');
const ProfilePage = require('../pageobjects/profile.page.js');
const EmployeesPage = require('../pageobjects/employees.page.js');

describe('Employees page testing', () => {
  beforeAll('Open browser', async () => {
    await LoginPage.open();
    await LoginPage.login('pastelitos@gmail.com', 'pastelitos123');
    await ProfilePage.profileEmployeeLink.click();
    // await LoginPage.headerEmployees.click();
    // await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app/employees');
    // await EmployeesPage.open();
  });

  it('Checking employees elements', async () => {
    await expect(EmployeesPage.employeesTitle).toBeExisting();
    await expect(EmployeesPage.employeesTable).toBeExisting();
    await expect(EmployeesPage.tableHeader).toBeExisting();
    await expect(EmployeesPage.tableRows).toBeExisting();
    await expect(EmployeesPage.addBtn).toBeClickable();
    await expect(EmployeesPage.tableBtns).toBeClickable();
  });
});
