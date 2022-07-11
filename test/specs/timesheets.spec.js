const LoginPage = require('../pageobjects/login.page');
const TimesheetsPage = require('../pageobjects/timesheets.page.js');

describe('Timesheets page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/time-sheets');
  });

  describe('Elements in Timesheets Page to be displayed', () => {
    it('Verify elements to be displayed', async () =>{
      await TimesheetsPage.open();
      await expect(TimesheetsPage.timesheetsTitle).toBeDisplayed();
      await expect(TimesheetsPage.allBtns).toBeClickable();
      await expect(TimesheetsPage.timesheetsTable).toBeDisplayed();
      await expect(TimesheetsPage.tableBtns).toBeClickable();
    });
  });
});
