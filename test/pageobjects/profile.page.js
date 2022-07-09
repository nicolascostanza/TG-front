class ProfilePage {
  /* eslint-disable */
  get profileWelcome() { return $('#root > div > h1') }
  get editBtn() { return $('.profile_greenButton__hc9z6') }
  get goHomeBtn() { return $('.profile_goHome__Epo09') }
  get profileForm() { return $('.profile_form__GBd3S') }
  get profileRow() { return $('.profile_row__41l36') }
  get profileLabel() { return $('.profile_label__8O3Es') }
  get profileText() { return $('.profile_text__n7Fuj') }
  
  open() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/');
  }
  async login(username, password) {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.continueBtn.click();
  }
}
module.exports = new ProfilePage();
/* eslint-enable */
