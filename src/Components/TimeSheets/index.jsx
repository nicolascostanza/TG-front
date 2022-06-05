import styles from './time-sheets.module.css';
import List from './List';

function TimeSheets() {
  return (
    <section className={styles.container}>
      <h2>TimeSheet</h2>
      <List />
    </section>
  );
}

export default TimeSheets;
