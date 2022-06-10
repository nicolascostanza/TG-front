import styles from './time-sheets.module.css';
import List from './List';

function TimeSheets() {
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
}

export default TimeSheets;
