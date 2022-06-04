import React from 'react';
import styles from './navbar.module.css';

const Sidebar = ({ children, isOpen, handleClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.Sidebar}>
      <button onClick={handleClose}>BURGUER</button>
      <section>
        <h2>Menu</h2>
        <a>Sign-up</a>
        <a>Log-in</a>
        <a>Contact</a>
      </section>
      <section>{children}</section>
    </div>
  );
};

export default Sidebar;
