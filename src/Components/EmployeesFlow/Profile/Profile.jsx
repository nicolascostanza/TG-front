import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as thunksEmployee from 'redux/employees/thunks';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationUpdate } from 'Components/EmployeesFlow/validations';
import styles from './profile.module.css';
import Modal from 'Components/Shared/Modal';
import Sidebar from 'Components/Shared/Sidebar';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const message = useSelector((state) => state.employees.message);
  const response = useSelector((state) => state.employees.error);
  const { _id, firstName, lastName, email, password, gender, address, phone, dob, active } =
    currentUser;
  useEffect(() => {
    reset({
      firstName,
      lastName,
      email,
      password,
      gender,
      address,
      phone,
      dob: new Date(dob).toISOString().split('T')[0],
      active
    });
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: { firstName, lastName, email, password, gender, address, phone, dob, active },
    resolver: joiResolver(employeeValidationUpdate)
  });
  const UpdateEmployee = (data) => {
    const employee = { ...data, _id };
    dispatch(thunksEmployee.editEmployee(employee));
    if (!response) {
      setUpdate(!update);
    }
    setShowModalMessage(true);
  };
  const handleCloseMessage = () => {
    setShowModalMessage(false);
    setShowModalMessage('');
  };
  return (
    <>
      <Sidebar />
      <h1>Welcome {firstName}</h1>
      <div className={styles.divButton}>
        <button
          className={update ? styles.greenButton : styles.redButton}
          onClick={(e) => {
            e.preventDefault();
            setUpdate(!update);
          }}
        >
          {update ? 'EDIT' : 'CANCEL'}
        </button>
        <button
          className={styles.goHome}
          onClick={() => history.push('/employees/home/629d83d3d9d731ead71b218c')}
        >
          GO HOME
        </button>
      </div>
      <Modal
        modalTitle={response ? 'WARNING' : 'SUCCESS'}
        showModal={showModalMessage}
        handleClose={handleCloseMessage}
      >
        <p>{message}</p>
      </Modal>
      <form className={styles.form} onSubmit={handleSubmit(UpdateEmployee)}>
        <div className={styles.row}>
          <label htmlFor="First name" className={styles.label}>
            First Name
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{firstName}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="text"
                  name="firstName"
                  {...register('firstName')}
                  disabled={update}
                  placeholder={firstName}
                  error={appendErrors.firstName?.message}
                ></input>
                {errors.firstName && (
                  <p className={styles.errorInput}>{errors.firstName?.message}</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Last name" className={styles.label}>
            Last Name
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{lastName}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="text"
                  name="lastName"
                  {...register('lastName')}
                  disabled={update}
                  placeholder={lastName}
                  error={appendErrors.firstName?.message}
                ></input>
                {errors.lastName && <p className={styles.errorInput}>{errors.lastName?.message}</p>}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Gender" className={styles.label}>
            Gender
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{gender}</p>
            ) : (
              <>
                <select className={styles.inputsProfile} {...register('gender')}>
                  <option className={styles.optionsInput} value="Male">
                    Male
                  </option>
                  <option className={styles.optionsInput} value="Female">
                    Female
                  </option>
                  <option className={styles.optionsInput} value="Other">
                    Other
                  </option>
                </select>
                {errors.gender && <p className={styles.errorInput}>{errors.gender?.message}</p>}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Address" className={styles.label}>
            Address
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{address}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="text"
                  name="address"
                  {...register('address')}
                  disabled={update}
                  placeholder={address}
                  error={appendErrors.address?.message}
                ></input>
                {errors.address && <p className={styles.errorInput}>{errors.address?.message}</p>}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Phone" className={styles.label}>
            Phone
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{phone}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="number"
                  name="phone"
                  {...register('phone')}
                  disabled={update}
                  placeholder={phone}
                  error={appendErrors.phone?.message}
                ></input>
                {errors.phone && <p className={styles.errorInput}>{errors.phone?.message}</p>}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Date of Birth" className={styles.label}>
            Date of Birth
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{new Date(dob).toISOString().split('T')[0]}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="date"
                  name="dob"
                  {...register('dob')}
                  disabled={update}
                  placeholder={dob}
                  error={appendErrors.dob?.message}
                ></input>
                {errors.dob && <p className={styles.errorInput}>{errors.dob?.message}</p>}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Email" className={styles.label}>
            Email
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{email}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="email"
                  name="email"
                  {...register('email')}
                  disabled={update}
                  placeholder={email}
                  error={appendErrors.firstName?.message}
                ></input>
                {errors.email && <p className={styles.errorInput}>{errors.email?.message}</p>}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Password" className={styles.label}>
            Password
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>**************</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="password"
                  name="password"
                  {...register('password')}
                  disabled={update}
                  placeholder={password}
                  error={appendErrors.firstName?.message}
                ></input>
                {errors.password && <p className={styles.errorInput}>{errors.password?.message}</p>}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Active" className={styles.label}>
            Status
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{active ? 'Active' : 'Inactive'}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="checkbox"
                  name="active"
                  {...register('active')}
                  disabled={update}
                  placeholder={active}
                  error={appendErrors.active?.message}
                ></input>
                {errors.active && <p className={styles.errorInput}>{errors.dob?.message}</p>}
              </>
            )}
          </div>
        </div>
        {update ? null : (
          <button className={styles.buttonSubmit} type="submit" value="submit">
            UPDATE
          </button>
        )}
      </form>
    </>
  );
}

export default Profile;
