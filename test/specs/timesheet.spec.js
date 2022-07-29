const HeaderSidebarFooterPage = require('../pageobjects/headerSideFooter.page.js');
const LoginPage = require('../pageobjects/loginEmployee.page.js');
const TimesheetPage = require('../pageobjects/timesheet.page.js');

describe('check elements', () => {
  beforeAll('Open login page', async () => {
    await LoginPage.openLogin();
    await browser.pause(2000);
    await HeaderSidebarFooterPage.themeChecker();
    await LoginPage.fillInputs('friedrick@gmail.com', 'employee123');
    await browser.keys('Enter');
    await browser.pause(5000);
    await expect(HeaderSidebarFooterPage.burgerBtn).toBeClickable();
    await HeaderSidebarFooterPage.burgerBtn.click();
    await browser.pause(1000);
    await HeaderSidebarFooterPage.timesheetsBtn.click();
    await browser.pause(1000);
  });
  it('check theme in timesheet page', async () => {
    await HeaderSidebarFooterPage.themeChecker();
  });
  it('texts', async () => {
    await TimesheetPage.employeeTitle.isDisplayed();
    await expect(TimesheetPage.employeeTitle).toHaveText('PM');
    await TimesheetPage.tableEmployeePM.isDisplayed();
    await expect(TimesheetPage.tableEmployeePM).toHaveText('EMPLOYEE');
    await TimesheetPage.tableProjectPM.isDisplayed();
    await expect(TimesheetPage.tableProjectPM).toHaveText('PROJECT');
    await TimesheetPage.tableStartDatePM.isDisplayed();
    await expect(TimesheetPage.tableStartDatePM).toHaveText('START DATE');
    await TimesheetPage.tableTaskPM.isDisplayed();
    await expect(TimesheetPage.tableTaskPM).toHaveText('TASK');
    await TimesheetPage.tableHoursPM.isDisplayed();
    await expect(TimesheetPage.tableHoursPM).toHaveText('HOURS');
    await TimesheetPage.tableStatusPM.isDisplayed();
    await expect(TimesheetPage.tableStatusPM).toHaveText('STATUS');
    await TimesheetPage.tableEditPM.isDisplayed();
    await expect(TimesheetPage.tableEditPM).toHaveText('EDIT');
    await TimesheetPage.tableDeletePM.isDisplayed();
    await expect(TimesheetPage.tableDeletePM).toHaveText('DELETE');
    await TimesheetPage.tableApprovePM.isDisplayed();
    await expect(TimesheetPage.tableApprovePM).toHaveText('APPROVE');
    await TimesheetPage.pageIndex.isDisplayed();
    await expect(TimesheetPage.pageIndex).toHaveTextContaining('Page');
    await TimesheetPage.totalHours.isDisplayed();
    await expect(TimesheetPage.totalHours).toHaveTextContaining('Total hours:');
    await TimesheetPage.totalRate.isDisplayed();
    await expect(TimesheetPage.totalRate).toHaveTextContaining('Total rate:');
  });
  it('buttons', async () => {
    /*await TimesheetPage.showTsToApproveBtn.isDisplayed();
    await expect(TimesheetPage.showTsToApproveBtn).toBeClickable();
    await TimesheetPage.showTsToApproveBtn.click();
    await TimesheetPage.showAllTsBtn.isDisplayed();
    await expect(TimesheetPage.showAllTsBtn).toBeClickable();
    await TimesheetPage.showAllTsBtn.click();
    await TimesheetPage.showMyTsBtn.isDisplayed();
    await expect(TimesheetPage.showMyTsBtn).toBeClickable();
    await TimesheetPage.showMyTsBtn.click();*/
    await TimesheetPage.addBtn.isDisplayed();
    await expect(TimesheetPage.addBtn).toBeClickable();
    await TimesheetPage.filterMonthBtn.isDisplayed();
    await expect(TimesheetPage.filterMonthBtn).toHaveText('MONTH');
    await expect(TimesheetPage.filterMonthBtn).toBeClickable();
    await TimesheetPage.filterMonthBtn.click();
    await TimesheetPage.filterWeekBtn.isDisplayed();
    await expect(TimesheetPage.filterWeekBtn).toHaveText('WEEK');
    await expect(TimesheetPage.filterWeekBtn).toBeClickable();
    await TimesheetPage.filterWeekBtn.click();
    await TimesheetPage.filterDayBtn.isDisplayed();
    await expect(TimesheetPage.filterDayBtn).toHaveText('DAY');
    await expect(TimesheetPage.filterDayBtn).toBeClickable();
    await TimesheetPage.filterDayBtn.click();
    await TimesheetPage.filterYearBtn.isDisplayed();
    await expect(TimesheetPage.filterYearBtn).toHaveText('YEAR');
    await expect(TimesheetPage.filterYearBtn).toBeClickable();
    await TimesheetPage.filterYearBtn.click();
    await TimesheetPage.checkbox.isDisplayed();
    //await TimesheetPage.delSelectedTsBtn.isDisplayed();
    //await expect(TimesheetPage.delSelectedTsBtn).toBeClickable();
    await TimesheetPage.editBtn.isDisplayed();
    await expect(TimesheetPage.editBtn).toBeClickable();
    await TimesheetPage.deleteBtn.isDisplayed();
    await expect(TimesheetPage.deleteBtn).toBeClickable();
    await TimesheetPage.slider.isDisplayed();
    await expect(TimesheetPage.slider).toBeClickable();
    await TimesheetPage.slider.click();
    await browser.pause(2000);
    await TimesheetPage.slider.click();
    await browser.pause(2000);
    await TimesheetPage.leftBtn.isDisplayed();
    await expect(TimesheetPage.leftBtn).toBeClickable();
    await TimesheetPage.rightBtn.isDisplayed();
    await expect(TimesheetPage.rightBtn).toBeClickable();
  });
});

describe('check form elements', () => {
  it('without error msg', async () => {
    await TimesheetPage.addBtn.click();
    await browser.pause(2000);
    await TimesheetPage.bgModal.isDisplayed();
    await TimesheetPage.formContainer.isDisplayed();
    await TimesheetPage.projectLabel.isDisplayed();
    await expect(TimesheetPage.projectLabel).toHaveText('Project');
    await TimesheetPage.dateLabel.isDisplayed();
    await expect(TimesheetPage.dateLabel).toHaveText('Date');
    await TimesheetPage.hoursLabel.isDisplayed();
    await expect(TimesheetPage.hoursLabel).toHaveText('Hours');
    await TimesheetPage.taskLabel.isDisplayed();
    await expect(TimesheetPage.taskLabel).toHaveText('Task');
    await TimesheetPage.fillInputs(
      'Vagram',
      '27072022',
      '8',
      'Pre-emptive upward-trending paradigm'
    );
    await TimesheetPage.submitBtn.isDisplayed();
    await expect(TimesheetPage.submitBtn).toBeClickable();
    await TimesheetPage.closeFormBtn.isDisplayed();
    await expect(TimesheetPage.closeFormBtn).toBeClickable();
    await TimesheetPage.closeFormBtn.click();
    await browser.pause(1000);
    await TimesheetPage.editBtn.click();
    await browser.pause(1000);
    await TimesheetPage.crossBtnInputOne.click();
    await browser.pause(1000);
    await TimesheetPage.crossBtnInputTwo.click();
    await browser.pause(1000);
    await TimesheetPage.fillInputs(
      'Vagram',
      '27072022',
      '2',
      'Pre-emptive upward-trending paradigm'
    );
    await browser.pause(1000);
    await TimesheetPage.closeFormBtn.click();
  });
});

describe('CRUD timesheet', () => {
  //it('Employee')
  it('PM Employee', async () => {
    await TimesheetPage.addBtn.click();
    await browser.pause(2000);
    await TimesheetPage.fillInputs(
      'Vagram',
      '27072022',
      '9',
      'Pre-emptive upward-trending paradigm'
    );
    await TimesheetPage.submitBtn.click();
    await browser.pause(2000);
    await browser.pause(4000);
    await TimesheetPage.editBtn.click();
    await browser.pause(1000);
    await TimesheetPage.crossBtnInputOne.click();
    await browser.pause(1000);
    await TimesheetPage.crossBtnInputTwo.click();
    await browser.pause(1000);
    await TimesheetPage.fillInputs(
      'Vagram',
      '28072022',
      '6',
      'Pre-emptive upward-trending paradigm'
    );
    await TimesheetPage.submitBtn.click();
    await browser.pause(2000);
    await browser.pause(4000);
    await TimesheetPage.deleteBtn.click();
    await browser.pause(2000);
    await expect(TimesheetPage.modalOkBtn).toBeClickable();
    await TimesheetPage.modalOkBtn.click();
    await browser.pause(4000);
    await HeaderSidebarFooterPage.logoTG.click();
    await browser.pause(1000);
  });
});
