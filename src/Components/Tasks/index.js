import styles from './tasks.module.css';
import List from './List';
import AddTask from './Add Task';

function Tasks() {
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <List />
      <AddTask />
    </section>
  );
}

export default Tasks;
