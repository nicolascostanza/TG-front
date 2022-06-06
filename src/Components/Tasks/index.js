import styles from './tasks.module.css';
import Sidebar from '../Shared/Sidebar';
import List from './List';

function Tasks() {
  return (
    <section className={styles.container}>
      <section className={styles.sidebar}>
        <Sidebar>
          <a>prueba</a>
          <p>prueba</p>
          <p>prueba</p>
          <p>prueba</p>
          <p>prueba</p>
          <p>prueba</p>
        </Sidebar>
      </section>
      <section className={styles.body}>
        <h2>Tasks</h2>
        <List />
      </section>
    </section>
  );
}

export default Tasks;
