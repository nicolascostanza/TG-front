import { useEffect, useState } from 'react';
import style from '../List/list.module.css';
import ListItem from '../ListItem/listItem';
// import Btn from '../Btn';

function List() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
      });
  }, []);
  const deleteAdmin = async (id) => {
    const war = confirm('Sure you want to remove it?');
    if (war) {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE'
      });
      setAdmins(admins.filter((admin) => admin._id !== id));
    }
  };
  return (
    <div className={style.container}>
      <div className={style.btn}>
        <a className={style.btnText} href="/admins-add">
          Add New Admin
        </a>
      </div>
      <table className={style.tableBox}>
        <thead>
          <tr>
            <th className={style.head}>Id</th>
            <th className={style.head}>FirstName</th>
            <th className={style.head}>LastName</th>
            <th className={style.head}>Active</th>
            <th className={style.head}>Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <ListItem key={admin._id} admin={admin} onDelete={deleteAdmin} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default List;
