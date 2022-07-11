class SidebarPage {
  /* eslint-disable */
    //Getters
    get btnBurger () {return $('.sidebar_sideButton__K4G6H')};
    get sidebar () {return $('.sidebar_Sidebar__xJMyu')};
    get pMenu () {return $('.sidebar_sidebarTitle__xplvB > p')};
    get btnClose () {return $('.sidebar_sidebarTitle__xplvB > i')};
    get btnSignup () {return $('section.sidebar_container__M1fiX:nth-child(1) > a:nth-child(3)')};
    get btnLogin () {return $('section.sidebar_container__M1fiX:nth-child(1) > a:nth-child(4)')};
    get h2Touch () {return $('section.sidebar_container__M1fiX > h2')};
    get btnHours () {return $('section.sidebar_container__M1fiX:nth-child(2) > a:nth-child(2)')};
    get btnReports () {return $('section.sidebar_container__M1fiX:nth-child(2) > a:nth-child(3)')};
    get btnManagement () {return $('section.sidebar_container__M1fiX:nth-child(2) > a:nth-child(4)')};
    get btnRoles () {return $('section.sidebar_container__M1fiX:nth-child(2) > a:nth-child(5)')};
  };
  module.exports = new SidebarPage();
  /* eslint-enable */