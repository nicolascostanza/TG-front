const HomePage = require('../pageobjects/home.page')
const LoginPage = require('../pageobjects/login.page');

describe('Login page of trackGENIX app test', () => {
  it('should login with valid credentials', async () => {
    await browser.url();

    await LoginPage.login('tomsmith', 'SuperSecretPassword!');
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!');
  });
});
