import React from 'react';
import styles from './employees.module.css';
import { useState, useEffect } from 'react';
import Table from '../Shared/Table';
import Sidebar from '../Shared/Sidebar';
import Form from '../Shared/Form';
import AddEmployee from './EmployeeForm/addEmployee';

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
  const [employees, setEmployees] = useState([]);
  // const [id, setId] = useState('');

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

  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
      <AddEmployee showAdd={showAdd} closeAdd={closeAdd} />
      <section>
        <Form showModal={false} handleClose={() => {}} />
        <Table
          title={'Employees'}
          headers={headers}
          data={employees}
          onEdit={() => {}}
          onAdd={addEmployee}
          onDelete={deleteEmployee}
        />
      </section>
    </section>
  );
}

export default Employees;
