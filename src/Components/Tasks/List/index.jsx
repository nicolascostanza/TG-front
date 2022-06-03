import { useEffect, useState } from 'react';
import styles from '../List/list.module.css';
import Row from './Row';
import Btn from './Btn';

function List() {
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        setTask(response.data);
        console.log(response.data);
      })
      .catch((err) => console.err(err));
  }, []);
  const deleteTask = async (id) => {
    const resp = confirm('Are you sure you want to delete this task?');
    if (resp) {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      setTask(tasks.filter((task) => task._id !== id));
    }
  };
  return (
    <section className={styles.container}>
      <a href="/tasks-add" className={styles.Btn}>
        <Btn color="green" text="Add" />
      </a>
      <table className={styles.row}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Parent project</th>
            <th>Task manager</th>
            <th>Task name</th>
            <th>Description</th>
            <th>Assigned employee</th>
            <th>Start date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Row key={task._id} task={task} deleteTask={deleteTask} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default List;
