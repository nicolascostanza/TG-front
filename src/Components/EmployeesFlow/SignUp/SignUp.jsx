import React, { useState } from 'react';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationSignUp } from 'Components/EmployeesFlow/validations';
import * as thunksEmployee from 'redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './signup.module.css';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const history = useHistory();
  const message = useSelector((state) => state.employees.message);
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
    dispatch(thunksEmployee.addEmployee({ ...data, active: true }));
    setShowModalMessage(true);
  };
  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage}>
        <div className={styles.modal}>
          <p>{message}</p>
          <button
            onClick={() => history.push('/employees/profile/629d83d3d9d731ead71b218c')}
            className={styles.buttonOk}
            value="OK"
          >
            OK
          </button>
        </div>
      </Modal>
      <section className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.tittle}>REGISTER</h1>
          <div className={styles.formFlex}>
            <div className={styles.inputContainer}>
              <label htmlFor="First name" className={styles.labels}>
                First name
              </label>
              <input
                type="text"
                {...register('firstName')}
                error={appendErrors.firstName?.message}
              ></input>
              {errors.firstName && <p className={styles.errorInput}>{errors.firstName?.message}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="Last name" className={styles.labels}>
                Last Name
              </label>
              <input
                type="text"
                {...register('lastName')}
                error={appendErrors.lastName?.message}
              ></input>
              {errors.lastName && <p className={styles.errorInput}>{errors.lastName?.message}</p>}
            </div>
          </div>
          <div className={styles.formFlex}>
            <div className={styles.inputContainer}>
              <label htmlFor="Gender" className={styles.labels}>
                Gender
              </label>
              <select {...register('gender')}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className={styles.errorInput}>{errors.gender?.message}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="Address" className={styles.labels}>
                Address
              </label>
              <input
                type="text"
                {...register('address')}
                error={appendErrors.address?.message}
              ></input>
              {errors.address && <p className={styles.errorInput}>{errors.address?.message}</p>}
            </div>
          </div>
          <div className={styles.formFlex}>
            <div className={styles.inputContainer}>
              <label htmlFor="Date of birth" className={styles.labels}>
                Date of Birth
              </label>
              <input type="date" {...register('dob')} error={appendErrors.dob?.message}></input>
              {errors.dob && <p className={styles.errorInput}>{errors.dob?.message}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="Phone" className={styles.labels}>
                Phone
              </label>
              <input type="text" {...register('phone')} error={appendErrors.phone?.message}></input>
              {errors.phone && <p className={styles.errorInput}>{errors.phone?.message}</p>}
            </div>
          </div>
          <div className={styles.formFlex}>
            <div className={styles.inputContainer}>
              <label htmlFor="Email" className={styles.labels}>
                Email
              </label>
              <input type="text" {...register('email')} error={appendErrors.email?.message}></input>
              {errors.email && <p className={styles.errorInput}>{errors.email?.message}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="Password" className={styles.labels}>
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                error={appendErrors.password?.message}
              ></input>
              {errors.password && <p className={styles.errorInput}>{errors.password?.message}</p>}
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.buttonReset} onClick={() => reset()}>
              RESET
            </button>
            <button className={styles.buttonContinue} type="submit" value="CONTINUE">
              CONTINUE
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default SignUp;
