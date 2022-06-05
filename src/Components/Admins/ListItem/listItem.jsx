import React from 'react';
import style from '../ListItem/listItem.module.css';

function ListItem(props) {
  const { _id, firstName, lastName, active, email } = props.admin;
  const { onDelete } = props;
  let url = `/admins-edit?id=${_id}`;
  return (
    <tr id={_id}>
      <td className={style.field}>{_id}</td>
      <td className={style.field}>{firstName}</td>
      <td className={style.field}>{lastName}</td>
      <td className={style.field}>{active ? 'true' : 'false'}</td>
      <td className={style.field}>{email}</td>
      <td onClick={() => onDelete(_id)}>
        <a className={style.btnDelete} href="#">
          X
        </a>
      </td>
      <td>
        <a className={style.btnEditText} href={url}>
          <div className={style.btnEdit}>edit</div>
        </a>
      </td>
    </tr>
  );
}
export default ListItem;
