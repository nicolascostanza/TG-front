class ProfileEmployeePage {
  //-----------------------------------Getters--------------------------------------------
  //Employee name
  get employeeName() {
    return $('#root > div > h1');
  }
  //Buttons
  get editBtn() {
    return $('#root > div > div > button.profile_greenButton__hc9z6');
  }
  get cancelBtn() {
    return $('#root > div > div > button.profile_redButton__R8NSb');
  }
  get updateBtn() {
    return $('#root > div > form > button.profile_buttonSubmit__DELlj');
  }
  get goHomeBtn() {
    return $('#root > div > div > button.profile_goHome__Epo09');
  }
  get crossBtn() {
    return $(
      '#root > div > div.modal_modalBackground__6FizA > div > div.modal_modalHeader__r9G49 > i'
    );
  }
  //Profile form info
  get firstNameDiv() {
    return $('#root > div > form > div:nth-child(1)');
  }
  get lastNameDiv() {
    return $('#root > div > form > div:nth-child(2)');
  }
  get genderDiv() {
    return $('#root > div > form > div:nth-child(3)');
  }
  get addressDiv() {
    return $('#root > div > form > div:nth-child(4)');
  }
  get phoneDiv() {
    return $('#root > div > form > div:nth-child(5)');
  }
  get dobDiv() {
    return $('#root > div > form > div:nth-child(6)');
  }
  get emailDiv() {
    return $('#root > div > form > div:nth-child(7)');
  }
  get pwdDiv() {
    return $('#root > div > form > div:nth-child(8)');
  }
  get statusDiv() {
    return $('#root > div > form > div:nth-child(9)');
  }
  //Checkbox
  get activeInput() {
    return $('[name="active"]');
  }
  //-----------------------------------Methods--------------------------------------------
}

module.exports = new ProfileEmployeePage();
