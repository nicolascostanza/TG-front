class LandingPage {
  /* eslint-disable */
    //Getters
    get btnBurger () {return $('#sidebar_sideButton__K4G6H')};

    get h1Title () {return $('.landing_tittle__kyfvi')};
    get pSubtitle () {return $('.landing_subtittle__Ow47x')};
    get pDescr () {return $('.landing_textMainSection__1RxW3')};
    get firstImg () {return $('.landing_imgTablet__zQ4nu')};

    get h2Title () {return $('h2.landing_landingH2__kRzqR')};
    get h3Subtitle () {return $('.landing_groupTitle__8hb5r')};
    get p2Descr () {return $('.landing_text__Bmj8S')};
    get imgDescr () {return $('#landing_descriptionImage__bWqiP')};
    get sectionFunct () {return $('section.landing_secondSection__n0icF:nth-child(3)')};
    get sectionReasons () {return $('section.landing_secondSection__n0icF:nth-child(5)')};

    get h2Form () {return $('#contact')};
    get nameForm () {return $('.landing_nameEmailForm__YFMIb > input:nth-child(1)')};
    get emailForm () {return $('.landing_nameEmailForm__YFMIb > input:nth-child(2)')};
    get dropdownForm () {return $('.landing_selectLanding__lORMi')};
    get dropHRForm () {return $('.landing_selectLanding__lORMi > option:nth-child(1)')};
    get dropSystemsForm () {return $('.landing_selectLanding__lORMi > option:nth-child(2)')};
    get dropCommerceForm () {return $('.landing_selectLanding__lORMi > option:nth-child(3)')};
    get textareaForm () {return $('.landing_messageForm__5elZc > textarea:nth-child(1)')};
    get btnForm () {return $('.landing_buttonForm__yNT6M')};

    get h4Title () {return $('div.landing_valuesContainer__XoECA:nth-child(1) > h4:nth-child(1)')};
    get elementsList () {return $('div.landing_valuesContainer__XoECA:nth-child(1) > ol:nth-child(2)')};
    get sectionLists () {return $('.landing_listFooter__a2ffE')};

    get footer () {return $('.footer_license__uvxSL')};
    get iconFacebook () {return $('.footer_socials__lwx8a > a:nth-child(1)')};
    get iconTwitter () {return $('.footer_socials__lwx8a > a:nth-child(2)')};
    get iconLinkedin () {return $('.footer_socials__lwx8a > a:nth-child(3)')};
    get iconInstagram () {return $('.footer_socials__lwx8a > a:nth-child(4)')};
    get iconGitHub () {return $('.footer_socials__lwx8a > a:nth-child(5)')};
    get footerCopyright () {return $('.footer_copyright__iDmy9')};

    //Setters
    async setName(name) {
        await this.nameForm.setValue(name)
    };
    async setEmail(email) {
        await this.emailForm.setValue(email)
    };
    async setDropSystems(systems) {
        await this.inputSystems.setValue(systems)
    };
    async setText(textarea) {
        await this.textareaForm.setValue(textarea)
    };

    //Methods
    async fillForm(name, email, textarea) {
        await this.setName(name);
        await this.setEmail(email);
        await this.dropdownForm.click();
        await this.dropHRForm.click();
        await this.dropdownForm.click();
        await this.dropSystemsForm.click();
        await this.dropdownForm.click();
        await this.dropCommerceForm.click();
        await this.setText(textarea);
        await this.btnForm.click()
    };

    open() {
        return browser.url('https://alfonso-trackgenix-app.vercel.app/')
    }
};
module.exports = new LandingPage();
  /* eslint-enable */