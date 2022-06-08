import React from 'react';
import styles from './employees.module.css';
import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
import Sidebar from '../Shared/Sidebar';
// import Form from '../Shared/Form';
import AddEmployee from './EmployeeForm/addEmployee';
import EditEmployee from './EditEmployee/editEmployee';

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

  useEffect(() => {
    requestList();
  }, []);
  //Request list
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
  // Delete employee
  const deleteEmployee = async (id) => {
    if (window.confirm('Do you want to delete this employee?')) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE'
      });
      res.status === 200
        ? setEmployees(employees.filter((employee) => employee._id !== id))
        : alert('Error deleting this employee');
    }
  };
  // Add employee
  const addEmployee = () => {
    setShowAdd(true);
    console.log('agregar empleado');
  };
  const closeAdd = () => {
    setShowAdd(false);
  };
  // Edit employee
  const editEmployee = (id) => {
    setShowEdit(true);
    setEmployeeIdToEdit(id);
    // console.log('a ver si llega', id);
    // console.log('employeeIdToEdit', employeeIdToEdit);
  };
  const closeEdit = () => {
    setShowEdit(false);
  };

  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
      <AddEmployee showAdd={showAdd} closeAdd={closeAdd} />
      <section>
        <div>
          <EditEmployee showEdit={showEdit} closeEdit={closeEdit} id={employeeIdToEdit} />
        </div>
        {/* <Form showModal={false} handleClose={() => {}} /> */}
        <Table
          title={'Employees'}
          headers={headers}
          data={employees}
          onEdit={editEmployee}
          onAdd={addEmployee}
          onDelete={deleteEmployee}
        />
      </section>
    </section>
  );
}

export default Employees;
