const SignupPage = require('../pageobjects/signup.page.js');
const LoginPage = require('../pageobjects/loginEmployee.page.js');
const Sidebar = require('../pageobjects/sidebar.page.js');
const HeaderSidebarFooterPage = require('../pageobjects/headerSideFooter.page.js');
const TimesheetPage = require('../pageobjects/timesheet.page.js');
const AdminsPage = require('../pageobjects/admins.page.js');
const HomeEmployeePage = require('../pageobjects/homeEmployee.page.js');

describe('Admin E2E', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/');
  });
  it('Se usa la side para ir al login', async () => {
    await Sidebar.btnBurger.click();
    await browser.pause(1000);
    await Sidebar.btnLogin.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.sunBtn.click();
    await LoginPage.fillInputs('admin@admin.com', 'admin123');
    await browser.keys('Enter');
    await browser.pause(5000);
  });
  it('Add a new Project', async () => {
    await AdminsPage.btnAdd.click();
    await browser.pause(1000);
    await AdminsPage.addProject(
      'Test Project',
      'Testing this project',
      'Test Client',
      '28/05/2022'
    );
    await AdminsPage.modalAddAccept.click();
    await browser.pause(1000);
    await AdminsPage.modalAddClose.click();
    await browser.pause(1000);
    await AdminsPage.btnBurger.click();
    await browser.pause(1000);
    await AdminsPage.btnLogout.click();
    await browser.pause(5000);
  });
  /*it('Add an employee', async () => {
    await AdminsPage.projectRow.click();
    await AdminsPage.btnAddEmployee.click();
    await AdminsPage.dropEmployee.click();
    await AdminsPage.optionEmployee.click();
    await AdminsPage.dropRole.click();
    await AdminsPage.optionRoleNone.click();
    await AdminsPage.optionRoleDev.click();
    await AdminsPage.optionRoleQA.click();
    await AdminsPage.optionRoleTL.click();
    await AdminsPage.modalAddEmployeeAccept.click();
    await browser.pause(1000);
    await AdminsPage.btnCloseModal.click();
    await browser.pause(1000);
    await AdminsPage.btnBurger.click();
    await browser.pause(1000);
    await AdminsPage.btnLogout.click();
    await browser.pause(5000);
  });*/
});

describe('Empleado PM E2E', () => {
  it('Se usa la side para ir al login', async () => {
    await Sidebar.btnBurger.click();
    await browser.pause(1000);
    await Sidebar.btnLogin.click();
    await browser.pause(1000);
    await LoginPage.fillInputs('friedrick@gmail.com', 'employee123');
    await browser.keys('Enter');
    await browser.pause(5000);
    await HeaderSidebarFooterPage.burgerBtn.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.timesheetsBtn.click();
    await browser.pause(2000);
    await TimesheetPage.addBtn.click();
    await browser.pause(2000);
    await TimesheetPage.fillInputs(
      'Vagram',
      '29072022',
      '9',
      'Pre-emptive upward-trending paradigm'
    );
    await TimesheetPage.submitBtn.click();
    await browser.pause(2000);
    await TimesheetPage.slider.click();
    await browser.pause(2000);
    await HeaderSidebarFooterPage.burgerBtn.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.projectBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.enterInProject.click();
    await browser.pause(2000);
    await HomeEmployeePage.addEmployeeBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.fillInputs('12');
    await browser.pause(2000);
    await HomeEmployeePage.submitBtn.click();
    await browser.pause(4000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.buttonTabTask.click();
    await browser.pause(2000);
    await HomeEmployeePage.addTaskBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.fillInputsTaskTab(
      'Task Name for test two',
      'Task description for test two',
      '28072022'
    );
    await browser.pause(1000);
    await HeaderSidebarFooterPage.burgerBtn.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.logoutBtn.click();
    await browser.pause(2000);
  });
});

describe('Empleado común E2E', () => {
  it('Se usa la side para ir al login', async () => {
    await Sidebar.btnBurger.click();
    await browser.pause(1000);
    await Sidebar.btnLogin.click();
    await browser.pause(1000);
    await LoginPage.fillInputs('lucianoClaros@gmail.com', 'employee123');
    await browser.keys('Enter');
    await browser.pause(5000);
    await HeaderSidebarFooterPage.burgerBtn.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.timesheetsBtn.click();
    await browser.pause(2000);
    await TimesheetPage.addBtn.click();
    await browser.pause(2000);
    await TimesheetPage.fillInputsNormalEmp(
      'Viva',
      '29072022',
      '12',
      'Pre-emptive upward-trending paradigm'
    );
    await TimesheetPage.submitBtn.click();
    await browser.pause(2000);
    await HeaderSidebarFooterPage.burgerBtn.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.logoutBtn.click();
    await browser.pause(2000);
  });
});

/*describe('Nuevo empleado E2E', () => {
  it('Se usa la side para ir al signup', async () => {
    await Sidebar.btnBurger.click();
    await browser.pause(1000);
    await Sidebar.btnSignup.click();
    await browser.pause(1000);
  });
  it('Se registra con datos validos empleado', async () => {
    await SignupPage.signup('Jane', 'Doe', 'employee@test.com', 'qwer1234');
    await SignupPage.btnContinue.click();
    await browser.pause(2000);
    await SignupPage.modalSuccess.isDisplayed();
    await SignupPage.closeModal.click();
    await browser.pause(2000);
    await HeaderSidebarFooterPage.burgerBtn.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.timesheetsBtn.click();
    await browser.pause(2000);
    await HeaderSidebarFooterPage.burgerBtn.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.logoutBtn.click();
    await browser.pause(2000);
  });
});*/
