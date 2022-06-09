import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admins from '../Admins/index';
import EditEmployee from '../Employees/EditEmployee/editEmployee';
import AddEmployee from '../Employees/EmployeeForm/addEmployee';
import Employees from '../Employees/index';
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Projects from '../Projects';
import SuperAdmins from '../SuperAdmins/index';
import AddTask from '../Tasks/AddTask/index';
import EditTask from '../Tasks/EditTask';
import Tasks from '../Tasks/index';
import TimeSheets from '../TimeSheets';
import AddTimeSheets from '../TimeSheets/Add';
import EditTimeSheets from '../TimeSheets/Edit';
import styles from './layout.module.css';

function Layout() {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admins" component={Admins} />
          <Route exact path="/super-admins" component={SuperAdmins} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees/employee-add" component={AddEmployee} />
          <Route exact path="/employees/employee-edit" component={EditEmployee} />
          <Route exact path="/projects">
            <Projects form={false} />
          </Route>
          <Route exact path="/projects/create">
            <Projects form={true} />
          </Route>
          <Route exact path="/time-sheets" component={TimeSheets} />
          <Route exact path="/time-sheets-add" component={AddTimeSheets} />
          <Route exact path="/time-sheets-edit" component={EditTimeSheets} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/tasks-add" component={AddTask} />
          <Route exact path="/tasks-edit" component={EditTask} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default Layout;
