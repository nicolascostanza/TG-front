class LandingPage {
  //-----------------------------------Getters--------------------------------------------
  //Header buttons
  get burgerBtn() {
    return $('#root > div > button > i');
  }
  get facebookBtn() {
    return $('#root > div > nav > ul > li:nth-child(1) > a > i');
  }
  get twitterBtn() {
    return $('#root > div > nav > ul > li:nth-child(2) > a > i');
  }
  get linkedInBtn() {
    return $('#root > div > nav > ul > li:nth-child(3) > a > i');
  }
  get instagramBtn() {
    return $('#root > div > nav > ul > li:nth-child(4) > a > i');
  }
  get gitHubBtn() {
    return $('#root > div > nav > ul > li:nth-child(5) > a > i');
  }
  //Sidebar
  get crossBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(1) > div > i');
  }
  get homeSideBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(1) > a:nth-child(2)');
  }
  get signUpBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(1) > a:nth-child(3)');
  }
  get logInBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(1) > a:nth-child(4)');
  }
  get contactBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(1) > a:nth-child(5)');
  }
  get workedHoursBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(2) > a:nth-child(2)');
  }
  get reportsBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(2) > a:nth-child(3)');
  }
  get managementBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(2) > a:nth-child(4)');
  }
  get rolesBtn() {
    return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(2) > a:nth-child(5)');
  }
  //Footer
  get fcBtn() {
    return $('#root > div > footer > div > div.footer_socials__lwx8a > a:nth-child(1) > i');
  }
  get twtBtn() {
    return $('#root > div > footer > div > div.footer_socials__lwx8a > a:nth-child(2) > i');
  }
  get lkInBtn() {
    return $('#root > div > footer > div > div.footer_socials__lwx8a > a:nth-child(3) > i');
  }
  get igBtn() {
    return $('#root > div > footer > div > div.footer_socials__lwx8a > a:nth-child(4) > i');
  }
  get ghBtn() {
    return $('#root > div > footer > div > div.footer_socials__lwx8a > a:nth-child(5) > i');
  }
  get copy() {
    return $('#root > div > footer > div > div.footer_copyright__iDmy9');
  }
  //Titles of sections
  get hiImTgSection() {
    return $(
      '#root > div > div > main > section.landing_firstSection__M9or0 > div:nth-child(1) > h1'
    );
  }
  get functionalitiesSection() {
    return $('#root > div > div > main > h2:nth-child(2)');
  }
  get reasonsWhySection() {
    return $('#root > div > div > main > h2:nth-child(5)');
  }
  get requestInfoSection() {
    return $('#landing_centeredText__gYBUv');
  }
  get productTitle() {
    return $(
      '#root > div > div > main > section.landing_listFooter__a2ffE > div:nth-child(1) > h4'
    );
  }
  get companyTitle() {
    return $(
      '#root > div > div > main > section.landing_listFooter__a2ffE > div:nth-child(2) > h4'
    );
  }
  get supportTitle() {
    return $(
      '#root > div > div > main > section.landing_listFooter__a2ffE > div:nth-child(3) > h4'
    );
  }
  //Section 1 content
  get subtitle() {
    return $('.landing_subtittle__Ow47x');
  }
  get mainParagraph() {
    return $('.landing_textMainSection__1RxW3');
  }
  get mainImg() {
    return $('.landing_wrapImage__QPGJR > img');
  }
  get learnMoreBtn() {
    return $(
      '#root > div > div > main > section.landing_firstSection__M9or0 > div:nth-child(1) > button'
    );
  }
  //Section 2 content
  get sectionTwoDivOne() {
    return $(
      '#root > div > div > main > section:nth-child(3) > div:nth-child(1) > div:nth-child(1)'
    );
  }
  get sectionTwoDivTwo() {
    return $(
      '#root > div > div > main > section:nth-child(3) > div:nth-child(1) > div:nth-child(2)'
    );
  }
  get sectionTwoDivThree() {
    return $(
      '#root > div > div > main > section:nth-child(3) > div:nth-child(2) > div:nth-child(1)'
    );
  }
  get sectionTwoDivFour() {
    return $(
      '#root > div > div > main > section:nth-child(3) > div:nth-child(2) > div:nth-child(2)'
    );
  }
  //Section 3 content
  get sectionThreeDivOne() {
    return $(
      '#root > div > div > main > section:nth-child(6) > div:nth-child(1) > div:nth-child(1)'
    );
  }
  get sectionThreeDivTwo() {
    return $(
      '#root > div > div > main > section:nth-child(6) > div:nth-child(1) > div:nth-child(2)'
    );
  }
  get sectionThreeDivThree() {
    return $(
      '#root > div > div > main > section:nth-child(6) > div:nth-child(2) > div:nth-child(1)'
    );
  }
  get sectionThreeDivFour() {
    return $(
      '#root > div > div > main > section:nth-child(6) > div:nth-child(2) > div:nth-child(2)'
    );
  }
  //Section 4 content
  get nameInput() {
    return $(
      '#root > div > div > main > div:nth-child(8) > form > div.landing_nameEmailForm__YFMIb > input[type=text]:nth-child(1)'
    );
  }
  get emailInput() {
    return $(
      '#root > div > div > main > div:nth-child(8) > form > div.landing_nameEmailForm__YFMIb > input[type=text]:nth-child(2)'
    );
  }
  get dropdownBtn() {
    return $('#root > div > div > main > div:nth-child(8) > form > div:nth-child(2) > select');
  }
  get hhrr() {
    return $('[value="HHRR"]');
  }
  get systems() {
    return $('[value="Systems"]');
  }
  get commerce() {
    return $('[value="Commerce"]');
  }
  get textArea() {
    return $(
      '#root > div > div > main > div:nth-child(8) > form > div.landing_messageForm__5elZc > textarea'
    );
  }
  get sendMsgBtn() {
    return $(
      '#root > div > div > main > div:nth-child(8) > form > div.landing_buttonsForm__AntQb > button'
    );
  }
  //Section 5 content
  //-----------------------------------Setters--------------------------------------------
  //Request information inputs
  async setName(name) {
    await this.nameInput.setValue(name);
  }
  async setEmail(email) {
    await this.emailInput.setValue(email);
  }
  async setText(text) {
    await this.textArea.setValue(text);
  }
  //-----------------------------------Methods--------------------------------------------
  //Open Trackgenix app
  openLanding() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app');
  }
  //Header
  async headerChecker() {
    await expect(this.facebookBtn).toBeClickable();
    await this.facebookBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.twitterBtn).toBeClickable();
    await this.twitterBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.linkedInBtn).toBeClickable();
    await this.linkedInBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.instagramBtn).toBeClickable();
    await this.instagramBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.gitHubBtn).toBeClickable();
    await this.gitHubBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
  }
  //Sidebar
  async sideChecker() {
    await expect(this.burgerBtn).toBeClickable();
    await this.burgerBtn.click();
    await expect(this.crossBtn).toBeClickable();
    await this.crossBtn.click();
    await this.burgerBtn.click();
    await expect(this.homeSideBtn).toBeClickable();
    await expect(this.signUpBtn).toBeClickable();
    await this.signUpBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await this.burgerBtn.click();
    await expect(this.logInBtn).toBeClickable();
    await this.logInBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await this.burgerBtn.click();
    await expect(this.contactBtn).toBeClickable();
    await expect(this.workedHoursBtn).toBeClickable();
    await expect(this.reportsBtn).toBeClickable();
    await expect(this.managementBtn).toBeClickable();
    await expect(this.rolesBtn).toBeClickable();
  }
  //Footer
  async footerChecker() {
    await expect(this.fcBtn).toBeClickable();
    await this.fcBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.twtBtn).toBeClickable();
    await this.twtBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.lkInBtn).toBeClickable();
    await this.lkInBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.igBtn).toBeClickable();
    await this.igBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.ghBtn).toBeClickable();
    await this.ghBtn.click();
    await browser.navigateTo('https://alfonso-trackgenix-app.vercel.app');
    await expect(this.copy).toExist();
    await expect(this.copy).toHaveText('Trackgenix © 2021 Radium Rocket');
  }
  //Request info
  async reqInfo(name, email, text) {
    await this.setName(name);
    await this.setEmail(email);
    await expect(this.dropdownBtn).toBeClickable();
    await this.dropdownBtn.click();
    await this.commerce.click();
    await this.dropdownBtn.click();
    await this.systems.click();
    await this.dropdownBtn.click();
    await this.hhrr.click();
    await this.setText(text);
    await expect(this.sendMsgBtn).toBeClickable();
    await this.sendMsgBtn.click();
  }
}

module.exports = new LandingPage();
