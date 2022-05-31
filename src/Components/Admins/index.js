// import { useEffect, useState } from 'react';
// import styles from './admins.module.css';
// // import Form from './Form';
// import ListItem from './ListItem';

// function Admins() {
//   return (
//     <section className={styles.container}>
//       <h2>Admins</h2>
//     </section>
//   );
// }
// const Admins = () => {
//   const [admins, saveAdmins] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:4000/admins/`)
//       .then((response) => response.json())
//       .then((response) => {
//         saveAdmins(response.data);
//       });
//   }, []);
//   console.log(admins);

//   const deleteAdmin = (id) => {
//     saveAdmins([...admins.filter((listItem) => listItem._id !== id)]);
//   };

// const addItem = () => {
//   console.log('entro al add item');
//   useEffect(() => {
//     const requestOptions = {
//       method: 'POST',
//       body: JSON.stringify({
//         firstName: 'Gina',
//         lastName: 'SchiappaPietra',
//         email: 'gina@gmail.com',
//         password: '123456788',
//         active: true
//       })
//     };
//     fetch(`http://localhost:4000/admins`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => saveAdmins([...admins.push(data)]));
//     console.log('entro al fetch');
//   }, []);
// };

// return (
//   <div className={styles.container}>
//     <table className={styles.tableContainer}>
//       <thead>
//         <tr className={styles.thead}>
//           <th id="id">ID</th>
//           <th id="firstName">Name</th>
//           <th id="lastName">Last Name</th>
//           <th id="email">Email</th>
//           <th id="status">Status</th>
//           <th id="delete">Delete</th>
//           <th id="edit">Edit</th>
//           <a href="/admins-form">add admin</a>
//         </tr>
//       </thead>
//       <tbody>
//         {admins.map((admin) => (
//           <ListItem key={admin._id} listItem={admin} deleteAdmin={deleteAdmin} />
//           // console.log(admin._id);
//           // console.log(admin._id);
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

//   return (
//     <section className={styles.container}>
//       <h2>Admins</h2>
//       <div>
//         {admins.map((admin) => {
//           return <div key={admin.id}>{admin.name}</div>;
//         })}
//       </div>
//     </section>
//   );
// }
// };

// const ListItem = ({ adminItem }) => {
//   console.log('holaaa', { adminItem });
//   return (
//     <tr className="rows">
//       <td>{adminItem.firstName}</td>
//       <td>{adminItem.lasstName}</td>
//       <td>{adminItem.email}</td>
//       <td>{adminItem.status}</td>
//     </tr>
//   );
// };

// export default Admins;
import styles from './admins.module.css';
import List from './List';

function Admins() {
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
}

export default Admins;
