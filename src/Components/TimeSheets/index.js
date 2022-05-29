import styles from './time-sheets.module.css';
import List from './List';

function TimeSheets() {
  const url = `${process.env.REACT_APP_API_URL}/time-sheets`;
  console.log(url);
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
}

export default TimeSheets;
