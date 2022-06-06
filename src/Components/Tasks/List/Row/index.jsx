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
      <td>{new Date(startDate).toLocaleDateString()}</td>
      <td>{status}</td>
      <td>
        <i className="fa-solid fa-xmark" onClick={() => props.deleteTask(id)}></i>
      </td>
      <td>
        <a href={`/tasks-edit?id=${id}`}>
          <i className="fa-solid fa-pen-to-square"></i>
        </a>
      </td>
    </tr>
  );
}

export default Row;
