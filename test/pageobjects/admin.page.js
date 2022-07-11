class AdminsPage {
    ///// GETTERS /////
    // Titles & other elements
    get adminTitle() { return $('#root > div > section > div.table_container__TD1ls > h2') }
    get adminWelcomeTitle() { return $('#root > div > h1') }
    get adminTable() { return $('.profile_form__J0E0W') }

    // Buttons
    get adminProfileBtn() { return $('.Button_Button__72Faw') }
    get adminEditBtn() { return $('#root > div > div > button') }
    get adminCancelBtn() { return $('#root > div > div > button') }
    get adminUpdateBtn() { return $('#root > div > form > button') }
    get adminAddBtn() { return $('.profile_buttonSubmit__c3a3J') }

    // Modals
    get adminModal() { return $('#root > div > div.modal_modalBackground__6FizA > div') }
    
    // Edit Inputs
    get adminFirstNameInput() { return $('div.profile_row__lVWUT:nth-child(1) > div:nth-child(2) > input:nth-child(1)') }
    get adminLastNameInput() { return $('div.profile_row__lVWUT:nth-child(2) > div:nth-child(2) > input:nth-child(1)') }
    get adminEmailInput() { return $('div.profile_row__lVWUT:nth-child(3) > div:nth-child(2) > input:nth-child(1)') }
    get adminPasswordInput() { return $('div.profile_row__lVWUT:nth-child(4) > div:nth-child(2) > input:nth-child(1)') }
    get adminStatusCheckbox() { return $('div.profile_row__lVWUT:nth-child(5) > div:nth-child(2) > input:nth-child(1)') }

    ///// SETTERS /////
    async setName(name) {
        await this.adminFirstNameInput.setValue(name)
    };
    async setLastName(lastName) {
        await this.adminLastNameInput.setValue(lastName)
    };
    async setEmail(email) {
        await this.adminEmailInput.setValue(email)
    };
    async setPassword(password) {
        await this.adminPasswordInput.setValue(password)
    };

    //Methods
    async editAdmin(name, lastName, email, password) {
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