import React from 'react';
import style from './row.module.css';

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
  // funciones para trabajar fecha
  const yearCreate = createdAt.substring(0, 4);
  const monthCreate = createdAt.substring(5, 7);
  const dayCreate = createdAt.substring(8, 10);
  const hsCreate = createdAt.substring(11, 13);
  const minCreate = createdAt.substring(14, 16);
  const Created = `${yearCreate}/${monthCreate}/${dayCreate} at ${hsCreate}:${minCreate}`;
  const yearUpdate = updatedAt.substring(0, 4);
  const monthUpdate = updatedAt.substring(5, 7);
  const dayUpdate = updatedAt.substring(8, 10);
  const hsUpdate = updatedAt.substring(11, 13);
  const minUpdate = updatedAt.substring(14, 16);
  const Updated = `${yearUpdate}/${monthUpdate}/${dayUpdate} at ${hsUpdate}:${minUpdate}`;
  return (
    <tr className={style.row} id={id}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{Created}</td>
      <td>{Updated}</td>
      <td>{active ? 'Active' : 'Inactive'}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>
        <i
          className="fa-solid fa-pen-to-square"
          onClick={() => {
            setMethod('PUT');
            setID(id);
            {
              switchScreen();
            }
          }}
          style={{ color: '#192de6', cursor: 'pointer' }}
        ></i>
      </td>
      <td onClick={() => onDelete(id)} style={{ color: 'red', cursor: 'pointer' }}>
        <i className="fa-solid fa-xmark"></i>
      </td>
    </tr>
  );
}
export default Row;
