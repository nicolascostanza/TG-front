import { useEffect, useState } from 'react';
import EditEmployee from './EditEmployee/editEmployee';
import styles from './employees.module.css';

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
      <div>
        <a href="http://localhost:3000/employees/editEmployee">
          <button onClick={EditEmployee}>Edit employee</button>
        </a>
        {employees.map((employee) => {
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
