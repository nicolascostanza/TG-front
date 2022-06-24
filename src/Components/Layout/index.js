import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Admins from '../Admins/index';
const Employees = lazy(() => import('Components/Employees'));
const EmployeesHome = lazy(() => import('Components/EmployeesFlow/Home/Home'));
const EmployeesProfile = lazy(() => import('Components/EmployeesFlow/Profile/Profile'));
const EmployeesSignUp = lazy(() => import('Components/EmployeesFlow/SignUp/SignUp'));
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Projects from '../Projects';
const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
import Tasks from '../Tasks/index';
import TimeSheets from '../TimeSheets';
import AddTimeSheets from '../TimeSheets/Add';
import EditTimeSheets from '../TimeSheets/Edit';
import Loader from 'Components/Shared/Loader';
import styles from './layout.module.css';
import Loader from 'Components/Shared/Loader';

function Layout() {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admins" component={Admins} />
            <Route exact path="/super-admins" component={SuperAdmins} />
            <Route exact path="/employees" component={Employees} />
            <Route exact path="/employees/home/:id" component={EmployeesHome} />
            <Route exact path="/employees/profile/:id" component={EmployeesProfile} />
            <Route exact path="/signup" component={EmployeesSignUp} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/time-sheets" component={TimeSheets} />
            <Route exact path="/time-sheets-add" component={AddTimeSheets} />
            <Route exact path="/time-sheets-edit" component={EditTimeSheets} />
            <Route exact path="/tasks" component={Tasks} />
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default Layout;
