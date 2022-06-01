import React from 'react';
// import RowBtn from '../RowBtn/RowBtn';

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
  // onEdit
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
        {/* <RowBtn className="fa-solid fa-pen-to-square" id={id} onEdit={onEdit} employee={employee} /> */}
        <a href={`/employees/editEmployee?id=${id}`}>
          <i className="fa-solid fa-pen-to-square"></i>
        </a>
      </td>
      <td>
        {/* <RowBtn className="fa-solid fa-xmark" id={id} onDelete={onDelete} employee={employee} /> */}
        <i
          className="fa-solid fa-xmark"
          onClick={() => {
            onDelete(employee._id);
          }}
        ></i>
      </td>
    </tr>
  );
};

export default Row;
