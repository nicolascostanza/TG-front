const LoginPage = require('../pageobjects/login.page');
const TasksPage = require('../pageobjects/tasks.page');

describe('Tasks page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/tasks');
  });

  describe('Elements in Tasks Page to be displayed', () => {
    it('Verify elements to be displayed', async () =>{
      await TasksPage.open();
      await expect(TasksPage.timesheetsTitle).toBeDisplayed();
      await expect(TasksPage.allBtns).toBeClickable();
      await expect(TasksPage.timesheetsTable).toBeDisplayed();
      await expect(TasksPage.tableBtns).toBeClickable();
    });
  });
});
