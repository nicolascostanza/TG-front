import Admins from '../Admins/index';
import EditEmployee from '../Employees/EditEmployee/editEmployee';
import AddEmployee from '../Employees/EmployeeForm/addEmployee';
import Employees from '../Employees/index';
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Projects from '../Projects';
import SuperAdmins from '../SuperAdmins/index';
import Tasks from '../Tasks/index';
import TimeSheets from '../TimeSheets';
import styles from './layout.module.css';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/super-admins':
      currentScreen = <SuperAdmins />;
      break;
    case '/employees':
      currentScreen = <Employees />;
      break;
    case '/employee-add':
      currentScreen = <AddEmployee />;
      break;
    case '/employee-edit':
      currentScreen = <EditEmployee />;
      break;
    case '/projects':
      currentScreen = <Projects />;
      break;
    case '/time-sheets':
      currentScreen = <TimeSheets />;
      break;
    case '/tasks':
      currentScreen = <Tasks />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <Footer />
    </div>
  );
}

export default Layout;
