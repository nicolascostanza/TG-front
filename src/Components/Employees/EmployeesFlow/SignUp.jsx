import React, { useState } from 'react';
import Sidebar from '../../Shared/Sidebar';
import styles from './signup.module.css';
// import Button from '../../Shared/Button';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationSignUp } from './validations';
import Modal from '../../Shared/Modal';
import * as thunksEmployee from '../../../redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';

function SignUp() {
  const message = useSelector((state) => state.employees.message);
  // const error = useSelector((state) => state.employees.response);
  const dispatch = useDispatch();
  const [showModalMessage, setShowModalMessage] = useState(false);
  const handleCloseMessage = () => {
    setShowModalMessage(false);
    setShowModalMessage('');
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidationSignUp)
  });
  const onSubmit = (data) => {
    console.log(data);
    dispatch(thunksEmployee.addEmployee(data));
    setShowModalMessage(true);
  };
  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage}>
        <p>{message}</p>
      </Modal>
      <section className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
          <div>
            <label>First name</label>
            <input
              type="text"
              {...register('firstName')}
              error={appendErrors.firstName?.message}
            ></input>
            {errors.firstName && <p className={styles.errorInput}>{errors.firstName?.message}</p>}
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              {...register('lastName')}
              error={appendErrors.lastName?.message}
            ></input>
            {errors.lastName && <p className={styles.errorInput}>{errors.lastName?.message}</p>}
          </div>
          <div>
            <label>Gender</label>
            <select {...register('gender')}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className={styles.errorInput}>{errors.gender?.message}</p>}
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              {...register('address')}
              error={appendErrors.address?.message}
            ></input>
            {errors.address && <p className={styles.errorInput}>{errors.address?.message}</p>}
          </div>
          <div>
            <label>Dob</label>
            <input type="date" {...register('dob')} error={appendErrors.dob?.message}></input>
            {errors.dob && <p className={styles.errorInput}>{errors.dob?.message}</p>}
          </div>
          <div>
            <label>Phone</label>
            <input type="text" {...register('phone')} error={appendErrors.phone?.message}></input>
            {errors.phone && <p className={styles.errorInput}>{errors.phone?.message}</p>}
          </div>
          <div>
            <label>Email</label>
            <input type="text" {...register('email')} error={appendErrors.email?.message}></input>
            {errors.email && <p className={styles.errorInput}>{errors.email?.message}</p>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              {...register('password')}
              error={appendErrors.password?.message}
            ></input>
            {errors.password && <p className={styles.errorInput}>{errors.password?.message}</p>}
          </div>
          <div>
            <label>Active</label>
          </div>
          <div>
            <input className={styles.checkbox} type="checkbox" {...register('active')} />
          </div>
          <div>
            <div className={styles.button}>
              <div className={styles.button}>
                <input type="submit" value="Send" />
              </div>
              <div className={styles.button}>
                <button onClick={() => reset()}>Reset</button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

export default SignUp;
