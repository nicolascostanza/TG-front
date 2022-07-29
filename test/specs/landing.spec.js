const LandingPage = require('../pageobjects/landing.page.js');

describe('Landing page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/');
  });

  describe('Elements display test in landing page', () => {
    it('Titles, texts, images and icons display test', async () => {
      await LandingPage.open();
      await expect(LandingPage.btnBurger).toExist();
      await expect(LandingPage.btnBurger).toBeClickable();
      await expect(LandingPage.h1Title).toExist();
      await expect(LandingPage.pSubtitle).toExist();
      await expect(LandingPage.pDescr).toExist();
      await expect(LandingPage.firstImg).toExist();

      await expect(LandingPage.h2Title).toExist();
      await expect(LandingPage.h3Subtitle).toExist();
      await expect(LandingPage.p2Descr).toExist();
      await expect(LandingPage.imgDescr).toExist();
      await expect(LandingPage.sectionFunct).toExist();
      await expect(LandingPage.sectionReasons).toExist();

      await expect(LandingPage.h2Form).toExist();

      await expect(LandingPage.h4Title).toExist();
      await expect(LandingPage.elementsList).toExist();
      await expect(LandingPage.sectionLists).toExist();

      await expect(LandingPage.footer).toExist();
      await expect(LandingPage.footerCopyright).toExist();
    });
  });

  describe('Form input test', () => {
    it('It should remain on the landing page once the form is sended', async () => {
      await LandingPage.open();
      await LandingPage.fillForm('Jane', 'jdoe@gmail.com', 'Description');
      await expect(browser).toHaveUrl('https://alfonso-trackgenix-app.vercel.app/?');
    });
  });

  describe('Redirection test in footer', () => {
    it('Social media redirection', async () => {
      await LandingPage.open();
      await expect(LandingPage.iconFacebook).toBeClickable();
      await expect(LandingPage.iconFacebook).toHaveLink('https://www.facebook.com/radiumrocket');
      await expect(LandingPage.iconTwitter).toBeClickable();
      await expect(LandingPage.iconTwitter).toHaveLink('https://twitter.com/radiumrocket');
      await expect(LandingPage.iconLinkedin).toBeClickable();
      // eslint-disable-next-line prettier/prettier
      await expect(LandingPage.iconLinkedin).toHaveLink('https://www.linkedin.com/company/radium-rocket');
      await expect(LandingPage.iconInstagram).toBeClickable();
      // eslint-disable-next-line prettier/prettier
      await expect(LandingPage.iconInstagram).toHaveLink('https://www.instagram.com/radium.rocket/');
      await expect(LandingPage.iconGitHub).toBeClickable();
      await expect(LandingPage.iconGitHub).toHaveLink('https://github.com/radiumrocketapps');
    });
  });
});
