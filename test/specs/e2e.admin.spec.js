const HomePage = require('../pageobjects/home.page')
const HeaderPage = require('../pageobjects/header.page')
const LoginPage = require('../pageobjects/login.page')
const AdminsPage = require('../pageobjects/admin.page')

describe('Admins e2e for trackGENIX app test', () => {
	describe('Elements and redirections testing', () => {
		it('Checking redirection to ADMIN PROFILE home', async () => {
			await browser.url('https://alfonso-trackgenix-app.vercel.app/login')
			await LoginPage.login('adminkpo@admin.com', 'qwer1234')
			await HeaderPage.navHomeLink.click()
			await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/')
		})
		it('Checking ADMIN PROFILE button', async () => {
		await browser.url('https://alfonso-trackgenix-app.vercel.app/login')
		await LoginPage.login('adminkpo@admin.com', 'qwer1234')
		await expect(AdminsPage.adminProfileBtn).toBeClickable()
		})
		it('Checking ADMIN PROFILE button redirection to admin table list', async () => {
		await browser.url('https://alfonso-trackgenix-app.vercel.app/login')
		await LoginPage.login('adminkpo@admin.com', 'qwer1234')
		await AdminsPage.adminProfileBtn.click()
		await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/admins/profile/62bb2dbe576424de7c76bff5')
		})
	  it('Checking Admin table list page elements', async () => {
		await expect(EmployeePage.employeeTable).toExist()
		await expect(EmployeePage.employeeEditBtn).toBeClickable()
		await expect(EmployeePage.employeeGoHomeBtn).toBeClickable()
   })
   it('Checking Welcome title', async () => {
		await expect(EmployeePage.employeeWelcomeTitle).toHaveTextContaining('Welcome')
   })
	})
})