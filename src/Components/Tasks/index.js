import styles from './tasks.module.css';
import Sidebar from '../Shared/Sidebar';
import List from './List';
import { useState } from 'react';

function Tasks() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <section className={styles.container}>
      <section className={styles.sidebar}>
        <button onClick={() => setIsOpen(true)}>X</button>
        <Sidebar isOpen={isOpen} handleClose={handleClose}>
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
