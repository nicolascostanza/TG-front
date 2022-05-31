import React from 'react';
import styles from '../Row/row.module.css';

function Row(props) {
  const {
    parentProject,
    _id: id,
    taskCreatorId,
    taskName,
    taskDescription,
    //assignedEmployee: [assignedEmployee],
    startDate,
    status
  } = props.task;
  return (
    <tr id={id} className={styles.row}>
      <td>{parentProject ? parentProject.id : 'not'}</td>
      <td>{id}</td>
      <td>{taskCreatorId}</td>
      <td>{taskName}</td>
      <td>{taskDescription}</td>
      <td>{/*assignedEmployee._id ? assignedEmployee._id : 'no tiene id'*/}</td>
      <td>{startDate}</td>
      <td>{status}</td>
      <td>
        <i className="fa-solid fa-xmark" onClick={() => props.deleteTask(id)}></i>
      </td>
      <td>
        <a href={`http://localhost:3000/tasks-edit?id=${id}`}>
          {/*<a href={'http://localhost:3000/tasks-edit/62965439e74d6b80516dadd0'}>*/}
          <button>Edit</button>
        </a>
      </td>
    </tr>
  );
}

export default Row;
