import styles from './tasks.module.css';
import List from './List';

function Tasks() {
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <List />
    </section>
  );
}

export default Tasks;
