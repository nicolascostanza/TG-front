import React, { useState } from 'react';
import style from '../AdminEdit/adminEdit.module.css';
import Modal from '../Modal/modal';

const Form = (props) => {
  const [data, setData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };
  const resetFiles = () => {
    setFirstName({ firstName: '' });
    setLastName({ lastName: '' });
    setEmail({ email: '' });
    setPassword({ password: '' });
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
    const url = `${process.env.REACT_APP_API_URL}/admins/${props.admin._id}`;

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
            placeholder={props.admin.firstName}
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
            placeholder={props.admin.lastName}
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
            placeholder={props.admin.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label className={style.label}>Password</label>
          <input
            className={style.input}
            type="password"
            name="password"
            placeholder={props.admin.password}
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
        <div>
          <input className={style.btnSubmit} type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
};
export default Form;
