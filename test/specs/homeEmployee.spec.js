const LoginPage = require('../pageobjects/loginEmployee.page.js');
const HeaderSidebarFooterPage = require('../pageobjects/headerSideFooter.page.js');
const HomeEmployeePage = require('../pageobjects/homeEmployee.page.js');

describe('Home page employee test', () => {
  beforeAll('Open browser in the login page', async () => {
    await LoginPage.openLogin();
    await browser.pause(2000);
    await HeaderSidebarFooterPage.themeChecker();
    await LoginPage.fillInputs('friedrick@gmail.com', 'employee123');
    await browser.keys('Enter');
    await browser.pause(5000);
  });
  it('Test elements', async () => {
    await HeaderSidebarFooterPage.themeChecker();
    await HomeEmployeePage.homeTitle.isDisplayed();
    await expect(HomeEmployeePage.homeTitle).toHaveText('PROJECTS');
    await HomeEmployeePage.tableName.isDisplayed();
    await expect(HomeEmployeePage.tableName).toHaveText('NAME');
    await HomeEmployeePage.tableDescription.isDisplayed();
    await expect(HomeEmployeePage.tableDescription).toHaveText('DESCRIPTION');
    await HomeEmployeePage.tableClientName.isDisplayed();
    await expect(HomeEmployeePage.tableClientName).toHaveText('CLIENT NAME');
    await HomeEmployeePage.tableStartDate.isDisplayed();
    await expect(HomeEmployeePage.tableStartDate).toHaveText('START DATE');
    await HomeEmployeePage.tableEndDate.isDisplayed();
    await expect(HomeEmployeePage.tableEndDate).toHaveText('END DATE');
    await HomeEmployeePage.tableTask.isDisplayed();
    await expect(HomeEmployeePage.tableTask).toHaveText('TASKS');
    await HomeEmployeePage.tableTeam.isDisplayed();
    await expect(HomeEmployeePage.tableTeam).toHaveText('TEAM');
  });
  it('View team members and enter in a project', async () => {
    await HomeEmployeePage.tableTeamBtn.isDisplayed();
    await expect(HomeEmployeePage.tableTeamBtn).toBeClickable();
    await HomeEmployeePage.tableTeamBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.modalCloseBtn.isDisplayed();
    await expect(HomeEmployeePage.modalCloseBtn).toBeClickable();
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(1000);
    await expect(HomeEmployeePage.enterInProject).toBeClickable();
    await HomeEmployeePage.enterInProject.click();
    await browser.pause(1000);
  });
});

describe('List of employees assigned to the project (PM)', () => {
  it('Elements and buttons', async () => {
    await HomeEmployeePage.tableEmployeeName.isDisplayed();
    await expect(HomeEmployeePage.tableEmployeeName).toHaveText('NAME');
    await HomeEmployeePage.tableLastName.isDisplayed();
    await expect(HomeEmployeePage.tableLastName).toHaveText('LAST NAME');
    await HomeEmployeePage.tableRole.isDisplayed();
    await expect(HomeEmployeePage.tableRole).toHaveText('ROLE');
    await HomeEmployeePage.tableRate.isDisplayed();
    await expect(HomeEmployeePage.tableRate).toHaveText('RATE');
    await HomeEmployeePage.tableEdit.isDisplayed();
    await expect(HomeEmployeePage.tableEdit).toHaveText('EDIT');
    await HomeEmployeePage.tableDelete.isDisplayed();
    await expect(HomeEmployeePage.tableDelete).toHaveText('DELETE');
    await HomeEmployeePage.addEmployeeBtn.isDisplayed();
    await expect(HomeEmployeePage.addEmployeeBtn).toBeClickable();
    await HomeEmployeePage.addEmployeeBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.fillInputs('12');
    await browser.pause(2000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.tableEditBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.inputRole.click();
    await browser.keys('Tab');
    await HomeEmployeePage.inputRate.setValue('15');
    await browser.pause(1000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.tableDeleteBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.modalCrossBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.buttonTabTask.isDisplayed();
    await expect(HomeEmployeePage.buttonTabTask).toBeClickable();
    await HomeEmployeePage.buttonTabTask.click();
    await browser.pause(2000);
  });
});
describe('list of task assigned to the project (PM)', () => {
  it('Elements', async () => {
    await HomeEmployeePage.tableTaskName.isDisplayed();
    await expect(HomeEmployeePage.tableTaskName).toHaveText('TASK NAME');
    await HomeEmployeePage.tableDescriptionTask.isDisplayed();
    await expect(HomeEmployeePage.tableDescriptionTask).toHaveText('DESCRIPTION');
    await HomeEmployeePage.tableAssigned.isDisplayed();
    await expect(HomeEmployeePage.tableAssigned).toHaveText('ASSIGNED');
    await HomeEmployeePage.tableStatus.isDisplayed();
    await expect(HomeEmployeePage.tableStatus).toHaveText('STATUS');
    await HomeEmployeePage.tableCreated.isDisplayed();
    await expect(HomeEmployeePage.tableCreated).toHaveText('CREATED');
    await HomeEmployeePage.tableStartDateTask.isDisplayed();
    await expect(HomeEmployeePage.tableStartDateTask).toHaveText('START DATE');
    await HomeEmployeePage.tableUpdated.isDisplayed();
    await expect(HomeEmployeePage.tableUpdated).toHaveText('UPDATED');
    await HomeEmployeePage.tableEditTask.isDisplayed();
    await expect(HomeEmployeePage.tableEditTask).toHaveText('EDIT');
    await HomeEmployeePage.tableDeleteTask.isDisplayed();
    await expect(HomeEmployeePage.tableDeleteTask).toHaveText('DELETE');
    await HomeEmployeePage.addTaskBtn.isDisplayed();
    await expect(HomeEmployeePage.addTaskBtn).toBeClickable();
    await HomeEmployeePage.addTaskBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.tableBtnEmpAssigned.click();
    await browser.pause(1000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.tableEditBtnTask.click();
    await browser.pause(1000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.tableDeleteBtnTask.click();
    await browser.pause(1000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(1000);
  });
  it('Back again at home to perform the CRUD', async () => {
    await HomeEmployeePage.backToProject.click();
    await browser.pause(2000);
    await HomeEmployeePage.enterInProject.click();
    await browser.pause(2000);
  });
});

describe('Project table employee PM', () => {
  it('Employee tab CRUD', async () => {
    await HomeEmployeePage.addEmployeeBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.fillInputs('12');
    await browser.pause(2000);
    await HomeEmployeePage.submitBtn.click();
    await browser.pause(4000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.tableEditBtn.click();
    await browser.pause(1000);
    await HomeEmployeePage.inputRole.click();
    await browser.keys('Tab');
    await HomeEmployeePage.inputRate.setValue('15');
    await browser.pause(1000);
    await HomeEmployeePage.editEmpSubmitButton.click();
    await browser.pause(2000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.tableDeleteBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.deleteEmpCheckButton.click();
    await browser.pause(2000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(2000);
  });
});

describe('Project table employee PM', () => {
  it('Task tab CRUD', async () => {
    await HomeEmployeePage.buttonTabTask.click();
    await browser.pause(2000);
    await HomeEmployeePage.addTaskBtn.click();
    await browser.pause(2000);
    await HomeEmployeePage.fillInputsTaskTab(
      'Task Name for test two',
      'Task description for test two',
      '28072022'
    );
    await HomeEmployeePage.tableEditBtnTask.click();
    await browser.pause(1000);
    await HomeEmployeePage.fillInputsTaskTab(
      'Task Name for test three',
      'Task description for test three',
      '29072022'
    );
    await HomeEmployeePage.tableDeleteBtnTask.click();
    await browser.pause(1000);
    await HomeEmployeePage.deleteEmpCheckButton.click();
    await browser.pause(2000);
    await HomeEmployeePage.modalCloseBtn.click();
    await browser.pause(2000);
    await HeaderSidebarFooterPage.logoTG.click();
    await browser.pause(2000);
  });
});

/*describe('List of employees assigned to the project');
describe('list of task assigned to the project');*/
