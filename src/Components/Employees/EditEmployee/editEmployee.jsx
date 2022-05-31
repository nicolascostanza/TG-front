import React, { useEffect, useState } from 'react';
import styles from './editEmployee.module.css';

const EditEmployee = () => {
  const [employee, setEditEmployee] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/employees/62964136a0cad431beaaf83f')
      .then((response) => response.json())
      .then((response) => {
        setEditEmployee(response.data);
        console.log(employee);
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
  const [active, setActive] = useState('');

  const editEmployee = async (employee) => {
    const res = await fetch('http://localhost:8080/employees/62964136a0cad431beaaf83f', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(employee)
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
      console.log('Data:', data);
      alert('Employee updated');
    } else if (res.status === 400) {
      alert('The employee could not be updated');
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
    console.log(firstName.firstName);

    setFirstName('');
    setSurname('');
    setEmail('');
    setGender('');
    setDob('');
    setPassword('');
    setPhone('');
    setActive('');
  };
  return (
    <div className={styles.container}>
      <div>
        <h2>Edit Employee</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            placeholder={employee.firstName}
            onChange={(e) => setFirstName({ text: e.target.value })}
          ></input>
        </div>
        <div>
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            placeholder={employee.surname}
            onChange={(e) => setSurname({ text: e.target.value })}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder={employee.email}
            onChange={(e) => setEmail({ text: e.target.value })}
          ></input>
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            placeholder={employee.gender}
            onChange={(e) => setGender({ text: e.target.value })}
          ></input>
        </div>
        <div>
          <label>Adress</label>
          <input
            type="text"
            name="adress"
            placeholder={employee.adress}
            onChange={(e) => setAdress({ text: e.target.value })}
          ></input>
        </div>
        <div>
          <label>Dob</label>
          <input
            type="date"
            name="dob"
            placeholder={employee.dob}
            onChange={(e) => setDob({ text: e.target.value })}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder={employee.password}
            onChange={(e) => setPassword({ text: e.target.value })}
          ></input>
        </div>
        <div>
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            placeholder={employee.phone}
            onChange={(e) => setPhone({ text: e.target.value })}
          ></input>
        </div>
        <div>
          <label>Active</label>
          <input
            type="boolean"
            name="active"
            placeholder={employee.active}
            onChange={(e) => setActive({ Boolean: e.target.value })}
          ></input>
        </div>
        <div>
          <input type="submit" value="Submit" onSubmit={onSubmit}></input>
        </div>
      </form>
    </div>
  );
};

/* const EditEmployee = () => {
  const [editInputEmployee, setEditEmployee] = useState({
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
    setEditEmployee({ ...editInputEmployee, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEditEmployee({
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

    const editEmployee = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: editInputEmployee.firstName,
        surname: editInputEmployee.surname,
        email: editInputEmployee.email,
        gender: editInputEmployee.gender,
        adress: editInputEmployee.adress,
        dob: editInputEmployee.dob,
        password: editInputEmployee.password,
        phone: editInputEmployee.phone,
        active: editInputEmployee.active
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/employees`;
    console.log(url);

    fetch(url, editEmployee)
      .then((response) => response.json())
      .then((data) => alert(data.msg));
  };
  return (
    <div className={styles.container}>
      <div>
        <h2>Edit Employee</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={editInputEmployee.firstName}
            onChange={onChange}
            placeholder="Change name"
          ></input>
        </div>
        <div>
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            value={editInputEmployee.surname}
            onChange={onChange}
            placeholder="Change surname"
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={editInputEmployee.email}
            onChange={onChange}
            placeholder="Change email"
          ></input>
        </div>
        <div>
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={editInputEmployee.gender}
            onChange={onChange}
            placeholder="Change gender"
          ></input>
        </div>
        <div>
          <label>Adress</label>
          <input
            type="text"
            name="adress"
            value={editInputEmployee.adress}
            onChange={onChange}
            placeholder="Change adress"
          ></input>
        </div>
        <div>
          <label>Dob</label>
          <input
            type="date"
            name="dob"
            value={editInputEmployee.dob}
            onChange={onChange}
            placeholder="Change date"
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={editInputEmployee.password}
            onChange={onChange}
            placeholder="Change password"
          ></input>
        </div>
        <div>
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            value={editInputEmployee.phone}
            onChange={onChange}
            placeholder="Change phone"
          ></input>
        </div>
        <div>
          <label>Active</label>
          <input
            type="text"
            name="active"
            value={editInputEmployee.active}
            onChange={onChange}
            placeholder="Change status"
          ></input>
        </div>
        <div>
          <input type="submit" value="Submit" onSubmit={onSubmit}></input>
        </div>
      </form>
    </div>
  );
}; */

export default EditEmployee;
