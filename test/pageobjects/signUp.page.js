class SignupPage {
    /* eslint-disable */
    //Getters
    get inputFirstName() { return $('[name="firstName"]') };
    get inputLastName() { return $('[name="lastName"]') };
    get inputEmail() { return $('[name="email"]') };
    get inputPassword() { return $('[name="password"]') };
    get errorMsgContainer() { return $('.signup_errorInput__5C7Py') };
    get btnReset() { return $('.signup_resetRipple__zMXQY') };
    get btnContinue() { return $('.signup_ripple__4xl2v') };
    get loginRedirect() { return $('.signup_bottomLinkContainer__0bZG9 > span > a') };
    get modalSuccess() { return $('.signup_modal__G7iuD') };
    get closeModal() { return $('i.fa-solid:nth-child(2)') };
    get projectsTable() { return $('.table_container__8U2Nr') }

    //Setters
    async setFirstName(firstName) {
        await this.inputFirstName.setValue(firstName)
    };
    async setLastName(lastName) {
        await this.inputLastName.setValue(lastName)
    };
    async setEmail(email) {
        await this.inputEmail.setValue(email)
    };
    async setPassword(password) {
        await this.inputPassword.setValue(password)
    };

    //Methods
    async signup(firstName, lastName, email, password) {
        await this.setFirstName(firstName);
        await this.setLastName(lastName);
        await this.setEmail(email);
        await this.setPassword(password);
    };

    open() {
        return browser.url('https://alfonso-trackgenix-app.vercel.app/signup')
    }
};
module.exports = new SignupPage();
  /* eslint-enable */