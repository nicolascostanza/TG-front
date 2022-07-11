class TimesheetsPage {
  /* eslint-disable */
    get timesheetsTitle () { return $('#root > div > section > div > h2') }
    get allBtns () { return $('.Button_Button__72Faw') }
    get timesheetsTable () { return $('.table_table__LagT9') }
    get tableBtns() { return $('.table_buttons__5SvZY') }
   
    async login (username, password) {
      await this.emailInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.continueBtn.click();
    }

    open() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/time-sheets');
  }
  }
  module.exports = new TimesheetsPage();
  /* eslint-enable */