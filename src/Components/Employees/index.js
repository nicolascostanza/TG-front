import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import Table from '../Shared/Table';
import EditEmployee from './EditEmployee/editEmployee';
import AddEmployee from './EmployeeForm/addEmployee';
import styles from './employees.module.css';

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
    if (window.confirm('Do you want to delete this employee?')) {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE'
      });
      res.status === 200
        ? setEmployees(employees.filter((employee) => employee._id !== id))
        : alert('Error deleting this employee');
    }
  };
  const addEmployee = () => {
    setShowAdd(true);
    console.log('agregar empleado');
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
