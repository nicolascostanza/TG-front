class LoginPage {
/* eslint-disable */
  get emailInput () { return $('.login_formFlex__UbsE0 > div:nth-child(1) > input[type=text]') }
  get passwordInput () { return $('.login_formFlex__UbsE0 > div:nth-child(2) > input[type=password]') }
  get continueBtn () { return $('.login_buttonContinue__EGjlD') }
  get errorContainer() { return $('.login_errorInput__gUgZZ') }

  get headerLogo() { return $('.header_appName__ZCFAq') }
  get headerHome() { return $('#root > div > header > nav > ul > li:nth-child(1) > a') }
  get headerAdmin() { return $('#root > div > header > nav > ul > li:nth-child(2) > a') }
  get headerSuperAdmin() { return $('#root > div > header > nav > ul > li:nth-child(3) > a') }
  get headerEmployees() { return $('.header_rutes__-JsnG > li:nth-child(4) > a:nth-child(1)') }
  get headerProjects() { return $('#root > div > header > nav > ul > li:nth-child(5) > a') }
  get headerTimesheets() { return $('#root > div > header > nav > ul > li:nth-child(6) > a') }
  get headerTasks() { return $('#root > div > header > nav > ul > li:nth-child(7) > a') }

  async login (username, password) {
    await this.emailInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.continueBtn.click();
  }

  open() {
  return browser.url('https://alfonso-trackgenix-app.vercel.app/login');
}
}
module.exports = new LoginPage();
/* eslint-enable */
