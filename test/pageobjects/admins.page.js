class AdminsPage {
  /* eslint-disable */
    //Getters
    get projectsTableContainer () {return $('.table_container__8U2Nr')};

    get btnAdd () {return $('#table_buttonAddHome__tUM2V')};
    get modalContainer () {return $('.modal_modalContainer__Sdomi')};
    get btnBurger () {return $('#sidebar_sideButton__K4G6H')};
    get btnLogout () {return $('#log-out')};

    get labelName () {return $('div.home_inputContainer__Xwk6F:nth-child(1) > label:nth-child(1)')};
    get inputName () {return $('#nameProject')};
    get errorMsgName () {return $('.home_errorInput__W993V')};
    get labelDescription () {return $('div.home_inputContainer__Xwk6F:nth-child(2) > label:nth-child(1)')};
    get inputDescription () {return $('#descriptionProject')};
    get errorMsgDescription () {return $('div.home_inputContainer__Xwk6F:nth-child(2) > p:nth-child(3)')};
    get labelClient () {return $('div.home_inputContainer__Xwk6F:nth-child(3) > label:nth-child(1)')};
    get inputClient () {return $('#clientProject')};
    get errorMsgClient () {return $('div.home_inputContainer__Xwk6F:nth-child(3) > p:nth-child(3)')};
    get labelStartDate () {return $('div.home_inputContainer__Xwk6F:nth-child(4) > label:nth-child(1)')};
    get inputStartDate () {return $('#startdateProject')};
    get errorMsgStartDate () {return $('div.home_inputContainer__Xwk6F:nth-child(4) > p:nth-child(3)')};
    get labelEndDate () {return $('div.home_inputContainer__Xwk6F:nth-child(5) > label:nth-child(1)')};
    get inputEndDate () {return $('#endDateProject')};
    get modalAddClose () {return $('i.fa-solid:nth-child(2)')};
    get modalAddAccept () {return $('#saveTimesheet')};

    get modalAddSuccessClose () {return $('i.fa-solid:nth-child(2)')};

    get projectRow () {return $('tr.table_row__am2tL:nth-child(6)')};
    get btnBackProjects () {return $('button.Button_Button__72Faw:nth-child(1)')};
    get btnAddPM () {return $('button.Button_Button__72Faw:nth-child(2)')};
    get dropPM () {return $('#employeeIdToPM')};
    get dropPMOption () {return $('#employeeIdToPM > option:nth-child(1)')};
    get btnAcceptPM () {return $('.assignPm_button__gCmKN > button:nth-child(1)')};

    get btnCloseModal () {return $('i.fa-xmark')};

    get btnAddEmployee () {return $('button.Button_Button__72Faw:nth-child(3)')};
    get labelEmployee () {return $('div.tableProject_select__U6vb5:nth-child(1) > label:nth-child(1)')};
    get dropEmployee () {return $('#employees')};
    get optionEmployee () {return $('#employees > option:nth-child(1)')};
    get labelRole () {return $('#role')};
    get dropRole () {return $('#roleEmployee')};
    get optionRoleNone () {return $('#roleEmployee > option:nth-child(1)')};
    get optionRoleDev () {return $('#roleEmployee > option:nth-child(2)')};
    get optionRoleQA () {return $('#roleEmployee > option:nth-child(3)')};
    get optionRoleTL () {return $('#roleEmployee > option:nth-child(4)')};
    get labelRate () {return $('.tableProject_rate__cif8f > label:nth-child(1)')};
    get inputRate () {return $('#rateEmployee')};
    get modalAddEmployeeClose () {return $('i.fa-xmark:nth-child(2)')};
    get modalAddEmployeeAccept () {return $('.tableProject_formHome__Pzqti > div > button > .fa-plus')};

    get btnEditEmployee () {return $('#0.57067638456635')};
    get btnDeleteEmployee () {return $('.tableProject_row__tghuo > td:nth-child(6) button > i')};
    get btnAcceptDeleteEmp () {return $('.modal_modalBody__IaBTo > button:nth-child(1)')};
    get modalSuccessDelete () {return $('.modal_modalHeader__r9G49')};

    get tabEmployees () {return $('#buttonTabEmployees')};
    get tabTasks () {return $('#buttonTabTask')};
    get btnAddTasks () {return $('button.Button_Button__72Faw:nth-child(2)')};

    get labelTaskName () {return $('.tableProject_formHome__Pzqti > div:nth-child(1) > label:nth-child(1)')};
    get inputTaskName () {return $('#taskname')};
    get errorMsgTaskName () {return $('.tableProject_formHome__Pzqti > div:nth-child(1) > p:nth-child(3)')};
    get labelTaskDescription () {return $('.tableProject_formHome__Pzqti > div:nth-child(2) > label:nth-child(1)')};
    get inputTaskDescription () {return $('#taskDescription')};
    get errorMsgTaskDescription () {return $('.tableProject_formHome__Pzqti > div:nth-child(2) > p:nth-child(3)')};
    get labelTaskEmployee () {return $('.tableProject_assignedEmp__TALU4 > label:nth-child(1)')};
    get dropTaskEmployee () {return $('#assignedEmployee')};
    get dropTaskEmployeeOption () {return $('#assignedEmployee > option:nth-child(1)')};
    get labelTaskStartDate () {return $('.tableProject_formHome__Pzqti > div:nth-child(4) > label:nth-child(1)')};
    get inputTaskStartDate () {return $('#startDateTask')};
    get errorMsgTaskStartDate () {return $('.tableProject_formHome__Pzqti > div:nth-child(4) > p:nth-child(3)')};
    get labelTaskStatus () {return $('.tableProject_formHome__Pzqti > div:nth-child(5) > label:nth-child(1)')};
    get dropTaskStatus () {return $('#status')};
    get dropTaskStatusReady () {return $('#status > option:nth-child(1)')};
    get modalAddTaskAccept () {return $('.tableProject_buttonsContainer__CjGmL > button:nth-child(1)')};


    //Setters
        //Projects
    async setName(name) {
        await this.inputName.setValue(name)
    };
    async setDescription(description) {
        await this.inputDescription.setValue(description)
    };
    async setClient(client) {
        await this.inputClient.setValue(client)
    };
    async setStartDate(startDate) {
        await this.inputStartDate.setValue(startDate)
    };
    async setEndDate(endDate) {
        await this.inputEndDate.setValue(endDate)
    };

        //Employees
    async setRate(rate) {
        await this.inputRate.setValue(rate)
    };

        //Tasks
    async setTaskName(taskName) {
        await this.inputTaskName.setValue(taskName)
    };
    async setTaskDescription(taskDescription) {
        await this.inputTaskDescription.setValue(taskDescription)
    };
    async setTaskStartDate(taskStartDate) {
        await this.inputTaskStartDate.setValue(taskStartDate)
    };

    //Methods
    async addProject(name, description, client, startDate, endDate) {
        await this.setName(name);
        await this.setDescription(description);
        await this.setClient(client);
        await this.setStartDate(startDate);
        await this.setEndDate(endDate);
    };

    async editEmployee(rate) {
        await this.setRate(rate);
    };

    async addTask(taskName, taskDescription, taskStartDate) {
        await this.setTaskName(taskName);
        await this.setTaskDescription(taskDescription);
        await this.setTaskStartDate(taskStartDate);
    };

    open() {
        return browser.url('https://alfonso-trackgenix-app.vercel.app/')
    }
};
module.exports = new AdminsPage();
  /* eslint-enable */