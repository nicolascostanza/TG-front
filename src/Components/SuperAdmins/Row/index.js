import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Row({ id, firstName, lastName, createdAt, updatedAt, active, email, password, onDelete }) {
  return (
    <tr id={id}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{createdAt}</td>
      <td>{updatedAt}</td>
      <td>{active ? 'Active' : 'Inactive'}</td>
      <td>{email}</td>
      <td>{password}</td>
      <FaTimes onClick={() => onDelete(id)} style={{ color: 'red', cursor: 'pointer' }} />
    </tr>
  );
}
export default Row;
