import { useEffect, useState } from 'react';
import styles from './time-sheets.module.css';

function TimeSheets() {
  // eslint-disable-next-line no-unused-vars
  const [timeSheet, saveTimeSheets] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:8080/time-sheets`);
      const data = await response.json();
      console.log(data);
      saveTimeSheets(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <section className={styles.container}>
      <h2>TimeSheets</h2>
    </section>
  );
}

export default TimeSheets;
