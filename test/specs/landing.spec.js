const LandingPage = require('../pageobjects/landing.page');

describe('Home page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/');
  });

  describe('Main section elements test', () => {
    it('Checking header elements', async () => {
      await LandingPage.open();
      await expect(LandingPage.headerUl).toBeExisting();
      await expect(LandingPage.headerFbLink).toBeClickable();
      await expect(LandingPage.headerTwLink).toBeClickable();
      await expect(LandingPage.headerLinkedinLink).toBeClickable();
      await expect(LandingPage.headerInstagramLink).toBeClickable();
      await expect(LandingPage.headerGithubLink).toBeClickable();
    });

    it('Checking if main section is present', async () => {
      await LandingPage.open();
      await expect(LandingPage.landingTitle).toBeDisplayed();
      await expect(LandingPage.landingSubtitle).toBeDisplayed();
      await expect(LandingPage.landingTextMainSection).toBeDisplayed();
    });

    it('Checking if learn more button is clickable', async () => {
      await LandingPage.open();
      await expect(LandingPage.moreBtn).toBeClickable();
    });

    it('Checking if other sections are present', async () => {
      await LandingPage.open();
      await expect(LandingPage.sectionsTitles).toBeDisplayed();
      await expect(LandingPage.sectionsTexts).toBeDisplayed();
      await expect(LandingPage.sectionsSeparator).toBeDisplayed();
    });

    it('Checking if form is present', async () => {
      await LandingPage.open();
      await expect(LandingPage.inputName).toBeDisplayed();
      await expect(LandingPage.inputEmail).toBeDisplayed();
      await expect(LandingPage.selectCategory).toBeDisplayed();
      await expect(LandingPage.inputMessage).toBeDisplayed();
      await expect(LandingPage.submitMsgBtn).toBeClickable();
    });
  });

  describe('Main container elements test', () => {
    it('Checking if menu bar is clickable', async () => {
      await LandingPage.open();
      await expect(LandingPage.menuButton).toBeClickable();
    });
  });

  describe('Footer elements test', () => {
    it('Checking if social media links are clickable', async () => {
      await LandingPage.open();
      await expect(LandingPage.facebookLink).toBeClickable();
      await expect(LandingPage.twitterLink).toBeClickable();
      await expect(LandingPage.linkedinLink).toBeClickable();
      await expect(LandingPage.instagramLink).toBeClickable();
      await expect(LandingPage.githubLink).toBeClickable();
    });

    it('Checking if footer copyright is present', async () => {
      await LandingPage.open();
      await expect(LandingPage.footerCopyright).toBeExisting();
    });
  });

  describe('Sidebar elements test', () => {
    it('Checking if social bar title is present', async () => {
      await LandingPage.open();
      await LandingPage.menuButton.click();
      await expect(LandingPage.titleSidebar).toBeExisting();
    });

    it('Checking if sidebar elements exist', async () => {
      await LandingPage.open();
      await LandingPage.menuButton.click();
      await expect(LandingPage.homeLinkSidebar).toBeExisting();
      await expect(LandingPage.signupLinkSidebar).toBeExisting();
      await expect(LandingPage.loginLinkSidebar).toBeExisting();
      await expect(LandingPage.contactLinkSidebar).toBeExisting();
      await expect(LandingPage.secondSectionSidebar).toBeExisting();
    });
  });
});
