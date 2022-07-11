class TasksPage {
  /* eslint-disable */
    get tasksTitle () { return $('#root > div > section > section.tasks_container__tvidq > div > h2') }
    get allBtns () { return $('.Button_Button__72Faw') }
    get tasksTable () { return $('.table_table__LagT9') }
    get tableBtns() { return $('.table_buttons__5SvZY') }
    get assignedEmployeeDropdown() { return $('.dropdown_select__ZGWWT') }

    async login (username, password) {
      await this.emailInput.setValue(username);
      await this.passwordInput.setValue(password);
      await this.continueBtn.click();
    }
    open() { return browser.url('https://alfonso-trackgenix-app.vercel.app/tasks') }
  }
  module.exports = new TasksPage();
  /* eslint-enable */