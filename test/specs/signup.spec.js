const HomePage = require('../pageobjects/home.page')
const SignUpPage = require('../pageobjects/signup.page')

describe('REGISTER page test', () => {
    beforeAll('Open browser and go to sign up page', async () => {
        await browser.url('https://alfonso-trackgenix-app.vercel.app/')
        await HomePage.sidebarBtn.click()
        await HomePage.signUpLink.click()
    })
    it('Should redirect to REGISTER page', async () => {
        await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/signup')
    })
})