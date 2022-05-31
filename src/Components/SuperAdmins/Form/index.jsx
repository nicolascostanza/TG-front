import React from 'react';
import { useState, useEffect } from 'react';
import styles from './form.module.css';

function Form(props) {
  let initValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    active: false
  };
  const [superAdmins, setSuperAdmin] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/super-admins/${props.id}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstName(response.data.firstName);
        setlastName(response.data.lastName);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setActive(response.data.active);
      });
  }, []);
  const [firstName, setFirstName] = useState(initValues.firstName);
  const [lastName, setlastName] = useState(initValues.lastName);
  const [email, setEmail] = useState(initValues.email);
  const [password, setPassword] = useState(initValues.password);
  const [active, setActive] = useState(initValues.active);
  // funcion que resetea campos
  const resetFields = () => {
    setFirstName('');
    setlastName('');
    setEmail('');
    setPassword('');
    setActive(false);
  };
  const addSuperAdmin = async (superAdmin) => {
    if (confirm('Are you sure you want to create a Superadmin ?')) {
      const res = await fetch(`http://localhost:8080/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await res.json();
      if (res.status === 201) {
        setSuperAdmin([...superAdmins, data]);
        alert(data.message);
      } else {
        alert(data.message);
      }
    }
  };
  const editSuperAdmin = async (superAdmin) => {
    if (confirm('Are you sure you want to edit it?')) {
      const res = await fetch(`http://localhost:8080/super-admins/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await res.json();
      if (res.status === 200) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (props.method === 'POST') {
      addSuperAdmin({ firstName, lastName, email, password, active });
      resetFields();
    } else if (props.method === 'PUT') {
      editSuperAdmin({ firstName, lastName, email, password, active });
      resetFields();
    } else {
      alert('Something unexpected happened');
    }
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div>
        <label>FirstName</label>
        <input
          type="text"
          placeholder="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>LastName</label>
        <input
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Active</label>
        <input
          className={styles.check}
          type="checkbox"
          checked={active}
          value={active}
          onChange={(e) => setActive(e.currentTarget.checked)}
        />
      </div>
      <input className={styles.btn} type="submit" value={props.method === 'PUT' ? 'EDIT' : 'ADD'} />
    </form>
  );
}

export default Form;
