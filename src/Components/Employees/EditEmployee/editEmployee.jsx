import React, { useEffect, useState } from 'react';
import styles from './editEmployee.module.css';

const EditEmployee = () => {
  // const [employee, setEditEmployee] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/employees/62952b91082ec02879a7f188')
      .then((response) => response.json())
      .then((response) => {
        // setEditEmployee(response.data);
        setFirstName(response.data.firstName);
        setSurname(response.data.firstName);
        setEmail(response.data.email);
        setGender(response.data.gender);
        setAdress(response.data.adress);
        setDob(response.data.dob);
        setPassword(response.data.password);
        setPhone(response.data.phone);
        setActive(response.data.active);
        console.log(response.data);
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
    const res = await fetch('http://localhost:8080/employees/62952b91082ec02879a7f188', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(employee)
    });
    const data = await res.json();
    console.log('Data: esteeee' + data);
    if (res.status === 200 || res.status === 201 || res.status === 204) {
      console.log('Data:', data);
      alert('Employee updated');
    } else if (res.status === 400) {
      alert(data.msg);
      console.log('Data:', data);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('firstname', firstName);

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
    // <div className={styles.container}>
    <form className={styles.container} onSubmit={onSubmit}>
      <div>
        <h2>Edit Employee</h2>
      </div>
      <div>
        <label>First name</label>
        <input
          type="text"
          // name="firstName"
          value={firstName}
          placeholder={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Surname</label>
        <input
          type="text"
          // name="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          // name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Gender</label>
        <input
          type="text"
          // name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Adress</label>
        <input
          type="text"
          // name="adress"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Dob</label>
        <input
          type="text"
          // name="dob"
          placeholder="yyy-mm-dd"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          // name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Phone</label>
        <input
          type="number"
          // name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Active</label>
        <input
          type="boolean"
          // name="active"
          value={active ? 'active' : 'innactive'}
          onChange={(e) => setActive({ Boolean: e.target.value })}
        ></input>
      </div>
      <div>
        <input type="submit" value="Submit" onSubmit={onSubmit}></input>
      </div>
    </form>
    // </div>
  );
};

export default EditEmployee;
