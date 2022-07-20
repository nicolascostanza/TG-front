import React from 'react';
// import styles from './loading.module.css';
// import logo from '../Loader/assets/loader.gif';
import { Backdrop, CircularProgress } from '@mui/material';

function Loader({ isLoading }) {
  if (isLoading) {
    return (
      // <div className={styles.background}>
      //   <div className={styles.container}>
      //     <img className={styles.photo} src={logo} alt="loading..." />
      //   </div>
      // </div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return null;
  }
}

export default Loader;
