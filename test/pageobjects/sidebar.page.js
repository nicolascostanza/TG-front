class SidebarPage {
  /* eslint-disable */
    //Getters
    get btnBurger () {return $('#sidebar_sideButton__K4G6H')};
    get sidebar () {return $('.sidebar_Sidebar__xJMyu')};
    get pMenu () {return $('#menu-title')};
    get btnClose () {return $('#close-button')};
    get btnAbout () {return $('#whats-trackgenix')};
    get btnFunct () {return $('.sidebar_anchors__to44p > a:nth-child(2)')};
    get btnReasons () {return $('a.sidebar_sidebarLink__57OHt:nth-child(3)')};
    get btnContact () {return $('a.sidebar_sidebarLink__57OHt:nth-child(4)')};

    get btnSignup () {return $('#sidebarSignUp')};
    get btnLogin () {return $('#sidebarLogin')};
};
module.exports = new SidebarPage();
  /* eslint-enable */