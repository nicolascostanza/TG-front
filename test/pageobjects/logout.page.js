class LogoutPage {
  /* eslint-disable */
    get logoutBtn () { return $('#root > div > header > nav > ul > li:nth-child(8) > a') }

    async login (username, password) {
      await this.emailInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.continueBtn.click();
    }

    open() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  }
  }
  module.exports = new LogoutPage();
  /* eslint-enable */