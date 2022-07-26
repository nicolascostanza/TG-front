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
  const pathName = window.location.pathname;
  const onHome = pathName === '/';
  const role = useSelector((state) => state.auth.authenticated?.role);
  const handleClose = () => {
    setIsOpen(false);
  };
  if (!isOpen) {
    return (
      <i id={styles.sideButton} className="fa-solid fa-bars" onClick={() => setIsOpen(true)}></i>
    );
  } else if (!role & onHome)
    return (
      <div className={styles.Sidebar}>
        <div className={styles.sidebarTitle}>
          <p>Menu</p>
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.anchors}>
          <a href="#trackgenix" className={styles.sidebarLink} onClick={() => handleClose()}>
            What is Trackgenix?
          </a>
          <a href="#functionalities" className={styles.sidebarLink} onClick={() => handleClose()}>
            Functionalities
          </a>
          <a href="#reasons" className={styles.sidebarLink} onClick={() => handleClose()}>
            Working with us
          </a>
          <a href="#contact" className={styles.sidebarLink} onClick={() => handleClose()}>
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
      </div>
    );
  else if (!role && !onHome) {
    return (
      <div className={styles.Sidebar}>
        <div className={styles.sidebarTitle}>
          <p>Menu</p>
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.links}>
          <Link className={styles.sidebarLink} to="/signup" id="sidebarSignUp">
            Sign-up
          </Link>
          <Link className={styles.sidebarLink} to="/login" id="sidebarLogin">
            Log-in
          </Link>
        </div>
      </div>
    );
  } else if (role === 'EMPLOYEE') {
    return (
      <div className={styles.Sidebar}>
        <div className={styles.sidebarTitle}>
          <p>Menu</p>
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.links}>
          <Link className={styles.sidebarLink} to="/employees/profile">
            Profile
          </Link>
          <Link className={styles.sidebarLink} to="/">
            Projects
          </Link>
          <Link className={styles.sidebarLink} to="/time-sheets">
            Timesheets
          </Link>
          <Link className={styles.sidebarLink} to="/tasks">
            Tasks
          </Link>
          <Link className={styles.sidebarLink} onClick={logOut} to="/">
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (role === 'ADMIN') {
    return (
      <div className={styles.Sidebar}>
        <div className={styles.sidebarTitle}>
          <p>Menu</p>
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.links}>
          <Link className={styles.sidebarLink} to="/admins/profile">
            Profile
          </Link>
          <Link className={styles.sidebarLink} to="/">
            Projects
          </Link>
          <Link className={styles.sidebarLink} onClick={logOut} to="/">
            Log Out
          </Link>
        </div>
      </div>
    );
  }
};

export default withRouter(Sidebar);
