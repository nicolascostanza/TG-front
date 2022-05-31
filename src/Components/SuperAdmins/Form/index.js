import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../super-admins.module.css';

function Form(props) {
  console.log(props.method);
  console.log(props.id);
  const [superAdmins, setSuperAdmin] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_LOCALHOST_URL)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdmin(response.data);
      });
  }, []);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  if (props.method === 'POST') {
    console.log('Hola Mundo');
  }
  const addSuperAdmin = async (superAdmin) => {
    const res = await fetch(`http://localhost:8080/super-admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(superAdmin)
    });
    const data = await res.json();
    setSuperAdmin([...superAdmins, data]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !active || !email || !password) {
      alert('complete todos los campos');
      return;
    }
    addSuperAdmin({ firstName, lastName, email, password, active });
    setFirstName('');
    setlastName('');
    setEmail('');
    setPassword('');
    setActive(false);
  };
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div>
        <label>FirstName</label>
        <input
          type="text"
          placeholder="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>LastName</label>
        <input
          type="text"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Active</label>
        <input
          type="checkbox"
          checked={active}
          value={active}
          onChange={(e) => setActive(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="SaveSuperAdmin" />
    </form>
  );
}

export default Form;
