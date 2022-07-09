const LoginPage = require('../pageobjects/login.page');
const ProfilePage = require('../pageobjects/profile.page');

describe('Profile page testing', () => {
  beforeAll('Open browser', async () => {
    await LoginPage.open();
    await LoginPage.login('pastelitos@gmail.com', 'pastelitos123');
  });

  describe('Login with valid user', () => {
    it('Verify successful login', async () => {
      await LoginPage.open();
      await LoginPage.login('pastelitos@gmail.com', 'pastelitos123');
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/login');
    });
  });

  it('Checking profile elements', async () => {
    await expect(ProfilePage.profileWelcome).toBeExisting();
    await expect(ProfilePage.profileForm).toBeExisting();
    await expect(ProfilePage.profileRow).toBeExisting();
    await expect(ProfilePage.profileLabel).toBeExisting();
    await expect(ProfilePage.profileText).toBeExisting();
    await expect(ProfilePage.editBtn).toBeClickable();
    await expect(ProfilePage.goHomeBtn).toBeClickable();
  });
});
