const LoginPage = require('../pageobjects/login.page.js');
const AdminsPage = require('../pageobjects/admins.page.js');

describe('Admins page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  });

  describe('Elements display test in admins page - projects table', () => {
    it('Titles, texts, images and icons display test: Admins page and add project feature', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', 'admin123');
      await expect(AdminsPage.projectsTableContainer).toBeDisplayed();

      await expect(AdminsPage.btnAdd).toExist();
      await expect(AdminsPage.btnAdd).toBeClickable();
      await AdminsPage.btnAdd.click();
      await expect(AdminsPage.labelName).toExist();
      await expect(AdminsPage.inputName).toExist();
      await expect(AdminsPage.labelDescription).toExist();
      await expect(AdminsPage.inputDescription).toExist();
      await expect(AdminsPage.labelClient).toExist();
      await expect(AdminsPage.inputClient).toExist();
      await expect(AdminsPage.labelStartDate).toExist();
      await expect(AdminsPage.inputStartDate).toExist();
      await expect(AdminsPage.labelEndDate).toExist();
      await expect(AdminsPage.inputEndDate).toExist();
      await expect(AdminsPage.modalAddClose).toExist();
      await expect(AdminsPage.modalAddClose).toBeClickable();
      await expect(AdminsPage.modalAddAccept).toExist();
      await expect(AdminsPage.modalAddAccept).toBeClickable();
      await AdminsPage.modalAddClose.click();
      await AdminsPage.btnBurger.click();
      await AdminsPage.btnLogout.click()
    });
  });

  describe('Projects features test', () => {
    it('Empty fields should display error messages', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', 'admin123');
      await AdminsPage.btnAdd.click();
      await AdminsPage.addProject('', '', '', '', '');
      await AdminsPage.modalAddAccept.click();
      await expect(AdminsPage.errorMsgName).toHaveText('"name" is not allowed to be empty');
      await expect(AdminsPage.errorMsgDescription).toHaveText('This field is required');
      await expect(AdminsPage.errorMsgClient).toHaveText('This field is required');
      await expect(AdminsPage.errorMsgStartDate).toHaveText('Date is not valid');
      await AdminsPage.modalAddClose.click();
      await AdminsPage.btnBurger.click();
      await AdminsPage.btnLogout.click()
    });
    it('Invalid fields should display error messages', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', 'admin123');
      await AdminsPage.btnAdd.click();
      await AdminsPage.addProject('A', 'A', 'A', '', '');
      await AdminsPage.modalAddAccept.click();
      /* eslint-disable prettier/prettier */
      await expect(AdminsPage.errorMsgName).toHaveText('Name must contain at least 3 characters');
      await expect(AdminsPage.errorMsgDescription).toHaveText('Description must contain at least 3 characters');
      await expect(AdminsPage.errorMsgClient).toHaveText('Client name must contain 3 or more characters');
      await expect(AdminsPage.errorMsgStartDate).toHaveText('Date is not valid');
      /* eslint-enable prettier/prettier */
      await AdminsPage.modalAddClose.click()
      await AdminsPage.btnBurger.click();
      await AdminsPage.btnLogout.click()
    });
    it('Add a new Project', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', 'admin123');
      await AdminsPage.btnAdd.click();
      await AdminsPage.addProject(
        'Test Project',
        'Testing this project',
        'Test Client',
        '28/05/2022'
      );
      await AdminsPage.modalAddAccept.click();
      await expect(AdminsPage.modalContainer).toBeDisplayed();
      await expect(AdminsPage.modalAddClose).toExist();
      await expect(AdminsPage.modalAddClose).toBeClickable();
      await AdminsPage.modalAddClose.click();
      await AdminsPage.btnBurger.click();
      await AdminsPage.btnLogout.click();
    });
    it('Add an employee', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', 'admin123');
      await AdminsPage.projectRow.click();
      await expect(AdminsPage.btnAddEmployee).toExist();
      await expect(AdminsPage.btnAddEmployee).toBeClickable();
      await AdminsPage.btnAddEmployee.click();
      await AdminsPage.dropEmployee.click();
      await AdminsPage.optionEmployee.click();
      await AdminsPage.dropRole.click();
      await AdminsPage.optionRoleNone.click();
      await AdminsPage.optionRoleDev.click();
      await AdminsPage.optionRoleQA.click();
      await AdminsPage.optionRoleTL.click();
      await AdminsPage.modalAddEmployeeAccept.click();
      await AdminsPage.btnCloseModal.click();
      await AdminsPage.btnBurger.click();
      await AdminsPage.btnLogout.click()
    });
    it('Edit a project', async () => {
      await LoginPage.open();
      await LoginPage.login('admin@admin.com', 'admin123');
      await AdminsPage.projectRow.click();
      await expect(AdminsPage.btnBackProjects).toExist();
      await expect(AdminsPage.btnBackProjects).toBeClickable();
      await AdminsPage.btnBackProjects.click();
      await AdminsPage.projectRow.click();
      await expect(AdminsPage.btnAddPM).toExist();
      await expect(AdminsPage.btnAddPM).toBeClickable();
      await AdminsPage.btnAddPM.click();
      await AdminsPage.dropPM.click();
      await AdminsPage.dropPMOption.click();
      await AdminsPage.btnAcceptPM.click();
      await AdminsPage.btnCloseModal.click();
      await AdminsPage.btnBurger.click();
      await AdminsPage.btnLogout.click()
    });
  });
});