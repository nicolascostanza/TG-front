import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import Table from '../Shared/Table';
import styles from './employees.module.css';
import Modal from '../Shared/Modal';
import Dropdown from '../Shared/Dropdown/Dropdown';
import Form from '../Shared/Form';
import Button from '../Shared/Button/Button';
import * as thunks from '../../redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';

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

  const [showAddEdit, setShowAddEdit] = useState(false);
  const [employeeIdToEdit, setEmployeeIdToEdit] = useState('');
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [tittleModal, setTittleModal] = useState('');
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [adress, setAdress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState('');
  const [method, setMethod] = useState('');
  const message = useSelector((state) => state.employees.message);
  const error = useSelector((state) => state.employees.response);
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isFetching = useSelector((state) => state.employees.isFetching);

  useEffect(() => {
    dispatch(thunks.getEmployees());
  }, []);

  const valueGenderChange = (e) => {
    return setGender(e.target.value);
  };

  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };
  const deleteEmployee = () => {
    dispatch(thunks.deleteEmployee(deleteId));
    setShowModalAlert(false);
    setTittleModal('DELETE');
    setShowModalMessage(true);
  };
  const handleCloseAlert = () => {
    setShowModalAlert(false);
  };

  const handleCloseMessage = () => {
    setShowModalMessage(false);
    setShowModalMessage('');
  };

  const formEmployee = () => {
    resetFields();
    setMethod('POST');
    setTittleModal('Add new Employee');
    setShowAddEdit(true);
  };

  const formEmployeeEdit = (id) => {
    setMethod('PUT');
    setTittleModal('Update Employee');
    setEmployeeIdToEdit(id);
    console.log(employees);
    console.log(id);
    const employeeToEdit = employees.filter((employee) => {
      if (employee._id === id) {
        return employee;
      }
    });
    console.log(employeeToEdit);
    setFirstName(employeeToEdit[0].firstName);
    setSurname(employeeToEdit[0].surname);
    setEmail(employeeToEdit[0].email);
    setGender(employeeToEdit[0].gender);
    setAdress(employeeToEdit[0].adress);
    setDob(new Date(employeeToEdit[0].dob).toISOString().split('T')[0] || '');
    setPassword(employeeToEdit[0].password);
    setPhone(employeeToEdit[0].phone);
    setActive(employeeToEdit[0].active === 'true' ? true : false);
    setShowAddEdit(true);
    setEmployeeIdToEdit(id);
  };

  const resetFields = () => {
    setFirstName('');
    setSurname('');
    setEmail('');
    setGender('');
    setAdress('');
    setDob('');
    setPassword('');
    setPhone('');
    setActive(false);
  };

  const closeForm = () => {
    setShowAddEdit(false);
    setMethod('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (method === 'POST') {
      dispatch(
        thunks.addEmployee({
          firstName,
          surname,
          email,
          gender,
          adress,
          dob,
          password,
          phone,
          active: active ? 'true' : 'false'
        })
      );
      if (!error) {
        setShowAddEdit(false);
        setMethod('');
        resetFields();
      }
      setShowModalMessage(true);
    } else if (method === 'PUT') {
      dispatch(
        thunks.editEmployee({
          _id: employeeIdToEdit,
          firstName,
          surname,
          email,
          gender,
          adress,
          dob,
          password,
          phone,
          active: active ? 'true' : 'false'
        })
      );
      if (!error) {
        setShowAddEdit(false);
        setMethod('');
      }
      setShowModalMessage(true);
    } else {
      alert('Something unexpected happened');
    }
    resetFields();
  };

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
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
        <Table
          title={'Employees'}
          headers={headers}
          data={employees}
          onEdit={formEmployeeEdit}
          onAdd={formEmployee}
          onDelete={onDelete}
        />
        <Form
          title={tittleModal}
          handleSubmit={onSubmit}
          handleClose={closeForm}
          showModal={showAddEdit}
          background
        >
          <div>
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Gender</label>
            <Dropdown
              value={gender}
              onChange={valueGenderChange}
              placeholder={'Select gender'}
              width={'170px'}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Dropdown>
          </div>
          <div>
            <label>Adress</label>
            <input
              type="text"
              name="adress"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Dob</label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Phone</label>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
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
      </section>
    </section>
  );
}

export default Employees;
