import React from 'react';
import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button/Button';
import Form from '../Shared/Form';
import Sidebar from '../Shared/Sidebar';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [data, setData] = useState('');
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const [method, setMethod] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [idEdit, setId] = useState('');

  useEffect(() => {
    requestList();
  }, [method]);

  const requestList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((data) => data.json())
      .then((data) => {
        data.data.map((admin) => {
          admin.active = admin.active ? 'true' : 'false';
        });
        setAdmins(data.data);
      });
    console.log(admins);
  };

  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };

  const deleteAdmin = async () => {
    setShowModalAlert(false);
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${deleteId}`, {
      method: 'DELETE'
    })
      .then((data) => data.json())
      .then((data) => {
        setData(data);
        setAdmins(admins.filter((admin) => admin._id !== deleteId));
        setShowModalMessage(true);
      });
    console.log(data);
  };
  const handleCloseAlert = () => {
    setShowModalAlert(false);
  };
  const handleCloseMessage = () => {
    setShowModalMessage(false);
  };

  const handleCloseAdd = () => {
    setShowModalAdd(false);
  };
  const onAdd = () => {
    setMethod('POST');
    setShowModalAdd(true);
  };

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setActive(false);
  };
  const addAdmin = async (admin) => {
    resetFields();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(admin)
    });
    const data = await res.json();
    if (res.status === 201) {
      setAdmins([...admins, data]);
      setMethod('');
      setShowModalAdd(false);
      setData(data);
      setShowModalMessage(true);
    } else {
      setData(data);
      setShowModalMessage(true);
    }
  };
  const onEdit = async (id) => {
    setMethod('PUT');
    setShowModalAdd(true);
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`)
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

  const editAdmin = async (admin) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admins/${idEdit}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(admin)
    });
    const data = await res.json();
    if (res.status === 200) {
      setMethod('');
      handleCloseAdd(false);
      resetFields();
      setData(data);
      setShowModalMessage(true);
    } else {
      alert(data.message);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (method === 'POST') {
      addAdmin({ firstName, lastName, email, password, active });
      resetFields();
    } else if (method === 'PUT') {
      editAdmin({ firstName, lastName, email, password, active });
    } else {
      alert('Something unexpected happened');
    }
  };

  console.log(firstName, lastName, email, password, active, method);
  return (
    <section className={styles.container}>
      <div>
        <Sidebar></Sidebar>
      </div>
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
      <Form
        showModal={showModalAdd}
        handleClose={handleCloseAdd}
        handleSubmit={onSubmit}
        title={method === 'POST' ? 'Create Admin' : 'Edit Admin'}
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label>Active</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={active}
              value={active}
              onChange={(e) => setActive(e.currentTarget.checked)}
            />
          </div>
        </div>
      </Form>
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage} modalTitle={''}>
        {data.message}
      </Modal>
      <Table
        title={'Admins'}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        data={admins}
        onDelete={onDelete}
        onAdd={onAdd}
        onEdit={onEdit}
        setId={setId}
        setMethod={setMethod}
      />
    </section>
  );
}

export default Admins;
