import styles from './super-admins.module.css';
import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button/Button';
import Form from '../Shared/Form';
import Sidebar from '../Shared/Sidebar';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [list, setList] = useState([]);
  const [method, setMethod] = useState('');
  const [ids, setId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [tittleModal, setTittleModal] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    requestList();
  }, [method]);
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
  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setActive(false);
  };
  // modals
  const handleCloseAlert = () => {
    setShowModalAlert(false);
  };
  const handleCloseMessage = () => {
    setShowModalMessage(false);
  };
  const handleCloseAdd = () => {
    setShowModalAdd(false);
  };
  // add functions and submit
  const onAdd = () => {
    setMethod('POST');
    resetFields();
    setShowModalAdd(true);
  };
  const addSuperAdmin = async (superAdmin) => {
    resetFields();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(superAdmin)
    });
    const data = await res.json();
    setTittleModal('Created');
    if (res.status === 201) {
      setShowModalAdd(false);
      setTittleModal('CREATED');
      setMessage(data.message);
      setShowModalMessage(true);
      setList([...list, data]);
      setMethod('');
    } else {
      setShowModalAdd(false);
      setTittleModal('ERROR');
      setMessage(data.message);
      setShowModalMessage(true);
      setMethod('');
    }
  };
  // edits functions
  const onEdit = async (id) => {
    setMethod('PUT');
    setShowModalAdd(true);
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setActive(response.data.active);
      });
    setId(id);
  };
  const Editing = async (superAdmin) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${ids}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(superAdmin)
    });
    const data = await res.json();
    if (res.status === 200) {
      handleCloseAdd(false);
      resetFields();
      setTittleModal('EDITED');
      setMessage(data.message);
      setShowModalMessage(true);
      setMethod('');
    } else {
      setShowModalAdd(false);
      setTittleModal('ERROR');
      setMessage(data.message);
      setShowModalMessage(true);
      setMethod('');
    }
  };
  // delete functions
  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };
  const deleteAdmin = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${deleteId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (res.status === 200) {
      setList(list.filter((superadmin) => superadmin._id !== deleteId));
      setShowModalAlert(false);
      setTittleModal('DELETED');
      setMessage(data.message);
      setShowModalMessage(true);
    } else {
      setShowModalAdd(false);
      setTittleModal('ERROR');
      setMessage(data.message);
      setShowModalMessage(true);
      setMethod('');
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (method === 'POST') {
      addSuperAdmin({ firstName, lastName, email, password, active });
      resetFields();
    } else if (method === 'PUT') {
      Editing({ firstName, lastName, email, password, active });
    } else {
      alert('Something unexpected happened');
    }
  };
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <section className={styles.container}>
        <Modal
          showModal={showModalAlert}
          handleClose={handleCloseAlert}
          modalTitle={`Are you sure you want to delete the SuperAdmin?`}
        >
          <div className={styles.buttonsDeleteModal}>
            <Button onClick={deleteAdmin} width={'100%'} height={'25px'} fontSize={'15px'}>
              Accept
            </Button>
          </div>
          <div className={styles.buttonsDeleteModal}>
            <Button onClick={handleCloseAlert} width={'100%'} height={'25px'} fontSize={'15px'}>
              Cancel
            </Button>
          </div>
        </Modal>
        <Form
          handleSubmit={onSubmit}
          showModal={showModalAdd}
          handleClose={handleCloseAdd}
          title={method === 'POST' ? 'Create Superadmin' : 'Edit Superadmin'}
        >
          <div className={styles.inputsForm}>
            <label>Name</label>
            <input
              className={styles.inputsDivs}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.inputsForm}>
            <label>LastName</label>
            <input
              className={styles.inputsDivs}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles.inputsForm}>
            <label>Email</label>
            <input
              className={styles.inputsDivs}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputsForm}>
            <label>Password</label>
            <input
              className={styles.inputsDivs}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputsForm}>
            <div>
              <label>Active</label>
            </div>
            <div>
              <input
                className={styles.inputsDivs}
                type="checkbox"
                checked={active}
                value={active}
                onChange={(e) => setActive(e.currentTarget.checked)}
              />
            </div>
          </div>
        </Form>
        <Modal
          showModal={showModalMessage}
          handleClose={handleCloseMessage}
          modalTitle={tittleModal}
        >
          {message}
        </Modal>
        <Table
          title={'Super Admins'}
          data={list}
          headers={headers}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </section>
    </>
  );
}

export default SuperAdmins;
