import React from 'react';

function ListItem(props) {
  const { _id, firstName, lastName, active, email } = props.admin;
  const { onDelete } = props;
  let url = `http://localhost:3000/admins-edit?id=${_id}`;
  return (
    <tr id={_id}>
      <td>{_id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{active ? 'true' : 'false'}</td>
      <td>{email}</td>
      <td onClick={() => onDelete(_id)}>x</td>
      <td>
        <a href={url}>edit</a>
      </td>
    </tr>
  );
}
export default ListItem;
