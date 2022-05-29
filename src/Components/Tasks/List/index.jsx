import { useEffect, useState } from 'react';
import styles from '../List/list.module.css';

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

  return (
    <section className={styles.container}>
      <table>
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
        <div>
          {tasks.map((task) => {
            return (
              <a key={task._id}>
                {task._id}
                {task.taskCreatorId}
                {task.taskName}
                {task.taskDescription}
                {task.createdAt}
                {task.status}
              </a>
            );
          })}
        </div>
      </table>
    </section>
  );
}

export default List;
