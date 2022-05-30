import React from 'react';

const Row = ({ id, email, password, fullName, dob, phone, gender, address, active }) => {
  return (
    <tr id={id}>
      <td>{id}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>{fullName}</td>
      <td>{dob}</td>
      <td>{phone}</td>
      <td>{gender}</td>
      <td>{address}</td>
      <td>{active ? 'Active' : 'Unactive'}</td>
      {/* {console.log(response)} */}
    </tr>
  );
};

export default Row;
