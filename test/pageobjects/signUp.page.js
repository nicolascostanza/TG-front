class SignUpPage {
  //-----------------------------------Getters--------------------------------------------
  //Form title
  get formTitle() {
    return $('.signup_form__e+PH4 > form > h1');
  }
  //Form inputs
  get firstNameInput() {
    return $('[name="firstName"]');
  }
  get lastNameInput() {
    return $('[name="lastName"]');
  }
  get genderDropdown() {
    return $('[name="gender"]');
  }
  get male() {
    return $('[value="Male"');
  }
  get female() {
    return $('[value="Female"');
  }
  get other() {
    return $('[value="Other"');
  }
  get addressInput() {
    return $('[name="address"]');
  }
  get dobInput() {
    return $('[name="dob"]');
  }
  get phoneInput() {
    return $('[name="phone"]');
  }
  get emailInput() {
    return $('[name="email"]');
  }
  get passInput() {
    return $('[name="password"]');
  }
  //Form buttons
  get resetBtn() {
    return $('.signup_buttonReset__zwjfO');
  }
  get continueBtn() {
    return $('.signup_buttonContinue__hlqTE');
  }
  //-----------------------------------Setters--------------------------------------------
  async setFirstName(name) {
    await this.firstNameInput.setValue(name);
  }
  async setLastname(lastName) {
    await this.lastNameInput.setValue(lastName);
  }
  async setAddress(address) {
    await this.addressInput.setValue(address);
  }
  async setDob(dob) {
    await this.dobInput.setValue(dob);
  }
  async setPhone(phone) {
    await this.phoneInput.setValue(phone);
  }
  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setPwd(pwd) {
    await this.passInput.setValue(pwd);
  }
  //-----------------------------------Methods--------------------------------------------
  //Open browser in SignUp page
  openSignUp() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/signup');
  }
  //Fill inputs
  async fillInputs(name, lastName, address, dob, phone, email, pwd) {
    await this.setFirstName(name);
    await this.setLastname(lastName);
    await this.setAddress(address);
    await this.setDob(dob);
    await this.setPhone(phone);
    await this.setEmail(email);
    await this.setPwd(pwd);
  }
  //Dropdown checker
  async genderChecker() {
    await expect(this.genderDropdown).toBeClickable();
    await this.genderDropdown.click();
    await this.other.click();
    await this.genderDropdown.click();
    await this.female.click();
    await this.genderDropdown.click();
    await this.male.click();
  }
}

module.exports = new SignUpPage();
