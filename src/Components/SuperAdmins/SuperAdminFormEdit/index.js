import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../super-admins.module.css';

function SuperAdminFormEdit(props) {
  console.log(props);
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
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const addSuperAdmin = (superAdmin) => {
    setSuperAdmin([...superAdmins, superAdmin]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !active || !email || !password) {
      alert('complete todos los campos');
      return;
    }
    addSuperAdmin(firstName, lastName, active, email, password);
    setFirstName('');
    setlastName('');
    setActive(false);
    setEmail('');
    setPassword('');
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
        <label>Active</label>
        <input
          type="checkbox"
          checked={active}
          value={active}
          onChange={(e) => setActive(e.currentTarget.checked)}
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
      <input type="submit" value="SaveSuperAdmin" />
    </form>
  );
}

export default SuperAdminFormEdit;
