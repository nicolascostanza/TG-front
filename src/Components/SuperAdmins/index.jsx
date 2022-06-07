import styles from './super-admins.module.css';
import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button/Button';

function SuperAdmins() {
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
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const [id, setId] = useState('');
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
      });
  };
  const deleteAdmin = async () => {
    setShowModalAlert(false);
    await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setList(list.filter((superadmin) => superadmin._id !== id));
        setShowModalMessage(true);
      });
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
  console.log(id);
  return (
    <section className={styles.container}>
      <Modal
        showModal={showModalAlert}
        handleClose={handleCloseAlert}
        modalTitle={`Are you sure you want to delete the SuperAdmin?`}
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
        title={'SuperAdmins'}
        data={list}
        headers={headers}
        onDelete={openModalDelete}
        setId={setId}
      />
    </section>
  );
}

export default SuperAdmins;
