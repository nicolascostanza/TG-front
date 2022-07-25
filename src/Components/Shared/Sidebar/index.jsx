import React from 'react';
import styles from '../Sidebar/sidebar.module.css';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from 'redux/auth/actions';
import * as currentUserActions from 'redux/currentUser/actions';
import ThemeToggle from '../ThemeToggle';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const logOut = () => {
    dispatch(authActions.setAuthentication(false));
    dispatch(currentUserActions.setCurrentUserToInitialState());
    sessionStorage.clear();
  };
  const role = useSelector((state) => state.auth.authenticated?.role);
  const handleClose = () => {
    setIsOpen(false);
  };
  if (!isOpen) {
    return (
      <button className={styles.sideButton} onClick={() => setIsOpen(true)}>
        <i className="fa-solid fa-bars"></i>
      </button>
    );
  } else if (!role)
    return (
      <div className={styles.Sidebar}>
        <section className={styles.container}>
          <div className={styles.sidebarTitle}>
            <p>Menu</p>
            <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
          </div>
          <div className={styles.anchors}>
            <a href="#trackgenix" className={styles.sidebarLink}>
              What is Trackgenix?
            </a>
            <a href="#functionalities" className={styles.sidebarLink}>
              Functionalities
            </a>
            <a href="#reasons" className={styles.sidebarLink}>
              Working with us
            </a>
            <a href="#contact" className={styles.sidebarLink}>
              Contact us
            </a>
          </div>
          <div className={styles.sidebarTitle}>
            <p>Trackgenix</p>
          </div>
          <div className={styles.links}>
            <Link className={styles.sidebarLink} to="/signup" id="sidebarSignUp">
              Sign-up
            </Link>
            <Link className={styles.sidebarLink} to="/login" id="sidebarLogin">
              Log-in
            </Link>
          </div>
        </section>
        <div className={styles.togglerContainer}>
          <ThemeToggle />
        </div>
      </div>
    );
  else if (role === 'EMPLOYEE') {
    return (
      <div className={styles.Sidebar}>
        <section className={styles.container}>
          <div className={styles.sidebarTitle}>
            <p>Menu</p>
            <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
          </div>
          <div className={styles.links}>
            <Link className={styles.sidebarLink} to="/employees/profile">
              Profile
            </Link>
            <Link className={styles.sidebarLink} onClick={logOut} to="/">
              Log Out
            </Link>
          </div>
        </section>
        <section className={styles.container}>
          <Link className={styles.sidebarLink} to="/time-sheets">
            Timesheets
          </Link>
          <Link className={styles.sidebarLink} to="/tasks">
            Tasks
          </Link>
        </section>
        <div className={styles.togglerContainer}>
          <ThemeToggle />
        </div>
      </div>
    );
  } else if (role === 'ADMIN') {
    return (
      <div className={styles.Sidebar}>
        <section className={styles.container}>
          <div className={styles.sidebarTitle}>
            <p>Menu</p>
            <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
          </div>
          <div className={styles.links}>
            <Link className={styles.sidebarLink} to="/admins/profile">
              Profile
            </Link>
            <Link className={styles.sidebarLink} onClick={logOut} to="/">
              Log Out
            </Link>
          </div>
        </section>
        <section className={styles.container}>
          <Link className={styles.sidebarLink} to="/projects">
            Projects
          </Link>
        </section>
        <div className={styles.togglerContainer}>
          <ThemeToggle />
        </div>
      </div>
    );
  }
};

export default withRouter(Sidebar);
