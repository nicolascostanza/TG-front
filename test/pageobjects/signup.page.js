class SignUpPage {
    ///// GETTERS /////
    // Inputs
    get registerTitle() { return $('#root > div > section > section.signup_form__e\+PH4 > form > h1') }
    get firstNameInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(2) > div:nth-child(1) > input[type=text]') }
    get lastNameInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(2) > div:nth-child(2) > input[type=text]') }
    get genderInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(3) > div:nth-child(1) > select') }
    get addressInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(3) > div:nth-child(2) > input[type=text]') }
    get birthDateInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(4) > div:nth-child(1) > input[type=date]') }
    get phoneInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(4) > div:nth-child(2) > input[type=text]') }
    get registerEmailInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(5) > div:nth-child(1) > input[type=text]') }
    get registerPasswordInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(5) > div:nth-child(2) > input[type=password]') }
    // Error messages
    get fistNameError() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(2) > div:nth-child(1) > p') }
    get lastNameError() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(2) > div:nth-child(2) > p') }
    get genderInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(3) > div:nth-child(1) > select') }
    get addressError() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(3) > div:nth-child(2) > p') }
    get birthDateError() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(4) > div:nth-child(1) > p') }
    get phoneError() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(4) > div:nth-child(2) > p') }
    get registerEmailError() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(5) > div:nth-child(1) > p') }
    get registerPasswordError() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(5) > div:nth-child(2) > p') }
    // Buttons
    get resetBtn() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div.signup_buttonsContainer__RXc4V > button.signup_buttonReset__zwjfO') }
    get continueBtn() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div.signup_buttonsContainer__RXc4V > button.signup_buttonContinue__hlqTE') }

    ///// SETTERS /////
    async register(firstname, lastname, gender, address, birthdate, phone, email, password) {
    await this.firstNameInput.setValue(firstname)
    await this.lastNameInput.setValue(lastname)
    await this.genderInput.setValue(gender)
    await this.addressInput.setValue(address)
    await this.birthDateInput.setValue(birthdate)
    await this.phoneInput.setValue(phone)
    await this.registerEmailInput.setValue(email)
    await this.registerPasswordInput.setValue(password)
    await this.continueBtn.click()
    }
}
module.exports = new SignUpPage();