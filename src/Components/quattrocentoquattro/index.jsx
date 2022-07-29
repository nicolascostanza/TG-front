import React from 'react';
import Alfon from './alfon.png';
import styles from './alfon.module.css';
import Sidebar from 'Components/Shared/Sidebar';

const PageNotFound = () => {
  return (
    <div className={styles.cuatroMainContainer}>
      <section>
        <Sidebar />
      </section>
      <div>
        <img className={styles.alfonImg} src={Alfon} alt="Alfon" />
      </div>
      <div className={styles.textContainer}>
        <h3>404</h3>
        <h5>Not found</h5>
        <p>The page you are looking for doesn&apos;t exist.</p>
        <p className={styles.giveAwayText}>RULE Nº1: Don&apos;t give yourself away!</p>
      </div>
    </div>
  );
};

export default PageNotFound;
