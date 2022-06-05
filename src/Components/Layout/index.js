import AdminAdd from '../Admins/AdminAdd/adminAdd';
import AdminEdit from '../Admins/AdminEdit/adminEdit';
import Admins from '../Admins/index';
import Employees from '../Employees/index';
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Projects from '../Projects';
import SuperAdmins from '../SuperAdmins/index';
import Tasks from '../Tasks/index';
<<<<<<< HEAD
import AddTask from '../Tasks/AddTask/index';
import EditTask from '../Tasks/EditTask';
=======
import TimeSheets from '../TimeSheets';
import AddTimeSheets from '../TimeSheets/Add';
import EditTimeSheets from '../TimeSheets/Edit';
import styles from './layout.module.css';
>>>>>>> origin/master

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
    case '/projects':
      currentScreen = <Projects form={false} />;
      break;
    case '/projects/create':
      currentScreen = <Projects form={true} />;
      break;
    case '/time-sheets':
      currentScreen = <TimeSheets />;
      break;
    case '/time-sheets-add':
      currentScreen = <AddTimeSheets />;
      break;
    case '/time-sheets-edit':
      currentScreen = <EditTimeSheets />;
      break;
    case '/tasks':
      currentScreen = <Tasks />;
      break;
<<<<<<< HEAD
    case '/tasks-add':
      currentScreen = <AddTask />;
      break;
    case '/tasks-edit':
      currentScreen = <EditTask />;
=======
    case '/admins-add':
      currentScreen = <AdminAdd />;
      break;
    case '/admins-edit':
      currentScreen = <AdminEdit />;
>>>>>>> origin/master
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
