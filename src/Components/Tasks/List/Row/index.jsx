import React from 'react';
import styles from '../Row/row.module.css';

function Row(props) {
  const {
    parentProject,
    _id: id,
    taskCreatorId,
    taskName,
    taskDescription,
    assignedEmployee,
    startDate,
    status
  } = props.task;
  console.log('props', props.task);
  return (
    <tr id={id} className={styles.row}>
      <td>{id}</td>
      <td>{parentProject ? parentProject.name : 'No parent project'}</td>
      <td>{taskCreatorId}</td>
      <td>{taskName}</td>
      <td>{taskDescription}</td>
      <td>
        {assignedEmployee && assignedEmployee.length
          ? assignedEmployee.map((employee) => employee.firstName)
          : 'no tiene id'}
      </td>
      <td>{startDate}</td>
      <td>{status}</td>
      <td>
        <i className="fa-solid fa-xmark" onClick={() => props.deleteTask(id)}></i>
      </td>
      <td>
        <a href={`http://localhost:3000/tasks-edit/${id}`}>
          {/*<a href={'http://localhost:3000/tasks-edit/62965439e74d6b80516dadd0'}>*/}
          <button>Edit</button>
        </a>
      </td>
    </tr>
  );
}

export default Row;
