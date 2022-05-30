// import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List/List';

function Employees() {
  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <List />
    </section>
  );
}

export default Employees;
