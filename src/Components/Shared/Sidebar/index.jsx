import React from 'react';
import styles from '../Sidebar/sidebar.module.css';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from 'redux/auth/actions';
import * as currentUserActions from 'redux/currentUser/actions';

const Sidebar = ({ children }) => {
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
          <Link className={styles.sidebarLink} to="/">
            Home
          </Link>
          <Link className={styles.sidebarLink} to="/signup">
            Sign-up
          </Link>
          <Link className={styles.sidebarLink} to="/login">
            Log-in
          </Link>
        </section>
        <section className={styles.container}>{children}</section>
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
          <Link className={styles.sidebarLink} to="/">
            Home
          </Link>
          <Link className={styles.sidebarLink} to="/employees/profile">
            Profile
          </Link>
          <Link className={styles.sidebarLink} onClick={logOut} to="/">
            Log Out
          </Link>
        </section>
        <section className={styles.container}>{children}</section>
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
          <Link className={styles.sidebarLink} to="/">
            Home
          </Link>
          <Link className={styles.sidebarLink} to="/signup">
            Sign-up
          </Link>
          <Link className={styles.sidebarLink} to="/login">
            Log-in
          </Link>
          <Link className={styles.sidebarLink} to="/admins/profile">
            Profile
          </Link>
          <Link className={styles.sidebarLink} onClick={logOut} to="/">
            Log Out
          </Link>
        </section>
        <section className={styles.container}>{children}</section>
      </div>
    );
  }
};

//It must be implemented inside the components indexes
// You must provide children
//isOpen is a boolean to indicate if is open or not
//handleClose should change isOpen to false

export default withRouter(Sidebar);
