import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import AddEmployee from './EmployeeForm/addEmployee';

function Employees() {
  const [employees, saveEmployees] = useState([]);

  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${url}/employees`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <AddEmployee employees={employees} saveEmployees={saveEmployees} />
      <div>
        {employees.map((employee) => {
          // eslint-disable-next-line prettier/prettier
          return (
            <div key={employee._id}>
              {employee.first_name} {employee.last_name}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Employees;
/* const addEmployee = () => {
    _id: Math.floor(Math.random() * 1000),
    firstName,
    surname,
    email,
    gender,
    adress,
    dob,
    password,
    phone,
    active
  };
  saveEmployees([...employees, addEmployee]);
  return (
    <section className={styles.container}>
      <a href="/employees/AddEmployee">
        <button type="button">Create new employee</button>
      </a>
    </section>
  ); */
