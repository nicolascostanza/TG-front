import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Btn from '../Btn';

function Row({
  id,
  firstName,
  lastName,
  createdAt,
  updatedAt,
  active,
  email,
  password,
  onDelete,
  switchScreen,
  setMethod,
  setID
}) {
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
        <Btn
          onClick={() => {
            setMethod('PUT');
            setID(id);
            {
              switchScreen();
            }
          }}
          text="Edit"
          color="blue"
        />
      </td>
      <td>
        <FaTimes onClick={() => onDelete(id)} style={{ color: 'red', cursor: 'pointer' }} />
      </td>
    </tr>
  );
}
export default Row;
