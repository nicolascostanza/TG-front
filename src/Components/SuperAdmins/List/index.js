import { useEffect, useState } from 'react';
import style from '../List/list.module.css';
import Row from '../Row';

function List() {
  const [superAdmins, setSuperAdmin] = useState([]);
  console.log(`Superadmins: `, superAdmins);
  useEffect(() => {
    fetch(process.env.REACT_APP_LOCALHOST_URL)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdmin(response.data);
      });
  }, []);
  const deleteSuperAdmin = async (id) => {
    await fetch(`${process.env.REACT_APP_LOCALHOST_URL}/${id}`, {
      method: 'DELETE'
    });
    setSuperAdmin(superAdmins.filter((superadmin) => superadmin._id !== id));
  };
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>Active</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {/* {superAdmins.lengh > 0 ? 'hay cosas' : 'nada'} */}
          {superAdmins.map((superAdmin) => (
            <Row
              key={superAdmin._id}
              id={superAdmin._id}
              firstName={superAdmin.firstName}
              lastName={superAdmin.lastName}
              createdAt={superAdmin.createdAt}
              updatedAt={superAdmin.updatedAt}
              active={superAdmin.active}
              email={superAdmin.email}
              password={superAdmin.password}
              onDelete={deleteSuperAdmin}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default List;
