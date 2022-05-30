import React from 'react';

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
  return (
    <tr id={id}>
      <td>{parentProject.name}</td>
      <td>{id}</td>
      <td>{taskCreatorId}</td>
      <td>{taskName}</td>
      <td>{taskDescription}</td>
      <td>{assignedEmployee.name}</td>
      <td>{startDate}</td>
      <td>{status}</td>
      <button onClick={() => props.deleteTask(id)} />
    </tr>
  );
}

export default Row;
