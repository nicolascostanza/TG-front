import React, { useEffect, useState } from 'react';
import styles from './editEmployee.module.css';

const params = window.location.search;
const employeeId = params.substring(4);

const EditEmployee = () => {
  useEffect(() => {
    fetch(`http://localhost:8080/employees/${employeeId}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstName(response.data.firstName);
        setSurname(response.data.surname);
        setEmail(response.data.email);
        setGender(response.data.gender);
        setAdress(response.data.adress);
        setDob(response.data.dob);
        setPassword(response.data.password);
        setPhone(response.data.phone);
        setActive(response.data.active);
      });
  }, []);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [adress, setAdress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState(false);

  const editEmployee = async (employee) => {
    const res = await fetch(`http://localhost:8080/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(employee)
    });
    const data = await res.json();
    if (res.status === 200 || res.status === 202 || res.status === 204) {
      return alert(data.message);
    } else if (res.status === 400) {
      return alert(data.msg);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    editEmployee({
      firstName,
      surname,
      email,
      gender,
      adress,
      dob,
      password,
      phone,
      active
    });

    setFirstName('');
    setSurname('');
    setEmail('');
    setGender('');
    setDob('');
    setPassword('');
    setPhone('');
    setActive(false);
  };
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div>
        <h2>Edit Employee</h2>
      </div>
      <div className={styles.form}>
        <div>
          <label>First name</label>
          <input
            type="text"
            value={firstName}
            placeholder={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Surname</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}></input>
        </div>
        <div>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label>Gender</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)}></input>
        </div>
        <div>
          <label>Adress</label>
          <input type="text" value={adress} onChange={(e) => setAdress(e.target.value)}></input>
        </div>
        <div>
          <label>Dob</label>
          <input
            type="text"
            placeholder="yyy-mm-dd"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Phone</label>
          <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
        </div>
        <div>
          <label>Active</label>
          <input
            type="boolean"
            value={active ? 'active' : 'innactive'}
            onChange={(e) => setActive({ Boolean: e.target.value })}
          ></input>
        </div>
        <div className={styles.submit}>
          <input type="submit" value="Submit" onSubmit={onSubmit}></input>
        </div>
      </div>
    </form>
  );
};

export default EditEmployee;
