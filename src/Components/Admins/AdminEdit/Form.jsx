import React, { useState } from 'react';
import style from '../AdminEdit/adminEdit.module.css';
import Modal from '../Modal/modal';

const Form = (props) => {
  let [adminInput, setInput] = useState({});
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
    window.location.href = 'http://localhost:3000/admins';
  };
  const onSubmit = (e) => {
    console.log(adminInput);
    e.preventDefault();
    const postaAdmin = {
      method: 'PUT',
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
    const url = `http://localhost:4000/admins/${props.admin._id}`;

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
  console.log(props);

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
            value={adminInput.firstName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label className={style.label}>Last Name</label>
          <input
            className={style.input}
            type="text"
            name="lastName"
            placeholder={props.admin.lastName}
            value={adminInput.lastName}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label className={style.label}>Email</label>
          <input
            className={style.input}
            type="email"
            name="email"
            placeholder={props.admin.email}
            value={adminInput.email}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label className={style.label}>Password</label>
          <input
            className={style.input}
            type="password"
            name="password"
            placeholder={props.admin.password}
            value={adminInput.password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <label className={style.label}>Active</label>
          <input
            className={style.input}
            type="text"
            name="active"
            placeholder={props.admin.active ? 'true' : 'false'}
            value={adminInput.active}
            onChange={onChange}
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
