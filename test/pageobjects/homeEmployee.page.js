class HomeEmployeePage {
  //-----------------------------------Getters--------------------------------------------
  //Main table elements
  get homeTitle() {
    return $('.table_container__8U2Nr > h2');
  }
  get buttonTabTask() {
    return $('#buttonTabTask');
  }
  get tableName() {
    return $('.table_container__8U2Nr > table > thead > tr > th:nth-child(1)');
  }
  get tableDescription() {
    return $('.table_container__8U2Nr > table > thead > tr > th:nth-child(2)');
  }
  get tableClientName() {
    return $('.table_container__8U2Nr > table > thead > tr > th:nth-child(3)');
  }
  get tableStartDate() {
    return $('.table_container__8U2Nr > table > thead > tr > th:nth-child(4)');
  }
  get tableEndDate() {
    return $('.table_container__8U2Nr > table > thead > tr > th:nth-child(5)');
  }
  get tableTask() {
    return $('.table_container__8U2Nr > table > thead > tr > th:nth-child(6)');
  }
  get tableTeam() {
    return $('.table_container__8U2Nr > table > thead > tr > th:nth-child(7)');
  }
  get tableTeamBtn() {
    return $('#buttonListEmployeesTask');
  }
  get homeLeftBtn() {
    return $(
      '.table_navButtons__dqMN7 > div:nth-child(1) > .Button_Button__72Faw > .fa-angle-left'
    );
  }
  get homeRightBtn() {
    return $(
      '.table_navButtons__dqMN7 > div:nth-child(3) > .Button_Button__72Faw > .fa-angle-right'
    );
  }
  get homeIndex() {
    return $('.table_navButtons__dqMN7 > div:nth-child(2) > p');
  }
  get modalCloseBtn() {
    return $('.modal_modalHeader__r9G49 > .fa-xmark');
  }
  get enterInProject() {
    return $('.table_tbody__XIf2Y > tr:nth-child(4) > td:nth-child(2)');
  }
  get backToProject() {
    return $('.tableProject_topButtons__O9KI5 > button:nth-child(1)');
  }

  //Project employee list
  get tableEmployeeName() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(1)');
  }
  get tableLastName() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(2)');
  }
  get tableRole() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(3)');
  }
  get tableRate() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(4)');
  }
  get tableEdit() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(5)');
  }
  get tableDelete() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(6)');
  }
  get tableEditBtn() {
    return $(
      '.tableProject_tbody__S-Qo8 > tr:nth-child(2) > td:nth-child(5) > button > .fa-pencil'
    );
  }
  get tableDeleteBtn() {
    return $('.tableProject_tbody__S-Qo8 > tr:nth-child(2) > td:nth-child(6) > button > .fa-xmark');
  }
  get addEmployeeBtn() {
    return $('.Button_Button__72Faw > .fa-user');
  }
  //Modal elements
  get labelEmployee() {
    return $('.tableProject_select__U6vb5 > label[for*=employee]');
  }
  get labelRole() {
    return $('.tableProject_select__U6vb5 > label[for=role]');
  }
  get labelRate() {
    return $('.tableProject_rate__cif8f > label[for=Rate]');
  }
  get inputEmployee() {
    return $('#employees > option:nth-child(2)');
  }
  get inputRole() {
    return $('#roleEmployee > option:nth-child(3)');
  }
  get inputRate() {
    return $('#rateEmployee');
  }
  get submitBtn() {
    return $('.tableProject_formHome__Pzqti > div:nth-child(4) > button > .fa-plus');
  }
  get modalCrossBtn() {
    return $('.modal_modalHeader__r9G49 > .fa-xmark');
  }
  get editEmpSubmitButton() {
    return $('.tableProject_formHome__Pzqti > div:nth-child(4) > button > .fa-pencil');
  }
  get deleteEmpCheckButton() {
    return $('.modal_modalContainer__Sdomi > div > button > .fa-check');
  }

  //Project tasks list
  get addTaskBtn() {
    return $('.tableProject_topButtons__O9KI5 > button:nth-child(2) > .fa-list');
  }
  get tableTaskName() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(1)');
  }
  get tableDescriptionTask() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(2)');
  }
  get tableAssigned() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(3)');
  }
  get tableStatus() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(4)');
  }
  get tableCreated() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(5)');
  }
  get tableStartDateTask() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(6)');
  }
  get tableUpdated() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(7)');
  }
  get tableEditTask() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(8)');
  }
  get tableDeleteTask() {
    return $('#tableProject_thead__17Mof > tr > th:nth-child(9)');
  }
  get tableBtnEmpAssigned() {
    return $(
      '.tableProject_tbody__S-Qo8 > tr:nth-child(2) > div > #buttonListEmployeesTask > .fa-user'
    );
  }
  get tableEditBtnTask() {
    return $(
      '.tableProject_tbody__S-Qo8 > tr:nth-child(2) > td:nth-child(8) > button > .fa-pencil'
    );
  }
  get tableDeleteBtnTask() {
    return $('.tableProject_tbody__S-Qo8 > tr:nth-child(2) > td:nth-child(9) > button > .fa-xmark');
  }
  get taskInputTaskName() {
    return $('#taskname');
  }
  get taskInputTaskDescription() {
    return $('#taskDescription');
  }
  get taskInputAssignedEmp() {
    return $('#assignedEmployee > option:nth-child(3)');
  }
  get taskInputStartDate() {
    return $('#startDateTask');
  }
  get taskInputStatus() {
    return $('#status > option:nth-child(4)');
  }

  //-----------------------------------Setters--------------------------------------------
  async setRate(rate) {
    await this.inputRate.setValue(rate);
  }
  async setTaskName(taskName) {
    await this.taskInputTaskName.setValue(taskName);
  }
  async setTaskDescription(taskDescription) {
    await this.taskInputTaskDescription.setValue(taskDescription);
  }
  async setStartDate(startDate) {
    await this.taskInputStartDate.setValue(startDate);
  }
  //-----------------------------------Methods--------------------------------------------
  async fillInputs(rate) {
    await this.inputEmployee.click();
    await browser.keys('Tab');
    await this.inputRole.click();
    await browser.keys('Tab');
    await this.setRate(rate);
  }
  async fillInputsTaskTab(taskName, taskDescription, startDate) {
    await this.setTaskName(taskName);
    await browser.keys('Tab');
    await this.setTaskDescription(taskDescription);
    await browser.keys('Tab');
    await this.taskInputAssignedEmp.click();
    await browser.keys('Tab');
    await this.setStartDate(startDate);
    await browser.keys('Tab');
    await this.taskInputStatus.click();
    await browser.keys('Tab');
    await browser.keys('Enter');
    await browser.pause(2000);
    await this.modalCloseBtn.click();
    await browser.pause(2000);
  }
}

module.exports = new HomeEmployeePage();
