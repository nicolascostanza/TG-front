class ProjectsPage {
  /* eslint-disable */
    get projectsTitle () { return $('#root > div > section > div > h2') }
    get allBtns () { return $('.Button_Button__72Faw') }
    get projectsTable () { return $('.table_table__LagT9') }
    get tableBtns() { return $('.table_buttons__5SvZY') }
    get dropdownSelect() { return $('.dropdown_select__ZGWWT') }
   
    async login (username, password) {
      await this.emailInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.continueBtn.click();
    }

    open() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/projects');
  }
  }
  module.exports = new ProjectsPage();
  /* eslint-enable */