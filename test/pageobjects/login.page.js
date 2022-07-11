class LoginPage {
  ///// GETTERS /////
  get inputEmail() { return $('[name="email"]') }
  get inputPassword() { return $('[name="password"]') }
  get continueBtn() { return $('.login_buttonContinue__EGjlD') }
  get errorEmailCont() { return $('#root > div > section > section.login_form__AeUm\+ > form > div.login_formFlex__UbsE0 > div:nth-child(1) > p') }
  get errorPasswordCont() { return $('#root > div > section > section.login_form__AeUm\+ > form > div.login_formFlex__UbsE0 > div:nth-child(2) > p') }
  get logoutBtn() {return $('.header_rutes__-JsnG > li:nth-child(8) > a:nth-child(1)')};  
  
  ///// SETTERS /////
  async login(email, password) {
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.continueBtn.click();
  }
}

module.exports = new LoginPage()
