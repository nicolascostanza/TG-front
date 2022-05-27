import { useEffect, useState } from 'react';
import style from '../List/list.module.css';

function List() {
  const [superAdmins, setSuperAdmin] = useState([]);
  console.log(`admins: `, superAdmins);
  useEffect(() => {
    fetch(`http://localhost:8080/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdmin(response.data);
      });
  }, []);
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
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
          {superAdmins.map((superAdmin) => {
            return (
              <ul key={superAdmin._id}>
                <li>{superAdmin.firstName}</li>
                <li>{superAdmin.lastName}</li>
                <li>{superAdmin.createdAt}</li>
                <li>{superAdmin.updatedAt}</li>
                <li>{superAdmin.active ? 'Active' : 'Inactive'}</li>
                <li>{superAdmin.email}</li>
                <li>{superAdmin.password}</li>
              </ul>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;
