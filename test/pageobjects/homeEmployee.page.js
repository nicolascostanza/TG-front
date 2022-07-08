class HomeEmployeePage {
  //-----------------------------------Getters--------------------------------------------
  //Buttons
  get logoutBtn() {
    return $('#root > div > header > nav > ul > li:nth-child(8) > a');
  }
  get editProfileBtn() {
    return $('#root > div > div.home_divEditProfile__kWNjg > button');
  }
  get addBtn() {
    return $('#root > div > div.home_table__NVPBu > section > div > button');
  }
  get putBtn() {
    return $(
      '#root > div > div.home_table__NVPBu > section > div > table > tbody > tr:nth-child(6) > td:nth-child(10) > button'
    );
  }
  get deleteBtn() {
    return $(
      '#root > div > div.home_table__NVPBu > section > div > table > tbody > tr:nth-child(6) > td:nth-child(11) > button'
    );
  }
  get leftArrowBtn() {
    return $(
      '#root > div > div.home_table__NVPBu > section > div > div > div:nth-child(2) > button'
    );
  }
  get rightArrowBtn() {
    return $(
      '#root > div > div.home_table__NVPBu > section > div > div > div:nth-child(3) > button'
    );
  }
  get crossBtn() {
    return $(
      '#root > div > div.home_table__NVPBu > section > section:nth-child(3) > div > div > div.modal_modalHeader__r9G49 > i'
    );
  }
  get submitBtn() {
    return $(
      '#root > div > div.home_table__NVPBu > section > section:nth-child(2) > div > div > div.modal_modalBody__IaBTo > form > div > button'
    );
  }
  //Timesheet inputs
  get employeeInput() {
    return $('[name="employeeId"]');
  }
  get descriptionInput() {
    return $('[name="description"]');
  }
  get projectInput() {
    return $('[name="project"]');
  }
  get dateInput() {
    return $('[name="date"]');
  }
  get hoursInput() {
    return $('[name="hours"]');
  }
  get tasksInput() {
    return $(
      '#root > div > div.home_table__NVPBu > section > section:nth-child(2) > div > div > div.modal_modalBody__IaBTo > form > div > div.form_inputs__IGiGt > div > div:nth-child(6) > input[type=text]'
    );
  }
  get approvedInput() {
    return $('[name="approved"]');
  }
  get roleInput() {
    return $('[name="role"]');
  }
  //Table
  get table() {
    return $('#root > div > div.home_table__NVPBu > section > div > table');
  }
  //-----------------------------------Setters--------------------------------------------
  async setEmployeeId(employeeId) {
    await this.employeeInput.setValue(employeeId);
  }
  async setDescription(description) {
    await this.descriptionInput.setValue(description);
  }
  async setProject(project) {
    await this.projectInput.setValue(project);
  }
  async setDate(date) {
    await this.dateInput.setValue(date);
  }
  async setHours(hours) {
    await this.hoursInput.setValue(hours);
  }
  async setRole(role) {
    await this.roleInput.setValue(role);
  }
  //-----------------------------------Methods--------------------------------------------
  async fillInputs(employeeId, description, project, date, hours, role) {
    await this.setEmployeeId(employeeId);
    await this.setDescription(description);
    await this.setProject(project);
    await this.setDate(date);
    await this.setHours(hours);
    await this.setRole(role);
  }
}

module.exports = new HomeEmployeePage();
