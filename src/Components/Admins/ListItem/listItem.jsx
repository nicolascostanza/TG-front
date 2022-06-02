import React from 'react';
import style from '../ListItem/listItem.module.css';

function ListItem(props) {
  const { _id, firstName, lastName, active, email } = props.admin;
  const { onDelete } = props;
  let url = `http://localhost:3000/admins-edit?id=${_id}`;
  return (
    <tr id={_id}>
      <td className={style.field}>{_id}</td>
      <td className={style.field}>{firstName}</td>
      <td className={style.field}>{lastName}</td>
      <td className={style.field}>{active ? 'true' : 'false'}</td>
      <td className={style.field}>{email}</td>
      <td className={style.btnDelete} onClick={() => onDelete(_id)}>
        x
      </td>
      <td>
        <div className={style.btnEdit}>
          <a className={style.btnEditText} href={url}>
            edit
          </a>
        </div>
      </td>
    </tr>
  );
}
export default ListItem;
