import React, { useState } from 'react';
import style from '../AdminAdd/add.module.css';
import Modal from '../Modal/modal';

const AddAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState();

  const closeModal = () => {
    setShowModal(false);
  };

  const resetFiles = () => {
    setFirstName({ firstName: '' });
    setFirstName({ lastName: '' });
    setFirstName({ email: '' });
    setFirstName({ password: '' });
    setFirstName({ active: false });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const postaAdmin = {
      method: 'POST',
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
    const url = `${process.env.REACT_APP_API_URL}/admins`;
    fetch(url, postaAdmin)
      .then((response) => response.json())
      .then((data) => setData(data));
    resetFiles();
    setShowModal(true);
  };
  return (
    <div className={style.container}>
      <Modal show={showModal} close={closeModal} message={data.message} />
      <div className={style.title}>
        <h2>Add new admin</h2>
      </div>
      <form onSubmit={onSubmit} className={style.formContainer}>
        <div>
          <label className={style.label}>First name</label>
          <input
            className={style.input}
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
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
            required
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
            required
          ></input>
        </div>
        <div>
          <label className={style.label}>Password</label>
          <input
            className={style.input}
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            required
          ></input>
        </div>
        <div>
          <input className={style.btnSubmit} type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
};
export default AddAdmin;
