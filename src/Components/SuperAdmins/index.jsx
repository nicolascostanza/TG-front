import styles from './super-admins.module.css';
import { useState, useEffect } from 'react';
// import List from './List';
// import Form from './Form';
import Btn from './Btn';
import Table from '../Shared/Table';

function SuperAdmins() {
  let [screen, setScreen] = useState(false);
  // let [method, setMethod] = useState('');
  // let [id, setID] = useState('');
  const [list, setList] = useState([]);
  const switchScreen = () => {
    setScreen(screen ? (screen = false) : (screen = true));
  };
  useEffect(() => {
    requestList();
  }, []);
  const requestList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        setList(response.data);
      });
  };
  if (screen) {
    return (
      <section className={styles.container}>
        <h2>SuperAdmin Form</h2>
        {/* <Form method={method} switchScreen={switchScreen} id={id} /> */}
        <Btn text="GO BACK" onClick={switchScreen} />
      </section>
    );
  } else {
    return (
      <Table
        tittle={'titulo'}
        data={list}
        headers={[
          '_id',
          'firstName',
          'lastName',
          'createdAt',
          'updatedAt',
          'email',
          'password',
          'active'
        ]}
      />
    );
  }
}

export default SuperAdmins;
