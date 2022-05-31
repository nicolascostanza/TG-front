import { useEffect, useState } from 'react';
import styles from '../List/list.module.css';
import Row from './Row';
import Btn from './Btn';

function List() {
  const [tasks, setTask] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then((response) => response.json())
      .then((response) => {
        setTask(response.data);
        console.log(response.data);
      });
  }, []);
  const deleteTask = async (id) => {
    const resp = confirm('Are you sure you want to delete this task?');
    if (resp) {
      await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'DELETE'
      });
      setTask(tasks.filter((task) => task._id !== id));
    }
  };
  return (
    <section className={styles.container}>
      <a href="http://localhost:3000/tasks-add">
        <Btn color="green" text="Add/Edit" />
      </a>
      <table className={styles.row}>
        <thead>
          <tr>
            <th>Parent project</th>
            <th>Id</th>
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
