class LandingPage {
  /* eslint-disable */
  get landingTitle() { return $('.landing_tittle__kyfvi') }
  get landingSubtitle() { return $('.landing_subtittle__Ow47x') }
  get landingTextMainSection() { return $('.landing_textMainSection__1RxW3') }
  get moreBtn() { return $('.landing_buttonMore__ygQ77') }

  get headerUl() { return $('.landing_iconsHeader__ylCAF') }
  get headerFbLink() { return $('#root > div > nav > ul > li:nth-child(1) > a') }
  get headerTwLink() { return $('#root > div > nav > ul > li:nth-child(2) > a') }
  get headerLinkedinLink() { return $('#root > div > nav > ul > li:nth-child(3) > a') }
  get headerInstagramLink() { return $('#root > div > nav > ul > li:nth-child(4) > a') }
  get headerGithubLink() { return $('#root > div > nav > ul > li:nth-child(5) > a') }


  get sectionsTitles() { return $('.landing_landingH2__kRzqR') }
  get sectionsTexts() { return $('.landing_secondSection__n0icF') }
  get sectionsSeparator() { return $('.landing_separator__Ivclu') }

  get inputName() { return $('.landing_nameEmailForm__YFMIb > input[type=text]:nth-child(1)') }
  get inputEmail() { return $('.landing_nameEmailForm__YFMIb > input[type=text]:nth-child(2)') }
  get selectCategory() { return $('.landing_selectLanding__lORMi') }
  get inputMessage() { return $('.landing_messageForm__5elZc') }
  get submitMsgBtn() { return $('.landing_buttonForm__yNT6M') }

  get footerListsDiv() { return $('.landing_listFooter__a2ffE') }
  get facebookLink() { return $('.footer_socials__lwx8a > a:nth-child(1)') }
  get twitterLink() { return $('.footer_socials__lwx8a > a:nth-child(2)') }
  get linkedinLink() { return $('.footer_socials__lwx8a > a:nth-child(3)') }
  get instagramLink() { return $('.footer_socials__lwx8a > a:nth-child(4)') }
  get githubLink() { return $('.footer_socials__lwx8a > a:nth-child(5)') }
  get footerCopyright() { return $('.footer_copyright__iDmy9') }

  get menuButton() { return $('.sidebar_sideButton__K4G6H') }
  get titleSidebar() { return $('.sidebar_sidebarTitle__xplvB') }
  get homeLinkSidebar() { return $('.sidebar_Sidebar__xJMyu > section:nth-child(1) > a:nth-child(2)') }
  get signupLinkSidebar() { return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(1) > a:nth-child(3)')}
  get loginLinkSidebar() { return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(1) > a:nth-child(4)')}
  get contactLinkSidebar() { return $('#root > div > div.sidebar_Sidebar__xJMyu > section:nth-child(1) > a:nth-child(5)')}
  get secondSectionSidebar() { return $('.sidebar_container__M1fiX') }

  open() {
    return browser.url('https://alfonso-trackgenix-app.vercel.app/');
  }
}
module.exports = new LandingPage();
/* eslint-enable */
