import React from 'react';
import styles from './loading.module.css';
import logo from '../Loader/assets/loader.gif';

function Loader({ isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <img src={logo} alt="loading..." />
      </div>
    );
  } else {
    return null;
  }
}

export default Loader;
