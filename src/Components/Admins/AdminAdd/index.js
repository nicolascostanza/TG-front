import React, { useState } from 'react';
import styles from './add.module.css';

const AddAdmin = () => {
  const [adminInput, setInput] = useState({});
  const onChange = (e) => {
    setInput({ ...adminInput, [e.target.name]: e.target.value });
    console.log(
      JSON.stringify({
        first_name: adminInput.firstName,
        lastName: adminInput.Lastame,
        email: adminInput.email,
        password: adminInput.password,
        active: adminInput.active
      })
    );
  };

  const onSubmit = (e) => {
    console.log(adminInput);
    e.preventDefault();
    const postaAdmin = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: adminInput.firstName,
        lastName: adminInput.lastName,
        email: adminInput.email,
        password: adminInput.password,
        active: adminInput.active
      })
    };
    const url = `http://localhost:4000/admins`;

    fetch(url, postaAdmin)
      .then((response) => response.json())
      .then((data) => console.log('data:', data));

    setInput({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: ''
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <h2>Add new admin</h2>
      </div>
      <form onSubmit={onSubmit} className={styles.formContainer}>
        <div>
          <label>First name</label>
          <input type="text" name="firstName" value={adminInput.fir} onChange={onChange}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={adminInput.lastName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={adminInput.email} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={adminInput.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <input type="text" name="active" value={adminInput.active} onChange={onChange}></input>
        </div>
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
};
export default AddAdmin;
