class LoginPage {
  ///// GETTERS /////
  get inputEmail() { return $('#root > div > section > section.login_form__AeUm\+ > form > div.login_formFlex__UbsE0 > div:nth-child(1) > input[type=text]') }
  get inputPassword() { return $('#root > div > section > section.login_form__AeUm\+ > form > div.login_formFlex__UbsE0 > div:nth-child(2) > input[type=password]') }
  get continueBtn() { return $('#root > div > section > section.login_form__AeUm\+ > form > div.login_buttonsContainer__tswFM > button') }
  get emailError() { return $('#root > div > section > section.login_form__AeUm\+ > form > div.login_formFlex__UbsE0 > div:nth-child(1) > p') }
  get passwordError() { return $('#root > div > section > section.login_form__AeUm\+ > form > div.login_formFlex__UbsE0 > div:nth-child(2) > p') }
  ///// SETTERS ////
  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.continueBtn.click();
  }
}

module.exports = new LoginPage()
