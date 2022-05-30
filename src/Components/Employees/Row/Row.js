import React from 'react';
import RowBtn from '../RowBtn/RowBtn';

const Row = ({
  id,
  email,
  password,
  fullName,
  dob,
  phone,
  gender,
  address,
  active,
  createdAt,
  updatedAt,
  onDelete,
  employee
}) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>{fullName}</td>
      <td>{dob}</td>
      <td>{phone}</td>
      <td>{gender}</td>
      <td>{address}</td>
      <td>{active ? 'Active' : 'Unactive'}</td>
      <td>{createdAt}</td>
      <td>{updatedAt}</td>
      <td>
        <RowBtn className="fa-solid fa-pen-to-square" />
      </td>
      <td>
        <RowBtn className="fa-solid fa-xmark" id={id} onDelete={onDelete} employee={employee} />
      </td>
    </tr>
  );
};

export default Row;
