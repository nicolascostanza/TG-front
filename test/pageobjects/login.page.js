class LoginPage {
  /* eslint-disable */
    //Getters
    get inputEmail () {return $('[name="email"]')};
    get inputPassword () {return $('[name="password"]')};
    get btnContinue () {return $('.login_ripple__h7uDI')};
    get errorMsgContainer () {return $('.login_errorInput__gUgZZ')};
    get tableProjects () {return $('.table_table__vOhEM')};
    get btnSignup () {return $('.login_signupRedirect__xUjmZ')};
    get btnLogout () {return $('#log-out')};
    get landingDisplay () {return $('.landing_mainSection__pKaIS')};

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