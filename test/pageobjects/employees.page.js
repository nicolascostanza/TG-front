class EmployeesPage {
  /* eslint-disable */
  get employeesTitle() { return $('#root > div > section > section:nth-child(2) > div > h2') }
  get addBtn() { return $('.Button_Button__72Faw') }
  get employeesTable() { return $('.table_table__LagT9') }
  get tableHeader() { return $('#root > div > section > section:nth-child(2) > div > table > thead') }
  get tableRows() { return $('.table_row__MJXZG') }
  get tableBtns() { return $('.Button_Button__72Faw') }

  open() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/employees');
  }
  async login(username, password) {
    await this.setUsername(username);
    await this.setPassword(password);
    await this.continueBtn.click();
  }
}
module.exports = new EmployeesPage();
/* eslint-enable */
