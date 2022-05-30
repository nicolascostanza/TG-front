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
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default List;
