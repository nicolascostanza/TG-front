import React from 'react';

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
        <a href={`/employees/employee-edit?id=${id}`}>
          <i className="fa-solid fa-pen-to-square"></i>
        </a>
      </td>
      <td>
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
