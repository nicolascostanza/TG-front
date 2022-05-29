import { useEffect, useState } from 'react';
import style from '../List/list.module.css';

function List() {
  const [Tasks, setTask] = useState([]);
  console.log('Tasks: ', Tasks);
  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then((response) => response.json())
      .then((response) => {
        setTask(response.data);
      });
  }, []);
  return (
    <div className={style.container}>
      <table>
        <tbody>
          {Tasks.map((task) => {
            return (
              <ul key={task._id}>
                <span>Assigned Employee</span>
                <li>{task.assignedEmployee[{}]}</li>
                <span>Created At</span>
                <li>{task.createdAt}</li>
                <span>Parent Project</span>
                <li>
                  {task.parentProject._id}, {task.parentProject.name}
                </li>
                <span>Status</span>
                <li>{task.status}</li>
                <span>Creator ID</span>
                <li>{task.taskCreatorId}</li>
                <span>Description</span>
                <li>{task.taskDescription}</li>
                <span>Name</span>
                <li>{task.taskName}</li>
                <span>Updated At</span>
                <li>{task.updatedAt}</li>
              </ul>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;
