class LoginPage {
  //-----------------------------------Getters--------------------------------------------
  get mailInput() {
    return $('[name="email"]');
  }
  get pwdInput() {
    return $('[name="password"]');
  }
  get continueBtn() {
    return $('.login_buttonsContainer__tswFM > button');
  }
  //-----------------------------------Setters--------------------------------------------
  async setMail(mail) {
    await this.mailInput.setValue(mail);
  }
  async setPwd(pwd) {
    await this.pwdInput.setValue(pwd);
  }
  //-----------------------------------Methods--------------------------------------------
  //Open browser in login page
  openLogin() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/login');
  }
  //Fill login inputs
  async fillInputs(mail, pwd) {
    await this.setMail(mail);
    await this.setPwd(pwd);
  }
}

module.exports = new LoginPage();
