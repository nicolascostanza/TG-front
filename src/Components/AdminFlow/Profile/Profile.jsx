import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as thunksAdmins from 'redux/admins/thunks';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from 'Components/AdminFlow/validations';
import styles from './profile.module.css';
import Modal from 'Components/Shared/Modal';
import Sidebar from 'Components/Shared/Sidebar';

function Profile() {
  const param = useParams();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const admins = useSelector((state) => state.admins.list);
  const adminSelected = admins.filter((admin) => admin._id === param.id);
  const message = useSelector((state) => state.admins.message);
  const response = useSelector((state) => state.admins.error);
  useEffect(() => {
    dispatch(thunksAdmins.getAdmins());
    fetch(`${process.env.REACT_APP_API_URL}/admins/${param.id}`)
      .then((response) => response.json())
      .then((data) => {
        const { firstName, lastName, email, password, active } = data.data;
        reset({
          firstName,
          lastName,
          email,
          password,
          active
        });
      });
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  const UpdateAdmin = (data) => {
    dispatch(thunksAdmins.updateAdmin(data, param.id));
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
      <h1>Welcome {adminSelected[0]?.firstName}</h1>
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
      </div>
      <Modal
        modalTitle={response ? 'WARNING' : 'SUCCESS'}
        showModal={showModalMessage}
        handleClose={handleCloseMessage}
      >
        <p>{message}</p>
      </Modal>
      <form className={styles.form} onSubmit={handleSubmit(UpdateAdmin)}>
        <div className={styles.row}>
          <label htmlFor="First name" className={styles.label}>
            First Name
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{adminSelected[0]?.firstName}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="text"
                  name="firstName"
                  {...register('firstName')}
                  disabled={update}
                  placeholder={adminSelected[0]?.firstName}
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
              <p className={styles.text}>{adminSelected[0]?.lastName}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="text"
                  name="lastName"
                  {...register('lastName')}
                  disabled={update}
                  placeholder={adminSelected[0]?.lastName}
                  error={appendErrors.firstName?.message}
                ></input>
                {errors.lastName && <p className={styles.errorInput}>{errors.lastName?.message}</p>}
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
              <p className={styles.text}>{adminSelected[0]?.email}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="email"
                  name="email"
                  {...register('email')}
                  disabled={update}
                  placeholder={adminSelected[0]?.email}
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
              <p className={styles.text}>{adminSelected[0]?.password}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="password"
                  name="password"
                  {...register('password')}
                  disabled={update}
                  placeholder={adminSelected[0]?.password}
                  error={appendErrors.firstName?.message}
                ></input>
                {errors.password && <p className={styles.errorInput}>{errors.password?.message}</p>}
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="Active" className={styles.label}>
            Active
          </label>
          <div className={styles.secondColumn}>
            {update ? (
              <p className={styles.text}>{adminSelected[0]?.active ? 'Yes' : 'No'}</p>
            ) : (
              <>
                <input
                  className={styles.inputsProfile}
                  type="checkbox"
                  name="active"
                  {...register('active')}
                  disabled={update}
                  placeholder={adminSelected[0]?.active}
                  error={appendErrors.active?.message}
                ></input>
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