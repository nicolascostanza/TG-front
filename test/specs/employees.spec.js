const HomePage = require('../pageobjects/home.page')
const LoginPage = require('../pageobjects/login.page')
const EmployeesPage = require('../pageobjects/employees.page')

describe('Employees e2e for trackGENIX app test', () => {
  beforeAll('Open browser and login with valid credentials', async () => {
    await browser.url('https://alfonso-trackgenix-app.vercel.app/login')
    await LoginPage.login('sarasa92@gmail.com', 'qwer1234')
    await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/employees/profile/62b89fb0dd9fb8d43161894c')
  })
})
