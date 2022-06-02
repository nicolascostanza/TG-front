import React, { useState } from 'react';
import style from '../AdminAdd/add.module.css';
import Modal from '../Modal/modal';

const AddAdmin = () => {
  const [adminInput, setInput] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState('');
  const onChange = (e) => {
    setInput({ ...adminInput, [e.target.name]: e.target.value });
    console.log(
      JSON.stringify({
        first_name: adminInput.firstName,
        lastName: adminInput.Lastame,
        email: adminInput.email,
        password: adminInput.password,
        active: adminInput.active
      })
    );
  };
  const closeModal = () => {
    setShowModal(false);
    window.location.href = '/admins';
  };

  const onSubmit = (e) => {
    console.log(adminInput);
    e.preventDefault();
    const postaAdmin = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstName: adminInput.firstName,
        lastName: adminInput.lastName,
        email: adminInput.email,
        password: adminInput.password,
        active: adminInput.active
      })
    };
    const url = `${process.env.REACT_APP_API_URL}/admins`;
    fetch(url, postaAdmin)
      .then((response) => response.json())
      .then((data) => setData(data));
    setInput({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: ''
    });
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
            value={adminInput.fir}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label className={style.label}>Last Name</label>
          <input
            className={style.input}
            type="text"
            name="lastName"
            value={adminInput.lastName}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label className={style.label}>Email</label>
          <input
            className={style.input}
            type="email"
            name="email"
            value={adminInput.email}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label className={style.label}>Password</label>
          <input
            className={style.input}
            type="password"
            name="password"
            value={adminInput.password}
            onChange={onChange}
            required
          ></input>
        </div>
        <div>
          <label className={style.label}>Active</label>
          <input
            className={style.input}
            type="text"
            name="active"
            value={adminInput.active}
            onChange={onChange}
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
