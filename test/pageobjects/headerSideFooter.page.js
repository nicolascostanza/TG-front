class HeaderSidebarFooterPage {
  //-----------------------------------Getters--------------------------------------------
  //Sidebar employee
  get sideTitle() {
    return $('.sidebar_sidebarTitle__xplvB > #trackgenix-title');
  }
  get closeSideBtn() {
    return $('.sidebar_sidebarTitle__xplvB > .fa-xmark');
  }
  get profileBtn() {
    return $('#emp-profile');
  }
  get projectBtn() {
    return $('#emp-projects');
  }
  get timesheetsBtn() {
    return $('#emp-timesheets');
  }
  get taskBtn() {
    return $('#emp-tasks');
  }
  get logoutBtn() {
    return $('#log-out');
  }
  //Header
  get burgerBtn() {
    return $('#sidebar_sideButton__K4G6H');
  }
  get logoTG() {
    return $('a > .header_logo__soZjv');
  }
  get sunBtn() {
    return $('.header_icon__aLYRh > div > .fa-sun');
  }
  get moonBtn() {
    return $('.header_icon__aLYRh > div > .fa-moon');
  }
  //Footer
  get fbBtn() {
    return $('.footer_socials__lwx8a > [href*=facebook] > .fa-facebook');
  }
  get twtBtn() {
    return $('.footer_socials__lwx8a > [href*=twitter] > .fa-twitter');
  }
  get linkBtn() {
    return $('.footer_socials__lwx8a > [href*=linkedin] > .fa-linkedin');
  }
  get igBtn() {
    return $('.footer_socials__lwx8a > [href*=instagram] > .fa-instagram');
  }
  get gitBtn() {
    return $('.footer_socials__lwx8a > [href*=github] > .fa-github');
  }
  get copyr() {
    return $('.footer_copyright__iDmy9');
  }
  //-----------------------------------Setters--------------------------------------------
  //-----------------------------------Methods--------------------------------------------
  async themeChecker() {
    await this.sunBtn.isDisplayed();
    await expect(this.sunBtn).toBeClickable();
    await this.sunBtn.click();
    await browser.pause(3000);
    await this.moonBtn.isDisplayed();
    await expect(this.moonBtn).toBeClickable();
    await this.moonBtn.click();
    await browser.pause(3000);
  }
}

module.exports = new HeaderSidebarFooterPage();
