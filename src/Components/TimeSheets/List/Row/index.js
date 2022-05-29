import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Row(props) {
  const {
    _id: id,
    employeeId,
    description,
    project,
    date,
    task,
    hours,
    approved,
    role
  } = props.timeSheet;
  const { deleteTimeSheet } = props;
  return (
    <tr id={id}>
      <td>{id}</td>
      <td>{employeeId.firstName}</td>
      <td>{description}</td>
      <td>{project}</td>
      <td>{date}</td>
      <td>{task.taskName}</td>
      <td>{hours}</td>
      <td>{approved ? 'true' : 'false'}</td>
      <td>{role}</td>
      <FaTimes onClick={() => deleteTimeSheet(id)} style={{ color: 'red', cursor: 'pointer' }} />
    </tr>
  );
}

export default Row;
