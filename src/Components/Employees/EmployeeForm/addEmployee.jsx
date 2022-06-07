import React, { useState } from 'react';
import styles from './addEmployee.module.css';
import Dropdown from '../../Shared/Dropdown/Dropdown';
import Form from '../../Shared/Form';

const AddEmployee = (props) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [adress, setAdress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const createEmployee = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        surname,
        email,
        gender,
        adress,
        dob,
        password,
        phone,
        active
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/employees`;

    fetch(url, createEmployee)
      .then((response) => response.json())
      .then((data) => alert(data.message));
  };

  const valueChange = (e) => {
    console.log('e', e.target.value);
    return setGender(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Form
        title="Create New Employee"
        handleSubmit={onSubmit}
        handleClose={props.closeAdd}
        showModal={props.showAdd}
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
        {/* <div>
          <label>Gender</label>
          <select type="text" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div> */}
        <div>
          <Dropdown
            title="Gender"
            value={gender}
            onChange={valueChange}
            placeholder={'Select gender'}
            // width={'100px'}
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
          <label>Active</label>
          <input name="active" value={active} onChange={(e) => setActive(e.target.value)}></input>
        </div>
        {/* <div className={styles.submit}>
          <input type="submit" value="Submit" onSubmit={onSubmit}></input>
        </div> */}
      </Form>
      {/* <div className={styles.submit}>
        <button>Cancel</button>
      </div> */}
    </div>
  );
};

export default AddEmployee;
