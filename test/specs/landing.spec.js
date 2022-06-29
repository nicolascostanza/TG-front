const LandingPage = require('../pageobjects/landing.page.js');

describe('Landing page test', () => {
  beforeAll('Open browser', async () => {
    await LandingPage.open();
  });
  it('Social Media buttons', async () => {
    await LandingPage.headerChecker();
  });
});
