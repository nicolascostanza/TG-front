import React from 'react';
import styles from './loading.module.css';
import logo from '../Loader/assets/loader.gif';

function Loader({ isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <img className={styles.photo} src={logo} alt="loading..." />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Loader;
