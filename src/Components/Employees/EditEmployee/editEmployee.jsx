import React, { useEffect, useState } from 'react';
import Dropdown from '../../Shared/Dropdown/Dropdown';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal';
import styles from './editEmployee.module.css';

const EditEmployee = (props) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [adress, setAdress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const valueGenderChange = (e) => {
    return setGender(e.target.value);
  };
  const valueActiveChange = (e) => {
    return setActive(e.target.value);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees/${props.id}`)
      .then((response) => response.json())
      .then((response) => {
        setFirstName(response.data.firstName);
        setSurname(response.data.surname);
        setEmail(response.data.email);
        setGender(response.data.gender);
        setAdress(response.data.adress);
        setDob(response.data.dob);
        setPassword(response.data.password);
        setPhone(response.data.phone);
        setActive(response.data.active);
      });
  }, [props.id]);

  const editEmployee = async (employee) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/employees/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(employee)
    });
    const data = await res.json();
    if (res.status === 200 || res.status === 202 || res.status === 204) {
      props.closeEdit();
      setShowModal(true);
      setTitleModal(data.message);
      setFirstName('');
      setSurname('');
      setEmail('');
      setGender('');
      setAdress('');
      setDob('');
      setPassword('');
      setPhone('');
      setActive(false);
    } else if (res.status === 400) {
      setShowModal(true);
      setTitleModal(data.message);
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
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <Form
        title="Edit Employee"
        handleSubmit={onSubmit}
        handleClose={props.closeEdit}
        showModal={props.showEdit}
      >
        <div className={styles.form}>
          <div>
            <label>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Surname</label>
            <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)}></input>
          </div>
          <div>
            <label>Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div>
            <label>Gender</label>
            <Dropdown
              value={gender}
              onChange={valueGenderChange}
              placeholder={'Select gender'}
              width={'170px'}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Dropdown>
          </div>
          <div>
            <label>Address</label>
            <input type="text" value={adress} onChange={(e) => setAdress(e.target.value)}></input>
          </div>
          <div>
            <label>Dob</label>
            <input
              type="text"
              placeholder="yyyy-mm-dd"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Phone</label>
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
          </div>
          <div>
            <label>Active</label>
            <Dropdown
              value={active}
              onChange={valueActiveChange}
              placeholder={'Select status'}
              width={'170px'}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </Dropdown>
          </div>
        </div>
      </Form>
      <Modal handleClose={handleCloseModal} showModal={showModal}>
        <h2>{titleModal}</h2>
      </Modal>
    </div>
  );
};

export default EditEmployee;
