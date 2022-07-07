const LandingPage = require('../pageobjects/landing.page.js');

describe('Landing page buttons and inputs test', () => {
  beforeAll('Open browser', async () => {
    await LandingPage.openLanding();
  });
  it('Sidebar buttons', async () => {
    await LandingPage.sideChecker();
  });
  it('Header buttons', async () => {
    await LandingPage.headerChecker();
  });
  it('Request info process', async () => {
    await LandingPage.reqInfo('Test Name', 'test@testing.com', 'Example text for this test');
  });
  it('Footer buttons', async () => {
    await LandingPage.footerChecker();
  });
});

describe('Landing page sections content test', () => {
  it('Hi, we are Trackgenix SA section', async () => {
    await expect(LandingPage.hiImTgSection).toExist();
    await expect(LandingPage.hiImTgSection).toHaveText('Hi, we are Trackgenix SA');
    await expect(LandingPage.subtitle).toExist();
    await expect(LandingPage.subtitle).toHaveText('A FREE AND FULLY RESPONSIVE SITE');
    await expect(LandingPage.mainParagraph).toExist();
    await LandingPage.mainParagraph.isDisplayed();
    await expect(LandingPage.mainImg).toExist();
    await LandingPage.mainImg.isDisplayed();
    await expect(LandingPage.learnMoreBtn).toBeClickable();
  });
  it('Functionalities section', async () => {
    await expect(LandingPage.functionalitiesSection).toExist();
    await expect(LandingPage.functionalitiesSection).toHaveText('Functionalities');
    await expect(LandingPage.sectionTwoDivOne).toExist();
    await LandingPage.sectionTwoDivOne.isDisplayed();
    await expect(LandingPage.sectionTwoDivTwo).toExist();
    await LandingPage.sectionTwoDivTwo.isDisplayed();
    await expect(LandingPage.sectionTwoDivThree).toExist();
    await LandingPage.sectionTwoDivThree.isDisplayed();
    await expect(LandingPage.sectionTwoDivFour).toExist();
    await LandingPage.sectionTwoDivFour.isDisplayed();
  });
  it('Reasons why you need us section', async () => {
    await expect(LandingPage.reasonsWhySection).toExist();
    await expect(LandingPage.reasonsWhySection).toHaveText('Reasons why you need us');
    await expect(LandingPage.sectionThreeDivOne).toExist();
    await LandingPage.sectionThreeDivOne.isDisplayed();
    await expect(LandingPage.sectionThreeDivTwo).toExist();
    await LandingPage.sectionThreeDivTwo.isDisplayed();
    await expect(LandingPage.sectionThreeDivThree).toExist();
    await LandingPage.sectionThreeDivThree.isDisplayed();
    await expect(LandingPage.sectionThreeDivFour).toExist();
    await LandingPage.sectionThreeDivFour.isDisplayed();
  });
  it('Request information section', async () => {
    await expect(LandingPage.requestInfoSection).toExist();
    await expect(LandingPage.requestInfoSection).toHaveText('Request information');
    await expect(LandingPage.nameInput).toExist();
    await LandingPage.nameInput.isDisplayed();
    await expect(LandingPage.emailInput).toExist();
    await LandingPage.emailInput.isDisplayed();
    await expect(LandingPage.dropdownBtn).toExist();
    await LandingPage.dropdownBtn.isDisplayed();
    await expect(LandingPage.textArea).toExist();
    await LandingPage.textArea.isDisplayed();
    await expect(LandingPage.sendMsgBtn).toExist();
    await LandingPage.sendMsgBtn.isDisplayed();
  });
  it('Misc section', async () => {
    await expect(LandingPage.productTitle).toExist();
    await expect(LandingPage.productTitle).toHaveText('Products');
    await expect(LandingPage.companyTitle).toExist();
    await expect(LandingPage.companyTitle).toHaveText('Company');
    await expect(LandingPage.supportTitle).toExist();
    await expect(LandingPage.supportTitle).toHaveText('Support');
  });
});
