import styles from './super-admins.module.css';
import { useState, useEffect } from 'react';
// import List from './List';
// import Form from './Form';
import Table from '../Shared/Table';

function SuperAdmins() {
  const headers = [
    '_id',
    'firstName',
    'lastName',
    'createdAt',
    'updatedAt',
    'email',
    'password',
    'active'
  ];
  // prueba
  // const setDateCreated = (date) => {
  //   const yearCreate = date.substring(0, 4);
  //   const monthCreate = date.substring(5, 7);
  //   const dayCreate = date.substring(8, 10);
  //   const hsCreate = date.substring(11, 13);
  //   const minCreate = date.substring(14, 16);
  //   const Created = `${yearCreate}/${monthCreate}/${dayCreate} at ${hsCreate}:${minCreate}`;
  //   date = Created;
  // };
  // const yearCreate = createdAt.substring(0, 4);
  // const monthCreate = createdAt.substring(5, 7);
  // const dayCreate = createdAt.substring(8, 10);
  // const hsCreate = createdAt.substring(11, 13);
  // const minCreate = createdAt.substring(14, 16);
  // const Created = `${yearCreate}/${monthCreate}/${dayCreate} at ${hsCreate}:${minCreate}`;
  // const yearUpdate = updatedAt.substring(0, 4);
  // const monthUpdate = updatedAt.substring(5, 7);
  // const dayUpdate = updatedAt.substring(8, 10);
  // const hsUpdate = updatedAt.substring(11, 13);
  // const minUpdate = updatedAt.substring(14, 16);
  // const Updated = `${yearUpdate}/${monthUpdate}/${dayUpdate} at ${hsUpdate}:${minUpdate}`;
  // final de prueba
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
        });
        setList(response.data);
        console.log(list);
      });
  };
  return (
    <section className={styles.container}>
      <Table title={'SuperAdmins'} data={list} headers={headers} />
    </section>
  );
}

export default SuperAdmins;
