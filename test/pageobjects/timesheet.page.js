class TimesheetPage {
  //-----------------------------------Getters--------------------------------------------
  //Text
  get employeeTitle() {
    return $('#root > div > section > div > h2');
  }
  get tableEmployee() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(1)');
  }
  get tableProject() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(2)');
  }
  get tableStartDate() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(3)');
  }
  get tableTask() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(4)');
  }
  get tableHours() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(5)');
  }
  get tableStatus() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(6)');
  }
  get tableEdit() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(7)');
  }
  get tableDelete() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(8)');
  }
  get pageIndex() {
    return $('.employeeTimesheetTable_navButtons__O4efx > div:nth-child(2) > p');
  }
  get totalHours() {
    return $('.employeeTimesheetTable_workedHours__C8xRU > h3:nth-child(1)');
  }
  get totalRate() {
    return $('.employeeTimesheetTable_workedHours__C8xRU > h3:nth-child(2)');
  }
  //Buttons
  get addBtn() {
    return $('#add-button');
  }
  get filterYearBtn() {
    return $(
      '.employeeTimesheetTable_buttonControllercontainerFilter__8loQV > button:nth-child(1)'
    );
  }
  get filterMonthBtn() {
    return $(
      '.employeeTimesheetTable_buttonControllercontainerFilter__8loQV > button:nth-child(2)'
    );
  }
  get filterWeekBtn() {
    return $(
      '.employeeTimesheetTable_buttonControllercontainerFilter__8loQV > button:nth-child(3)'
    );
  }
  get filterDayBtn() {
    return $(
      '.employeeTimesheetTable_buttonControllercontainerFilter__8loQV > button:nth-child(4)'
    );
  }
  get editBtn() {
    return $('.Button_Button__72Faw > .fa-pencil');
  }
  get deleteBtn() {
    return $('.Button_Button__72Faw > .fa-xmark');
  }
  get leftBtn() {
    return $('.Button_Button__72Faw > .fa-angle-left');
  }
  get rightBtn() {
    return $('.Button_Button__72Faw > .fa-angle-right');
  }
  //PM exclusive elements
  get showMyTsBtn() {
    return $('#showMyTimesheetsButton');
  }
  get showTsToApproveBtn() {
    return $('#showTimesheetsToApproveButton');
  }
  get showAllTsBtn() {
    return $('#showAllTimesheetsButton');
  }
  get delSelectedTsBtn() {
    return $('#deleteSelectedTimesheetsButton');
  }
  get slider() {
    return $('.slider_slider__8TbzY');
  }
  get checkbox() {
    return $('.employeeTimesheetTable_row__Fw67f > td > input');
  }
  get tableEmployeePM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(2)');
  }
  get tableProjectPM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(3)');
  }
  get tableStartDatePM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(4)');
  }
  get tableTaskPM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(5)');
  }
  get tableHoursPM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(6)');
  }
  get tableStatusPM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(7)');
  }
  get tableEditPM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(8)');
  }
  get tableDeletePM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(9)');
  }
  get tableApprovePM() {
    return $('.employeeTimesheetTable_tableAll__ilnPH > table > thead > tr > th:nth-child(10)');
  }
  //Form elements
  get bgModal() {
    return $('.modal_modalBackground__6FizA');
  }
  get formContainer() {
    return $('.modal_modalContainer__Sdomi');
  }
  get projectLabel() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > label[for=projectId]'
    );
  }
  get dateLabel() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > label[for=date]'
    );
  }
  get hoursLabel() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > label[for=hours]'
    );
  }
  get taskLabel() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > label[for=taskId]'
    );
  }
  get projectInput() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > input[name=projectId]'
    );
  }
  get dateInput() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > input[name=date]'
    );
  }
  get hoursInput() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > input[name=hours]'
    );
  }
  get taskInput() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(5) > input[name=taskId]'
    );
  }
  get projectInputEmp() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div > div:nth-child(1) > [name=projectId]'
    );
  }
  get dateInputEmp() {
    return $('.form_form__QU0ap > div > div:nth-child(2) > div > div:nth-child(2) > [name=date]');
  }
  get hoursInputEmp() {
    return $('.form_form__QU0ap > div > div:nth-child(2) > div > div:nth-child(3) > [name=hours]');
  }
  get taskInputEmp() {
    return $('.form_form__QU0ap > div > div:nth-child(2) > div > div:nth-child(4) > [name=taskId]');
  }
  get submitBtn() {
    return $('#saveTimesheet > .fa-check');
  }
  get closeFormBtn() {
    return $('.modal_modalHeader__r9G49 > .fa-xmark');
  }
  get crossBtnInputOne() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div > div:nth-child(2) > label > .fa-circle-xmark'
    );
  }
  get crossBtnInputTwo() {
    return $(
      '.form_form__QU0ap > div > div:nth-child(2) > div > div:nth-child(5) > label > .fa-circle-xmark'
    );
  }
  get selectorOne() {
    return $('.Form_notSelectedItem__uXXeY:last-child');
  }
  get selectorTwo() {
    return $('.Form_notSelectedItem__uXXeY:nth-child(4)');
  }
  get modalOkBtn() {
    return $('.modal_modalBody__IaBTo > div > button.Button_Button__72Faw');
  }
  get modalCloseBtn() {
    return $('.modal_modalHeader__r9G49 > i.fa-xmark');
  }
  //-----------------------------------Setters--------------------------------------------
  async setProject(project) {
    await this.projectInput.setValue(project);
  }
  async setDate(date) {
    await this.dateInput.setValue(date);
  }
  async setHours(hours) {
    await this.hoursInput.setValue(hours);
  }
  async setTask(task) {
    await this.taskInput.setValue(task);
  }
  async setProjectEmp(project) {
    await this.projectInputEmp.setValue(project);
  }
  async setDateEmp(date) {
    await this.dateInputEmp.setValue(date);
  }
  async setHoursEmp(hours) {
    await this.hoursInputEmp.setValue(hours);
  }
  async setTaskEmp(task) {
    await this.taskInputEmp.setValue(task);
  }
  //-----------------------------------Methods--------------------------------------------
  async fillInputs(project, date, hours, task) {
    await this.setProject(project);
    await this.selectorOne.click();
    await browser.pause(1000);
    await browser.keys('Tab');
    await this.setDate(date);
    await browser.pause(1000);
    await browser.keys('Tab');
    await this.setHours(hours);
    await browser.pause(1000);
    await browser.keys('Tab');
    await this.setTask(task);
    await this.selectorTwo.click();
    await browser.pause(1000);
  }
  async fillInputsNormalEmp(project, date, hours, task) {
    await this.setProjectEmp(project);
    await this.selectorOne.click();
    await browser.pause(1000);
    await browser.keys('Tab');
    await this.setDateEmp(date);
    await browser.pause(1000);
    await browser.keys('Tab');
    await this.setHoursEmp(hours);
    await browser.pause(1000);
    await browser.keys('Tab');
    await this.setTaskEmp(task);
    await this.selectorTwo.click();
    await browser.pause(1000);
  }
}
module.exports = new TimesheetPage();
