import React from 'react';
import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button/Button';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [data, setData] = useState('');
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    requestList();
  }, []);
  const requestList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        response.data.map((admin) => {
          admin.active = admin.active ? 'true' : 'false';
        });
        setAdmins(response.data);
      });
    console.log(admins);
  };

  const deleteAdmin = async () => {
    setShowModalAlert(false);
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setAdmins(admins.filter((admin) => admin._id !== id));
        setShowModalMessage(true);
      });
    console.log(data);
    // }
  };
  const handleCloseAlert = () => {
    setShowModalAlert(false);
  };
  const handleCloseMessage = () => {
    setShowModalMessage(false);
  };
  const openModalDelete = () => {
    setShowModalAlert(true);
  };
  //   const onAdd = () => {
  //  redireccionar a los forms
  //   };
  console.log(id);
  return (
    <section className={styles.container}>
      <Modal
        showModal={showModalAlert}
        handleClose={handleCloseAlert}
        modalTitle={`Are you sure you want to delete the admin?`}
      >
        <Button onClick={deleteAdmin} width={'50px'} height={'25px'} fontSize={'15px'}>
          Accept
        </Button>
        <Button onClick={handleCloseAlert} width={'50px'} height={'25px'} fontSize={'15px'}>
          Cancel
        </Button>
      </Modal>
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage} modalTitle={'delete'}>
        {data.message}
      </Modal>
      <Table
        title={'Admins'}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        data={admins}
        onDelete={openModalDelete}
        setId={setId}
      />
    </section>
  );
}

export default Admins;
