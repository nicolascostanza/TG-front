import React, { useState, useEffect } from 'react';
// import Form from './Form';
import style from '../AdminEdit/adminEdit.module.css';
import Modal from '../Modal/modal';
const params = new URLSearchParams(window.location.search);
const adminId = params.get('id');

const EditAdmin = () => {
  const [data, setData] = useState('');
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setActive(response.data.active);
      });
  }, []);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const resetFiles = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setActive({ active: false });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const postAdmin = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        active: active
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/admins/${adminId}`;

    fetch(url, postAdmin)
      .then((response) => response.json())
      .then((data) => setData(data));

    resetFiles();
    setShowModal(true);
  };

  return (
    <div className={style.container}>
      <Modal show={showModal} close={closeModal} message={data.message} />
      <div className={style.title}>
        <h2>Edit Admin</h2>
      </div>
      <form className={style.formContainer} onSubmit={onSubmit}>
        <div>
          <label className={style.label}>First name</label>
          <input
            className={style.input}
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label className={style.label}>Last Name</label>
          <input
            className={style.input}
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>
        <div>
          <label className={style.label}>Email</label>
          <input
            className={style.input}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label className={style.label}>Password</label>
          <input
            className={style.input}
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label className={style.label}>Active</label>
          <input
            className={style.input}
            type="checkbox"
            checked={active}
            value={active}
            onChange={(e) => setActive(e.currentTarget.checked)}
          ></input>
        </div>
        <div className={style.boxSubmit}>
          <a className={style.btnCancel} href="/admins">
            Cancel
          </a>
          <input className={style.btnSubmit} type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
};

export default EditAdmin;
