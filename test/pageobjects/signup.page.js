class SignupPage {
  /* eslint-disable */
    //Getters
    get inputFirstName () {return $('[name="firstName"]')};
    get inputLastName () {return $('[name="lastName"]')};
    get dropGender () {return $('[name="gender"]')};
    get dropMale () {return $('div.signup_formFlex__sIzDD:nth-child(3) > div:nth-child(1) > select:nth-child(2) > option:nth-child(1)')};
    get dropFemale () {return $('div.signup_formFlex__sIzDD:nth-child(3) > div:nth-child(1) > select:nth-child(2) > option:nth-child(2)')};
    get dropOther () {return $('div.signup_formFlex__sIzDD:nth-child(3) > div:nth-child(1) > select:nth-child(2) > option:nth-child(3)')};
    get inputAddress () {return $('[name="address"]')};
    get inputDOB () {return $('[name="dob"]')};
    get inputPhone () {return $('[name="phone"]')};
    get inputEmail () {return $('[name="email"]')};
    get inputPassword () {return $('[name="password"]')};
    get errorMsgContainer () {return $('.signup_errorInput__5C7Py')};
    get btnReset () {return $('.signup_buttonReset__zwjfO')};
    get btnContinue () {return $('.signup_buttonContinue__hlqTE')};
    get modalEmployee () {return $('.signup_modal__G7iuD')};
    get btnModal () {return $('.signup_buttonOk__JCLUt')}
    get btnLogout () {return $('.header_rutes__-JsnG > li:nth-child(8) > a:nth-child(1)')};

    //Setters
    async setFirstName(firstName) {
        await this.inputFirstName.setValue(firstName)
    };
    async setLastName(lastName) {
        await this.inputLastName.setValue(lastName)
    };
    async setAddress(address) {
        await this.inputAddress.setValue(address)
    };
    async setDOB(dob) {
        await this.inputDOB.setValue(dob)
    };
    async setPhone(phone) {
        await this.inputPhone.setValue(phone)
    };
    async setEmail(email) {
        await this.inputEmail.setValue(email)
    };
    async setPassword(password) {
        await this.inputPassword.setValue(password)
    };

    //Methods
    async signup(firstName, lastName, address, dob, phone, email, password) {
        await this.setFirstName(firstName);
        await this.setLastName(lastName);
        await this.setAddress(address);
        await this.setDOB(dob);
        await this.setPhone(phone);
        await this.setEmail(email);
        await this.setPassword(password);
    };

    open() {
        return browser.url('https://alfonso-trackgenix-app.vercel.app/signup')
    }
};
module.exports = new SignupPage();
  /* eslint-enable */