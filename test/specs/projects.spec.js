const LoginPage = require('../pageobjects/login.page');
const ProjectsPage = require('../pageobjects/projects.page');

describe('Projects page testing', () => {
  beforeAll('Open browser', () => {
    browser.url('https://alfonso-trackgenix-app.vercel.app/projects');
  });

  describe('Elements in Projects Page to be displayed', () => {
    it('Verify inputs to be displayed', async () =>{
      await ProjectsPage.open();
      await expect(ProjectsPage.projectsTitle).toBeDisplayed();
      await expect(ProjectsPage.allBtns).toBeClickable();
      await expect(ProjectsPage.projectsTable).toBeDisplayed();
      await expect(ProjectsPage.tableBtns).toBeClickable();
      await expect(ProjectsPage.dropdownSelect).toBeDisplayed();
    });
  });
});
