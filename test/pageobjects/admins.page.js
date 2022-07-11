class AdminsPage {
  /* eslint-disable */
    //Getters
    get h2Admins () {return $('.table_container__TD1ls > h2:nth-child(1)')};
    get btnAdd () {return $('.Button_Button__72Faw')};
    get completeTable () {return $('.table_table__LagT9')};
    get headerTable () {return $('.table_table__LagT9 > thead:nth-child(1)')};
    get rowTable () {return $('tr.table_row__MJXZG')};
    get btnEdit () {return $('tr.table_row__MJXZG:nth-child(1) > td:nth-child(7) > button:nth-child(1)')};
    get btnDelete () {return $('tr.table_row__MJXZG:nth-child(1) > td:nth-child(8) > button:nth-child(1)')};
    get btnNext () {return $('.table_buttons__5SvZY > div:nth-child(3) > button:nth-child(1)')};

    get labelName () {return $('.form_inputs__IGiGt > div:nth-child(1) > label:nth-child(1)')};
    get inputName () {return $('.form_inputs__IGiGt > div:nth-child(1) > input:nth-child(2)')};
    get errorMsgName () {return $('.form_inputs__IGiGt > div:nth-child(1) > p:nth-child(3)')};

    get labelLastName () {return $('.form_inputs__IGiGt > div:nth-child(2) > label:nth-child(1)')};
    get inputLastName () {return $('.form_inputs__IGiGt > div:nth-child(2) > input:nth-child(2)')};
    get errorMsgLastName () {return $('.form_inputs__IGiGt > div:nth-child(2) > p:nth-child(3)')};

    get labelEmail () {return $('.form_inputs__IGiGt > div:nth-child(3) > label:nth-child(1)')};
    get inputEmail () {return $('.form_inputs__IGiGt > div:nth-child(3) > input:nth-child(2)')};
    get errorMsgEmail () {return $('.form_inputs__IGiGt > div:nth-child(3) > p:nth-child(3)')};

    get labelPassword () {return $('.form_inputs__IGiGt > div:nth-child(4) > label:nth-child(1)')};
    get inputPassword () {return $('.form_inputs__IGiGt > div:nth-child(4) > input:nth-child(2)')};
    get errorMsgPassword () {return $('.form_inputs__IGiGt > div:nth-child(4) > p:nth-child(3)')};

    get labelActive () {return $('.form_inputs__IGiGt > div:nth-child(5) > div:nth-child(1) > label:nth-child(1)')};
    get checkboxActive () {return $('.form_inputs__IGiGt > div:nth-child(5) > div:nth-child(2) > input:nth-child(1)')};

    get btnReset () {return $('.form_inputs__IGiGt > div:nth-child(5) > button:nth-child(3)')};
    get btnSubmit () {return $('.form_form__QU0ap > div:nth-child(1) > button:nth-child(3)')};
    get btnClose () {return $('i.fa-solid:nth-child(2)')};

    get modalDelete () {return $('.modal_modalContainer__Sdomi')};
    get modalBtnAccept () {return $('.admins_boxButtons__Kokps > button:nth-child(1)')};
    get modalBtnCancel () {return $('.admins_boxButtons__Kokps > button:nth-child(2)')};

    //Setters
    async setName(name) {
        await this.inputName.setValue(name)
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
    async addAdmin(name, lastName, email, password) {
        await this.setName(name);
        await this.setLastName(lastName);
        await this.setEmail(email);
        await this.setPassword(password);
    };
  
    open() {
        return browser.url('https://alfonso-trackgenix-app.vercel.app/admins')
    }
  };
  module.exports = new AdminsPage();
  /* eslint-enable */