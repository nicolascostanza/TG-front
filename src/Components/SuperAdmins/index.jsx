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
  const [method, setMethod] = useState('');
  const [name, setName] = useState('');
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
  console.log(name, lastName, email, password, active);
  console.log('metodo: ', method);
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

      {/* aca arranca el add  */}
      <Form showModal={showModalAdd} handleClose={handleCloseAdd} title={`Add Superadmin`}>
        <div>
          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>LastName</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
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
        onDelete={openModalDelete}
        setId={setId}
        setMethod={setMethod}
      />
    </section>
  );
}

export default SuperAdmins;
