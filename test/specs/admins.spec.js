const LoginPage = require('../pageobjects/login.page.js');
const AdminsPage = require('../pageobjects/admins.page.js');

describe('Admins page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  });

  describe('Elements display test in admins page', () => {
    it('Titles, texts, images and icons display test', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');

      await expect(AdminsPage.btnAdd).toExist();
      await expect(AdminsPage.btnAdd).toBeClickable();
      await AdminsPage.btnAdd.click();
      await expect(AdminsPage.labelName).toExist();
      await expect(AdminsPage.inputName).toExist();
      await expect(AdminsPage.labelLastName).toExist();
      await expect(AdminsPage.inputLastName).toExist();
      await expect(AdminsPage.labelEmail).toExist();
      await expect(AdminsPage.inputEmail).toExist();
      await expect(AdminsPage.labelPassword).toExist();
      await expect(AdminsPage.inputPassword).toExist();
      await expect(AdminsPage.labelActive).toExist();
      await expect(AdminsPage.checkboxActive).toBeClickable();
      await expect(AdminsPage.btnReset).toExist();
      await expect(AdminsPage.btnReset).toBeClickable();
      await expect(AdminsPage.btnSubmit).toExist();
      await expect(AdminsPage.btnSubmit).toBeClickable();
      await expect(AdminsPage.btnClose).toExist();
      await expect(AdminsPage.btnClose).toBeClickable();

      await AdminsPage.btnSubmit.click();
      await expect(AdminsPage.errorMsgName).toExist();
      await expect(AdminsPage.errorMsgLastName).toExist();
      await expect(AdminsPage.errorMsgEmail).toExist();
      await expect(AdminsPage.errorMsgPassword).toExist();

      await AdminsPage.btnClose.click();
      await expect(AdminsPage.h2Admins).toExist();
      await expect(AdminsPage.completeTable).toExist();
      await expect(AdminsPage.headerTable).toExist();
      await expect(AdminsPage.rowTable).toExist();
      await expect(AdminsPage.btnEdit).toExist();
      await expect(AdminsPage.btnEdit).toBeClickable();
      await expect(AdminsPage.btnDelete).toExist();
      await expect(AdminsPage.btnDelete).toBeClickable();
      await expect(AdminsPage.btnNext).toExist();
      await expect(AdminsPage.btnNext).toBeClickable();
    });
  });

  describe('Add admin feature test', () => {
    it('Empty fields should display error messages', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');
      await AdminsPage.btnAdd.click();
      await AdminsPage.addAdmin('', '', '', '');
      await AdminsPage.btnSubmit.click();
      await expect(AdminsPage.errorMsgName).toHaveText('This field is required');
      await expect(AdminsPage.errorMsgLastName).toHaveText('This field is required');
      await expect(AdminsPage.errorMsgEmail).toHaveText('This field is required');
      await expect(AdminsPage.errorMsgPassword).toHaveText('This field is required');
    });
    it('Invalid fields should display error messages', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');
      await AdminsPage.btnAdd.click();
      await AdminsPage.addAdmin('J', 'D', 'adminkpo@admin.c', 'q');
      await AdminsPage.btnSubmit.click();
      /* eslint-disable prettier/prettier */
      await expect(AdminsPage.errorMsgName).toHaveText('First name must contain at least 3 characters');
      await expect(AdminsPage.errorMsgLastName).toHaveText('Last name must contain at least 3 characters');
      await expect(AdminsPage.errorMsgPassword).toHaveText('Password must contain at least 8 characters');
      /* eslint-enable prettier/prettier */
      await AdminsPage.btnReset.click();
    });
    it('Add a new admin', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');
      await AdminsPage.btnAdd.click();
      await AdminsPage.addAdmin('Judas', 'Priest', 'satan666@gmail.com', 'qwer1234');
      await AdminsPage.btnSubmit.click();
    });
    it('Edit an admin', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');
      await AdminsPage.btnNext.click();
      await AdminsPage.btnNext.click();
      await AdminsPage.btnEdit.click();
      await AdminsPage.inputName.setValue('Robby');
      await AdminsPage.btnSubmit.click();
    });
    it('Delete an admin', async () => {
      await LoginPage.open();
      await LoginPage.login('adminkpo@admin.com', 'qwer1234');
      await AdminsPage.btnNext.click();
      await AdminsPage.btnNext.click();
      await AdminsPage.btnDelete.click();
      await expect(AdminsPage.modalDelete).toBeDisplayed();
      await expect(AdminsPage.modalBtnCancel).toExist();
      await expect(AdminsPage.modalBtnCancel).toBeClickable();
      await expect(AdminsPage.modalBtnAccept).toExist();
      await expect(AdminsPage.modalBtnAccept).toBeClickable();
      await AdminsPage.modalBtnAccept.click();
    });
  });
});
