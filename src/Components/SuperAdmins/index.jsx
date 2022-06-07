import styles from './super-admins.module.css';
import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button/Button';
import Form from '../Shared/Form';

function SuperAdmins() {
  // superadmins
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
  // timesheets cambiar el approved en el fetch
  // const headers = [
  //   '_id',
  //   'employeeId',
  //   'description',
  //   'project',
  //   'date',
  //   'hours',
  //   'task',
  //   'approved',
  //   'role'
  // ];
  // projects
  // const headers = [
  //   '_id',
  //   'name',
  //   'description',
  //   'clientName',
  //   'startDate',
  //   'endDate',
  //   'team',
  //   'tasks',
  //   'createdAt',
  //   'updatedAt'
  // ];
  // tasks
  // const headers = [
  //   '_id',
  //   'parentProject',
  //   'taskCreatorId',
  //   'taskName',
  //   'taskDescription',
  //   'assignedEmployee',
  //   'startDate',
  //   'status',
  //   'createdAt',
  //   'updatedAt'
  // ];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const [id, setId] = useState('');
  const [method, setMethod] = useState('');
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
  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setActive(false);
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
  const onAdd = () => {
    setShowModalAdd(true);
  };
  const handleCloseAlert = () => {
    setShowModalAlert(!false);
  };
  const handleCloseMessage = () => {
    setShowModalMessage(false);
  };
  const openModalDelete = () => {
    setShowModalAlert(true);
  };
  // add modals
  const handleCloseAdd = () => {
    setShowModalAdd(false);
  };
  // prueba
  // edit modals
  const onEdit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setActive(response.data.active);
        console.log(firstName);
      });
    setShowModalAdd(true);
  };
  // las funciones de la semana pasada
  const addSuperAdmin = async (superAdmin) => {
    if (confirm('Are you sure you want to create a Superadmin ?')) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await res.json();
      if (res.status === 201) {
        setList([...list, data]);
        alert(data.message);
      } else {
        alert(data.message);
      }
    }
  };
  const editSuperAdmin = async (superAdmin) => {
    if (confirm('Are you sure you want to edit it?')) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
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
      addSuperAdmin({ firstName, lastName, email, password, active });
      resetFields();
    } else if (method === 'PUT') {
      editSuperAdmin({ firstName, lastName, email, password, active });
    } else {
      alert('Something unexpected happened');
    }
  };
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
      <Form
        handleSubmit={onSubmit}
        showModal={showModalAdd}
        handleClose={handleCloseAdd}
        title={method === 'POST' ? 'Create superadmin' : 'Edit Superadmin'}
      >
        <div>
          <label>Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>LastName</label>
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
        title={'SuperAdmins'}
        data={list}
        headers={headers}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={openModalDelete}
        setId={setId}
        setMethod={setMethod}
      />
    </section>
  );
}

export default SuperAdmins;
