import React from 'react';
import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button/Button';
import Form from '../Shared/Form';
import Sidebar from '../Shared/Sidebar';
import * as thunks from '../../redux/admins/thunks';
import { useDispatch, useSelector } from 'react-redux';

function Admins() {
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
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const isFetching = useSelector((state) => state.admins.isFetching);

  useEffect(() => {
    dispatch(thunks.getAdmins());
  }, [method]);

  if (isFetching) {
    return <h2>Fetching</h2>;
  }
  const formattedAdmins = admins.map((admin) => {
    return {
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: admin.password,
      active: admin.active ? 'true' : 'false'
    };
  });

  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };

  const deleteAdmin = () => {
    setShowModalAlert(false);
    dispatch(thunks.deleteAdmin(deleteId));
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
    dispatch(thunks.addAdmin(admin));
    setMethod('');
    setShowModalAdd(false);
    alert('Admin successfully created');
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

  const editAdmin = (body) => {
    dispatch(thunks.updateAdmin(body, idEdit));
    if (isFetching) {
      return <h2>Fetching</h2>;
    }
    setMethod('');
    handleCloseAdd(false);
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
        <div className={styles.boxButtons}>
          <Button onClick={deleteAdmin} width={'50px'} height={'25px'} fontSize={'15px'}>
            Accept
          </Button>
          <Button onClick={handleCloseAlert} width={'50px'} height={'25px'} fontSize={'15px'}>
            Cancel
          </Button>
        </div>
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
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage} modalTitle={''} />
      <Table
        title={'Admins'}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        data={formattedAdmins}
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
