import styles from './time-sheets.module.css';
import List from './List';

function TimeSheets() {
  const url = 'http://localhost:8080/time-sheets';
  console.log(url);
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
}

export default TimeSheets;
