import React from 'react';

function Row({ id, employeeId, description, project, date, hours, task, approved, role }) {
  return (
    <tr id={id}>
      <td> {id} </td>
      <td> {employeeId} </td>
      <td> {description} </td>
      <td> {project} </td>
      <td> {date} </td>
      <td> {hours} </td>
      <td> {task} </td>
      <td> {approved} </td>
      <td> {role} </td>
    </tr>
  );
}

export default Row;
