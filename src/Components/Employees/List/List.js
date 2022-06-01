import { useEffect, useState } from 'react';
import React from 'react';
import styles from './list.module.css';
import Row from '../Row/Row';

const List = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/employees')
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });
  }, []);
  // const response = response.data;

  // Delete employee
  const deleteEmployee = async (id) => {
    // console.log('id que le llega a la funcion', id);
    if (window.confirm('Do you want to delete this employee?')) {
      const res = await fetch(`http://localhost:8080/employees/${id}`, {
        method: 'DELETE'
      });
      res.status === 200
        ? setEmployees(employees.filter((employee) => employee._id !== id))
        : alert('Error deleting this employee');
    }
  };

  const editForm = (id) => {
    window.location = `/employees/editEmployee/${id}`;
  };

  // const EditEmployee = async (id) => {
  //   console.log('employee must be edited: ', id);
  // };

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Full name</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Active</th>
            <th>Created at</th>
            <th>Updated at</th>
            {/* <th>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <Row
              key={employee._id}
              id={employee._id}
              email={employee.email}
              password={employee.password}
              fullName={`${employee.firstName} ${employee.surname}`}
              dob={employee.dob}
              phone={employee.phone}
              gender={employee.gender}
              address={employee.adress}
              active={employee.active}
              createdAt={employee.createdAt}
              updatedAt={employee.updatedAt}
              onDelete={deleteEmployee}
              employee={employee}
              onEdit={editForm}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default List;
