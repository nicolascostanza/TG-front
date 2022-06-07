import styles from './super-admins.module.css';
import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
// import Modal from '../Shared/Modal';

function SuperAdmins() {
  // const headers = [
  //   '_id',
  //   'name',
  //   'description',
  //   'clientName',
  //   'startDate',
  //   'endDate',
  //   'projectManager',
  //   'team',
  //   'tasks',
  //   'createdAt',
  //   'updatedAt'
  // ];
  const headers = [
    '_id',
    'firstName',
    'lastName',
    'email',
    'password',
    'active',
    'createdAt',
    'updatedAt'
  ];
  //   const [id, setId] = useState('');
  //   const [showModal, setShowModal] = useState(false);
  //   const [list, setList] = useState([]);
  //   useEffect(() => {
  //     requestList();
  //   }, []);
  //   const requestList = () => {
  //     fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         response.data.map((superadmin) => {
  //           superadmin.active = superadmin.active ? 'true' : 'false';
  //         });
  //         setList(response.data);
  //       });
  //   };
  //   console.log('id a eliminar: ', id);
  //   return (
  //     <section className={styles.container}>
  //       <Modal id={id} showModal={showModal}>
  //         hola esto es un modal
  //       </Modal>
  //       <h1>SuperAdmins</h1>
  //       <Table
  //         setId={setId}
  //         showModal={setShowModal}
  //         title={'projects'}
  //         data={list}
  //         headers={headers}
  //       />
  //     </section>
  //   );
  // }
  const [list, setList] = useState([]);
  useEffect(() => {
    requestList();
  }, []);
  const requestList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        response.data.map((superadmin) => {
          superadmin.active = superadmin.active ? 'true' : 'false';
          // superadmin.createdAt = superadmin.createdAt.toLocaleString();
        });
        setList(response.data);
      });
  };
  return (
    <section className={styles.container}>
      <Table title={'SuperAdmins'} data={list} headers={headers} />
    </section>
  );
}

export default SuperAdmins;
