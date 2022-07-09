class LoginPage {
  /* eslint-disable */
    //Getters
    get inputEmail () {return $('[name="email"]')};
    get inputPassword () {return $('[name="password"]')};
    get btnContinue () {return $('.login_buttonContinue__EGjlD')};
    get errorMsgContainer () {return $('.login_errorInput__gUgZZ')};
    get btnLogout () {return $('.header_rutes__-JsnG > li:nth-child(8) > a:nth-child(1)')};

    //Setters
    async setEmail(email) {
        await this.inputEmail.setValue(email)
    };
    async setPassword(password) {
        await this.inputPassword.setValue(password)
    };
  
    //Methods
    async login(email, password) {
        await this.setEmail(email);
        await this.setPassword(password);
        await this.btnContinue.click()
    };
  
    open() {
        return browser.url('https://alfonso-trackgenix-app.vercel.app/login')
    }
  };
  module.exports = new LoginPage();
  /* eslint-enable */