class SignUpPage {
  /* eslint-disable */
  get registerHeading() { return $('#root > div > section > section.signup_form__e\+PH4 > form > h1') }
  get firstNameLabel() { return $('.signup_labels__LfYGY') }
  get lastNameLabel() { return $('.signup_form__e\+PH4 > form > div:nth-child(2) > div:nth-child(2) > label') }
  get genderLabel() { return $('.signup_form__e\+PH4 > form > div:nth-child(3) > div:nth-child(1) > label') }
  get addressLabel() { return $('.signup_form__e\+PH4 > form > div:nth-child(3) > div:nth-child(2) > label') }
  get dobLabel() { return $('.signup_form__e\+PH4 > form > div:nth-child(4) > div:nth-child(1) > label') }
  get phoneLabel() { return $('.signup_form__e\+PH4 > form > div:nth-child(4) > div:nth-child(2) > label') }
  get emailLabel() { return $('.signup_form__e\+PH4 > form > div:nth-child(5) > div:nth-child(1) > label') }
  get passwordLabel() { return $('.signup_form__e\+PH4 > form > div:nth-child(5) > div:nth-child(2) > label') }

  get firstNameInput() { return $('.signup_form__e\+PH4 > form > div:nth-child(2) > div:nth-child(1) > input[type=text]>') }
  get lastNameInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(2) > div:nth-child(2) > input[type=text]') }
  get genderInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(3) > div:nth-child(1) > select') }
  get addressInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(3) > div:nth-child(2) > input[type=text]') }
  get dobInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(4) > div:nth-child(1) > input[type=date]') }
  get phoneInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(4) > div:nth-child(2) > input[type=text]') }
  get emailInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(5) > div:nth-child(1) > input[type=text]') }
  get passwordInput() { return $('#root > div > section > section.signup_form__e\+PH4 > form > div:nth-child(5) > div:nth-child(2) > input[type=password]') }

  get resetButton() { return $('.signup_buttonReset__zwjfO') }
  get continueButton() { return $('.signup_buttonContinue__hlqTE') }

  get errorField() { return $('.signup_errorInput__5C7Py') }
  get userCreatedModal() { return $('.signup_modal__G7iuD') }

  open() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/signup');
  }
}
module.exports = new SignUpPage()
/* eslint-enable */
