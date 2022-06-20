import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './profile.module.css';

function Profile() {
  const param = useParams();
  const initValues = {
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    adress: '',
    dob: '',
    active: false,
    phone: ''
  };
  const [update, setUpdate] = useState(true);
  const [employee, setEmployee] = useState(initValues);

  useEffect(() => {
    requestById();
  }, []);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };
  const requestById = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${param.id}`);
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Welcome {employee.firstName}</h1>
      <button className={styles.edit} onClick={() => setUpdate(!update)}>
        EDIT
      </button>
      <form className={styles.form}>
        <div>
          <label className={styles.label}>Name</label>
          {update ? (
            <p>{employee.firstName}</p>
          ) : (
            <input
              type="text"
              name="firstName"
              disabled={update}
              value={employee.firstName}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
        <div>
          <label className={styles.label}>Last Name</label>
          {update ? (
            <p>{employee.lastName}</p>
          ) : (
            <input
              type="text"
              name="email"
              disabled={update}
              value={employee.lastName}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
        <div>
          <label className={styles.label}>Email</label>
          {update ? (
            <p>{employee.email}</p>
          ) : (
            <input
              type="text"
              name="email"
              disabled={update}
              value={employee.email}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
        <div>
          <label className={styles.label}>Password</label>
          {update ? (
            <p>{employee.password}</p>
          ) : (
            <input
              type="text"
              name="password"
              disabled={update}
              value={employee.password}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
        <div>
          <label className={styles.label}>Gender</label>
          {update ? (
            <p>{employee.gender}</p>
          ) : (
            <select>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          )}
        </div>
        <div>
          <label className={styles.label}>Address</label>
          {update ? (
            <p>{employee.adress}</p>
          ) : (
            <input
              type="text"
              name="address"
              disabled={update}
              value={employee.adress}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
        <div>
          <label className={styles.label}>Phone</label>
          {update ? (
            <p>{employee.phone}</p>
          ) : (
            <input
              type="text"
              name="phone"
              disabled={update}
              value={employee.phone}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
        <div>
          <label className={styles.label}>Date Of Birth</label>
          {update ? (
            ''
          ) : (
            // <p>{new Date(employee.dob).toISOString().split('T')[0]}</p>
            <input
              type="date"
              name="date"
              disabled={update}
              value={employee.dob}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
        <div>
          <label className={styles.label}>Active</label>
          {update ? (
            <p>{employee.active ? 'true' : 'false'}</p>
          ) : (
            <input
              type="checkbox"
              name="active"
              disabled={update}
              value={employee.active}
              onChange={handleInputChanges}
            ></input>
          )}
        </div>
      </form>
    </>
  );
}

export default Profile;
