import React from 'react';
import { useState } from 'react';
import Sidebar from '../../Shared/Sidebar';
import styles from './signup.module.css';
import Button from '../../Shared/Button/Button';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [adress, setAdress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState('');

  const valueGenderChange = (e) => {
    return setGender(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('on submit');
  };

  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <h1>Sign Up</h1>
          <div>
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Gender</label>
            <select value={gender} onChange={valueGenderChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              name="adress"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Dob</label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Phone</label>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div>
            <div>
              <label>Active</label>
            </div>
            <div>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={active}
                value={active}
                onChange={(e) => setActive(e.currentTarget.checked)}
              />
            </div>
            <div className={styles.button}>
              <Button onClick={''} width={'100px'} height={'35px'} fontSize={'15px'}>
                send
              </Button>
            </div>
            {/* <div className={styles.button}>
              <input type="submit" value="Send" />
            </div> */}
          </div>
        </form>
      </section>
    </section>
  );
}

export default SignUp;
