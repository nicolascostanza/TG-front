const SidebarPage = require('../pageobjects/sidebar.page.js');
const LandingPage = require('../pageobjects/landing.page.js');

describe('Login page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/');
  });

  describe('Elements display test in sidebar', () => {
    it('Titles, texts, images and icons display test', async () => {
      await LandingPage.open();
      await expect(SidebarPage.btnBurger).toExist();
      await expect(SidebarPage.btnBurger).toBeClickable();
      await SidebarPage.btnBurger.click();
      await expect(SidebarPage.pMenu).toExist();
      await expect(SidebarPage.btnClose).toExist();
      await expect(SidebarPage.btnClose).toBeClickable();

      await expect(SidebarPage.pMenu).toExist();
      await expect(SidebarPage.btnAbout).toExist();
      await expect(SidebarPage.btnAbout).toBeClickable();
      await expect(SidebarPage.btnFunct).toExist();
      await expect(SidebarPage.btnFunct).toBeClickable();
      await expect(SidebarPage.btnReasons).toExist();
      await expect(SidebarPage.btnReasons).toBeClickable();
      await expect(SidebarPage.btnContact).toExist();
      await expect(SidebarPage.btnContact).toBeClickable();

      await expect(SidebarPage.btnSignup).toExist();
      await expect(SidebarPage.btnSignup).toBeClickable();
      await expect(SidebarPage.btnLogin).toExist();
      await expect(SidebarPage.btnLogin).toBeClickable();
    });
  });

  describe('Redirection test in sidebar', () => {
    it('Login and signup redirection', async () => {
      await LandingPage.open();
      await SidebarPage.btnBurger.click();
      await SidebarPage.btnSignup.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/signup');
      await SidebarPage.btnBurger.click();
      await SidebarPage.btnLogin.click();
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/login');
    });
  });
});