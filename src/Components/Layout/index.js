import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import PrivateRoute from 'Components/Layout/PrivateRoute';
import Admins from '../Admins/index';
import Employees from '../Employees/index';
const EmployeesHome = lazy(() => import('Components/EmployeesFlow/Home/Home'));
const EmployeesProfile = lazy(() => import('Components/EmployeesFlow/Profile/Profile'));
const SignUp = lazy(() => import('Components/EmployeesFlow/SignUp/SignUp'));
const Login = lazy(() => import('Components/Login'));
// const AuthRoutes = lazy(() => import('Components/auth'));
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Projects from '../Projects';
import SuperAdmins from '../SuperAdmins/index';
import Tasks from '../Tasks/index';
import TimeSheets from '../TimeSheets';
import AddTimeSheets from '../TimeSheets/Add';
import EditTimeSheets from '../TimeSheets/Edit';
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
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Redirect to="/login" />
            <PrivateRoute exact path="/admins" role="ADMIN" component={Admins} />
            <PrivateRoute exact path="/super-admins" role="SUPERADMIN" component={SuperAdmins} />
            <PrivateRoute
              exact
              path="/employees"
              role={'EMPLOYEE' || 'ADMIN'}
              component={Employees}
            />
            <PrivateRoute
              exact
              path="/employees/home/:id"
              role="EMPLOYEE"
              component={EmployeesHome}
            />
            <PrivateRoute
              exact
              path="/employees/profile/:id"
              role="EMPLOYEE"
              component={EmployeesProfile}
            />
            <PrivateRoute
              exact
              path="/projects"
              role={'EMPLOYEE' || 'ADMIN' || 'PM'}
              component={Projects}
            />
            <PrivateRoute exact path="/time-sheets" role="EMPLOYEE" component={TimeSheets} />
            <PrivateRoute exact path="/time-sheets-add" role="EMPLOYEE" component={AddTimeSheets} />
            <PrivateRoute
              exact
              path="/time-sheets-edit"
              role="EMPLOYEE"
              component={EditTimeSheets}
            />
            <PrivateRoute exact path="/tasks" role="EMPLOYEE" component={Tasks} />
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default Layout;
