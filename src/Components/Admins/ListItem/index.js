// import React from 'react';

// const ListItem = (props) => {
//   const deleteAdmin = () => {
//     props.deleteAdmin(props.listItem._id);
//   };
//   return (
//     <tr>
//       <td>{props.listItem._id}</td>
//       <td>{props.listItem.name}</td>
//       <td>{props.listItem.lastName}</td>
//       <td>{props.listItem.email}</td>
//       <td>{props.listItem.status ? 'true' : 'false'}</td>
//       <button onClick={() => deleteAdmin(props.listItem._id)}>x</button>
//       <button>edit</button>
//     </tr>
//   );
// };

// export default ListItem;
import React from 'react';
// import { FaTimes } from 'react-icons/fa';

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
      {/* <FaTimes onClick={() => onDelete(id)} style={{ color: 'red', cursor: 'pointer' }} /> */}
      <td onClick={() => onDelete(_id)}>x</td>
      <td>
        <a href={url}>edit</a>
      </td>
    </tr>
  );
}
export default ListItem;
