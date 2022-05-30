import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Row({ id, firstName, lastName, createdAt, updatedAt, active, email, password, onDelete }) {
  createdAt = new Date();
  updatedAt = new Date();
  const created = createdAt.toLocaleString();
  const updated = updatedAt.toLocaleString();
  return (
    <tr id={id}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{created}</td>
      <td>{updated}</td>
      <td>{active ? 'Active' : 'Inactive'}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>
        <a href="http://localhost:3000/super-admins-edit">
          <FaTimes style={{ color: 'green', cursor: 'pointer' }} />
        </a>
      </td>
      <td>
        <FaTimes onClick={() => onDelete(id)} style={{ color: 'red', cursor: 'pointer' }} />
      </td>
    </tr>
  );
}
export default Row;
