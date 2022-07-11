class EmployeesPage {
  /* eslint-disable */
    //Getters
    get homeNavBtn () {return $('.header_rutes__-JsnG > li:nth-child(1) > a:nth-child(1)')};
    get employeeProfileBtn () {return $('.Button_Button__72Faw')};
    get employeeProfileTable () {return $('.profile_form__GBd3S')};
    get employeeProfileEditBtn () {return $('.profile_greenButton__hc9z6')};
    get employeeProfileGoHomeBtn () {return $('.profile_goHome__Epo09')};
    get employeeProfileCancelBtn () {return $('.profile_redButton__R8NSb')};
    get employeeProfileUpdateBtn () {return $('.profile_buttonSubmit__DELlj')};

    get profileInputFirstName () {return $('div.profile_row__41l36:nth-child(1) > div:nth-child(2) > input:nth-child(1)')};
    get profileInputLastName () {return $('div.profile_row__41l36:nth-child(2) > div:nth-child(2) > input:nth-child(1)')};
    get profileDropGender () {return $('select.profile_inputsProfile__4UTDd')};
    get profileDropMale () {return $('select.profile_inputsProfile__4UTDd > option:nth-child(1)')};
    get profileDropFemale () {return $('select.profile_inputsProfile__4UTDd > option:nth-child(2)')};
    get profileDropOther () {return $('select.profile_inputsProfile__4UTDd > option:nth-child(3)')};

    get profileInputAddress () {return $('div.profile_row__41l36:nth-child(4) > div:nth-child(2) > input:nth-child(1)')};
    get profileInputPhone () {return $('div.profile_row__41l36:nth-child(5) > div:nth-child(2) > input:nth-child(1)')};
    get profileInputDOB () {return $('div.profile_row__41l36:nth-child(6) > div:nth-child(2) > input:nth-child(1)')};
    get profileInputEmail () {return $('div.profile_row__41l36:nth-child(7) > div:nth-child(2) > input:nth-child(1)')};
    get profileInputPassword () {return $('div.profile_row__41l36:nth-child(8) > div:nth-child(2) > input:nth-child(1)')};
    get profileStatusCheckbox () {return $('div.profile_row__41l36:nth-child(9) > div:nth-child(2) > input:nth-child(1)')};

    //Methods
    open() {
        return browser.url('https://alfonso-trackgenix-app.vercel.app/employees')
    }
  };
  module.exports = new EmployeesPage();
  /* eslint-enable */