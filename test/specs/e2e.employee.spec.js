const LoginPage = require('../pageobjects/login.page.js')
const EmployeePage = require('../pageobjects/employee.page')

describe('Employees e2e for trackGENIX app test', () => {
  beforeEach('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/login')
    LoginPage.login('sarasa92@gmail.com', 'qwer1234')
  })
  describe('Principal elements display testing', () => {
    it('Checking Profile button at home to work fine', async () => {
      await EmployeePage.homeNavBarLink.click()
      await expect(EmployeePage.employeeProfileBtn).toExist()
      await expect(EmployeePage.employeeProfileBtn).toBeClickable()
    })
    it('Checking Employee Profile page elements', async () => {
      await expect(EmployeePage.employeeTable).toExist()
      await expect(EmployeePage.employeeEditBtn).toBeClickable()
      await expect(EmployeePage.employeeoHomeBtn).toBeClickable()
    })
  })
  describe('Checking employee profile elements', () => {
    it('Checking Welcome title', async () => {
      await expect(EmployeePage.employeeWelcomeTitle).toHaveTextContaining('Welcome')
    })
    it('Checking redirection', async () => {
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/employees/profile/629d83d3d9d731ead71b218c')
    })
  })
  describe('Functionalities testing', () => {
    it('Edit employee', async () => {
      await EmployeePage.employeeProfileEditBtn.click()
      await expect(EmployeePage.employeeProfileCancelBtn).toBeClickable()
      await EmployeePage.profileInputFirstName.setValue('Agustina')
      await EmployeePage.employeeProfileUpdateBtn.click()
    })
  })
})