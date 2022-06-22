import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Admins from '../Admins/index';
import Employees from '../Employees/index';
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Projects from '../Projects';
import SuperAdmins from '../SuperAdmins/index';
import Tasks from '../Tasks/index';
const TimeSheets = lazy(() => import('Components/TimeSheets'));
import Loader from 'Components/Shared/Loader';
import styles from './layout.module.css';

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
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/time-sheets" component={TimeSheets} />
            <Route exact path="/tasks" component={Tasks} />
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default Layout;
