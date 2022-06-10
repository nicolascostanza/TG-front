import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import Table from '../Shared/Table';
import EditEmployee from './EditEmployee/editEmployee';
import AddEmployee from './EmployeeForm/addEmployee';
import styles from './employees.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button/Button';

function Employees() {
  const headers = [
    '_id',
    'firstName',
    'surname',
    'email',
    'gender',
    'adress',
    'dob',
    'password',
    'phone',
    'active'
  ];

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeIdToEdit, setEmployeeIdToEdit] = useState('');
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [tittleModal, setTittleModal] = useState('');
  const [message, setMessage] = useState('');
  const [showModalMessage, setShowModalMessage] = useState(false);

  useEffect(() => {
    requestList();
  }, [employees]);
  const requestList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        response.data.map((employee) => {
          employee.active = employee.active ? 'true' : 'false';
        });
        setEmployees(response.data);
      });
  };
  const deleteEmployee = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/employees/${deleteId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (res.status === 200) {
      setEmployees(employees.filter((employee) => employee._id !== id));
      setShowModalAlert(false);
      setTittleModal('DELETED');
      setMessage(data.message);
      setShowModalMessage(true);
    } else {
      setShowModalAlert(false);
      setTittleModal('ERROR');
      setMessage(data.message);
      setShowModalMessage(true);
    }
  };
  const addEmployee = () => {
    setShowAdd(true);
  };
  const closeAdd = () => {
    setShowAdd(false);
  };
  const editEmployee = (id) => {
    setShowEdit(true);
    setEmployeeIdToEdit(id);
  };
  const closeEdit = () => {
    setShowEdit(false);
  };
  const handleCloseAlert = () => {
    setShowModalAlert(false);
  };
  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };
  const handleCloseMessage = () => {
    setShowModalMessage(false);
  };

  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
      <AddEmployee showAdd={showAdd} closeAdd={closeAdd} />
      <Modal showModal={showModalAlert} handleClose={handleCloseAlert}>
        <h2>Are you sure you want to delete the employee?</h2>
        <div className={styles.buttonsDeleteModal}>
          <Button onClick={deleteEmployee} width={'100%'} height={'25px'} fontSize={'15px'}>
            Accept
          </Button>
        </div>
        <div className={styles.buttonsDeleteModal}>
          <Button onClick={handleCloseAlert} width={'100%'} height={'25px'} fontSize={'15px'}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage}>
        <h2>{tittleModal}</h2>
        <p>{message}</p>
      </Modal>
      <section>
        <div>
          <EditEmployee showEdit={showEdit} closeEdit={closeEdit} id={employeeIdToEdit} />
        </div>
        <Table
          title={'Employees'}
          headers={headers}
          data={employees}
          onEdit={editEmployee}
          onAdd={addEmployee}
          onDelete={onDelete}
        />
      </section>
    </section>
  );
}

export default Employees;
