import { useEffect, useState } from 'react';
import styles from './tasks.module.css';

function Tasks() {
  // eslint-disable-next-line no-unused-vars
  const [task, setTasks] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks');
      const data = await response.json();
      console.log(data);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
    </section>
  );
}

export default Tasks;
