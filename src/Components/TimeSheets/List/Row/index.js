import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Row({
  id,
  employeeId,
  description,
  project,
  date,
  task,
  hours,
  approved,
  role,
  onDelete
}) {
  return (
    <tr id={id}>
      <td>{id}</td>
      <td>{employeeId}</td>
      <td>{description}</td>
      <td>{project}</td>
      <td>{date}</td>
      <td>{task}</td>
      <td>{hours}</td>
      <td>{approved}</td>
      <td>{role}</td>
      <FaTimes onClick={() => onDelete(id)} style={{ color: 'red', cursor: 'pointer' }} />
    </tr>
  );
}
export default Row;
