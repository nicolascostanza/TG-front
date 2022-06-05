import { useEffect, useState } from 'react';
import style from '../List/list.module.css';
import ListItem from '../ListItem/listItem';
import Modal from '../Modal/modal';

function List() {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
      });
  }, []);
  const deleteAdmin = async (id) => {
    const war = confirm(`Are you sure you want to delete the admin with the Id: ${id}`);
    if (war) {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((data) => setData(data));
      setShowModal(true);
      setAdmins(admins.filter((admin) => admin._id !== id));
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className={style.container}>
      <Modal show={showModal} close={closeModal} message={data.message} />
      <a className={style.btn} href="/admins-add">
        <div className={style.btn}>Add New Admin</div>
      </a>
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
