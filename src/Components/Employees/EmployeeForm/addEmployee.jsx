import React, { useState } from 'react';
import styles from './addEmployee.module.css';

const AddEmployee = () => {
  const [employeeInput, setEmployeeInput] = useState({
    firstName: '',
    surname: '',
    email: '',
    gender: '',
    adress: '',
    dob: '',
    password: '',
    phone: '',
    active: ''
  });
  const onChange = (e) => {
    setEmployeeInput({ ...employeeInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEmployeeInput({
      firstName: '',
      surname: '',
      email: '',
      gender: '',
      adress: '',
      dob: '',
      password: '',
      phone: '',
      active: ''
    });
    const postEmployee = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        first_name: employeeInput.firstName,
        surname: employeeInput.surname,
        email: employeeInput.email,
        gender: employeeInput.gender,
        adress: employeeInput.adress,
        dob: employeeInput.dob,
        password: employeeInput.password,
        phone: employeeInput.phone,
        active: employeeInput.active
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/employees`;

    fetch(url, postEmployee)
      .then((response) => response.json())
      .then((data) => console.log('data:', data));
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Add new Employee</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={employeeInput.firstName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Surname</label>
          <input
            type="text"
            name="lastName"
            value={employeeInput.surname}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input type="number" name="email" value={employeeInput.email} onChange={onChange}></input>
        </div>
        <div>
          <label>Gender</label>
          <input type="text" name="gender" value={employeeInput.gender} onChange={onChange}></input>
        </div>
        <div>
          <label>Adress</label>
          <input type="text" name="adress" value={employeeInput.adress} onChange={onChange}></input>
        </div>
        <div>
          <label>Dob</label>
          <input type="text" name="dob" value={employeeInput.dob} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={employeeInput.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Phone</label>
          <input type="number" name="phone" value={employeeInput.phone} onChange={onChange}></input>
        </div>
        <div>
          <label>Active</label>
          <input type="text" name="active" value={employeeInput.active} onChange={onChange}></input>
        </div>
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
