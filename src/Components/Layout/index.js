import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import PrivateRoute from 'Components/Layout/PrivateRoute';
// import Admins from '../Admins/index';
const AdminsProfile = lazy(() => import('Components/AdminFlow/Profile/Profile'));
const Employees = lazy(() => import('Components/Employees'));
const EmployeesHome = lazy(() => import('Components/EmployeesFlow/Home/Home'));
const EmployeesProfile = lazy(() => import('Components/EmployeesFlow/Profile/Profile'));
const SignUp = lazy(() => import('Components/EmployeesFlow/SignUp/SignUp'));
const Login = lazy(() => import('Components/Login'));
const Admins = lazy(() => import('Components/Admins'));
const Projects = lazy(() => import('Components/Projects'));
const Tasks = lazy(() => import('Components/Tasks'));
const TimeSheets = lazy(() => import('Components/TimeSheets'));
const EmployeeReport = lazy(() => import('Components/GenerateReport/EmployeeReport'));
const ProjectReport = lazy(() => import('Components/GenerateReport/ProjectReport'));
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Loader from 'Components/Shared/Loader';
import styles from './layout.module.css';
import { useSelector } from 'react-redux';

function Layout() {
  const theme = useSelector((state) => state.accessibility.theme);

  return (
    <div className={styles.container} data-theme={theme}>
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reportEmployee" component={EmployeeReport} />
            <Route exact path="/reportProjects" component={ProjectReport} />
            <PrivateRoute exact path="/" role="EMPLOYEE" component={EmployeesHome} />
            <PrivateRoute exact path="/admins" role="ADMIN" component={Admins} />
            <PrivateRoute exact path="/admins/profile" role={'ADMIN'} component={AdminsProfile} />
            <PrivateRoute exact path="/super-admins" role={['SUPERADMIN']} component={Admins} />
            <PrivateRoute
              exact
              path="/employees"
              role={['EMPLOYEE', 'ADMIN', 'PM']}
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
              path="/employees/profile"
              role={['EMPLOYEE', 'ADMIN', 'PM']}
              component={EmployeesProfile}
            />
            <PrivateRoute
              exact
              path="/projects"
              role={['EMPLOYEE', 'ADMIN', 'PM']}
              component={Projects}
            />
            <PrivateRoute
              exact
              path="/time-sheets"
              role={['EMPLOYEE', 'ADMIN', 'PM']}
              component={TimeSheets}
            />
            <PrivateRoute
              exact
              path="/tasks"
              role={['EMPLOYEE', 'ADMIN', 'PM']}
              component={Tasks}
            />
            <Redirect to="/login" />
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default Layout;
