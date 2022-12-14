import React from 'react';
import styles from '../Sidebar/sidebar.module.css';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from 'redux/auth/actions';
import * as currentUserActions from 'redux/currentUser/actions';

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
          <p id="menu-title">Menu</p>
          <i id="close-button" className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.anchors}>
          <a
            id="whats-trackgenix"
            href="#trackgenix"
            className={styles.sidebarLink}
            onClick={() => handleClose()}
          >
            What is Trackgenix?
          </a>
          <a
            id="functionalities"
            href="#functionalities"
            className={styles.sidebarLink}
            onClick={() => handleClose()}
          >
            Functionalities
          </a>
          <a
            id="reasons"
            href="#reasons"
            className={styles.sidebarLink}
            onClick={() => handleClose()}
          >
            Working with us
          </a>
          <a
            id="contact"
            href="#contact"
            className={styles.sidebarLink}
            onClick={() => handleClose()}
          >
            Contact us
          </a>
        </div>
        <div className={styles.sidebarTitle}>
          <p id="trackgenix-title">Trackgenix</p>
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
          <p id="menu-title">Menu</p>
          <i id="close-button" className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <Link
          id="home"
          className={styles.sidebarTitle}
          style={{ textDecoration: 'inherit' }}
          to="/"
        >
          Home
        </Link>
        <div className={styles.sidebarTitle}>
          <p id="trackgenix-title">Trackgenix</p>
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
          <p id="trackgenix-title">Trackgenix</p>
          <i id="close-button" className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.links}>
          <Link
            id="emp-profile"
            onClick={() => handleClose()}
            className={styles.sidebarLink}
            to="/employees/profile"
          >
            Profile
          </Link>
          <Link
            id="emp-projects"
            onClick={() => handleClose()}
            className={styles.sidebarLink}
            to="/"
          >
            Projects
          </Link>
          <Link
            id="emp-timesheets"
            onClick={() => handleClose()}
            className={styles.sidebarLink}
            to="/time-sheets"
          >
            Timesheets
          </Link>
          <Link id="log-out" className={styles.sidebarLink} onClick={logOut} to="/">
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (role === 'ADMIN') {
    return (
      <div className={styles.Sidebar}>
        <div className={styles.sidebarTitle}>
          <p id="menu-title">Menu</p>
          <i id="close-button" className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.links}>
          <Link
            id="adm-profile"
            className={styles.sidebarLink}
            to="/"
            onClick={() => handleClose()}
          >
            {role === 'SUPERADMIN' ? 'Admins' : 'Projects'}
          </Link>
          <Link id="log-out" className={styles.sidebarLink} onClick={logOut} to="/">
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (role === 'SUPERADMIN') {
    return (
      <div className={styles.Sidebar}>
        <div className={styles.sidebarTitle}>
          <p id="menu-title">Menu</p>
          <i id="close-button" className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.links}>
          <Link id="adm-profile" className={styles.sidebarLink} onClick={logOut} to="/">
            Log Out
          </Link>
        </div>
      </div>
    );
  }
};

export default withRouter(Sidebar);
