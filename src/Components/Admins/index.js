import React from 'react';
import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button/Button';
import Form from '../Shared/Form';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [data, setData] = useState('');
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const [method, setMethod] = useState(false);

  useEffect(() => {
    requestList();
  }, []);
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

  const deleteAdmin = async () => {
    setShowModalAlert(false);
    await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE'
    })
      .then((data) => data.json())
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
  const handleCloseAdd = () => {
    setShowModalAdd(false);
  };
  const onAdd = () => {
    setShowModalAdd(true);
  };
  // const onEdit = async () => {
  //   const res = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`);
  //   const data = await res.json();
  // .then((data) => data.json())
  // .then((data) => {
  // setFirstName(data.data.firstName);
  // setLastName(data.data.lastName);
  // setEmail(data.data.email);
  // setPassword(data.data.password);
  // setActive(data.data.active);
  // console.log(data.data);
  // });
  // let adminId = admins.filter((admin) => admin._id === id);
  // console.log(adminId[0]);
  // setShowModalAdd(true);
  // };
  //   const onAdd = () => {
  //  redireccionar a los forms
  //   };
  const addAdmin = async (admin) => {
    if (confirm('Are you sure you want to create a Superadmin ?')) {
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
        alert(data.message);
      } else {
        alert(data.message);
      }
    }
  };
  const editAdmin = async (admin) => {
    if (confirm('Are you sure you want to edit it?')) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(admin)
      });
      const data = await res.json();
      if (res.status === 200) {
        alert(data.message);
        resetFields();
      } else {
        alert(data.message);
      }
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
  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setActive(false);
  };

  console.log(id);
  console.log(firstName, lastName, email, password, active, method);
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
      <Form
        showModal={showModalAdd}
        handleClose={handleCloseAdd}
        handleSubmit={onSubmit}
        title={method === 'POST' ? 'Create superadmin' : 'Edit Superadmin'}
      >
        <div>
          <label>Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
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
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage} modalTitle={'delete'}>
        {data.message}
      </Modal>
      <Table
        title={'Admins'}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        data={admins}
        onDelete={openModalDelete}
        onAdd={onAdd}
        // onEdit={onEdit}
        setId={setId}
        setMethod={setMethod}
      />
    </section>
  );
}

export default Admins;
