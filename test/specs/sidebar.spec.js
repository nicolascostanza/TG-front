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
      await expect(SidebarPage.btnSignup).toExist();
      await expect(SidebarPage.btnSignup).toBeClickable();
      await expect(SidebarPage.btnLogin).toExist();
      await expect(SidebarPage.btnLogin).toBeClickable();

      await expect(SidebarPage.h2Touch).toExist();
      await expect(SidebarPage.btnHours).toExist();
      await expect(SidebarPage.btnHours).toBeClickable();
      await expect(SidebarPage.btnReports).toExist();
      await expect(SidebarPage.btnReports).toBeClickable();
      await expect(SidebarPage.btnManagement).toExist();
      await expect(SidebarPage.btnManagement).toBeClickable();
      await expect(SidebarPage.btnRoles).toExist();
      await expect(SidebarPage.btnRoles).toBeClickable();
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
