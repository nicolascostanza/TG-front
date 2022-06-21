import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import * as thunksEmployee from '../../../redux/employees/thunks';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationUpdate } from './validations';

function Profile() {
  const param = useParams();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  const employees = useSelector((state) => state.employees.list);
  const employeeSelected = employees.filter((employee) => employee._id === param.id);
  // const message = useSelector((state) => state.employees.message);
  const response = useSelector((state) => state.employees.error);
  useEffect(() => {
    dispatch(thunksEmployee.getEmployees());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${param.id}`)
      .then((response) => response.json())
      .then((data) => {
        reset(data.data);
      });
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidationUpdate)
  });
  const onSubmitUpdate = (data) => {
    console.log('asdasdsa');
    const employee2 = { ...data, _id: param.id };
    dispatch(thunksEmployee.editEmployee(employee2));
    if (response) {
      console.log('mal');
    } else {
      console.log('bien pa');
      setUpdate(!update);
    }
  };

  return (
    <>
      <h1>Welcome {employeeSelected[0]?.firstName}</h1>
      <button
        className={styles.edit}
        onClick={(e) => {
          e.preventDefault();
          setUpdate(!update);
        }}
      >
        EDIT
      </button>

      <form className={styles.form} onSubmit={handleSubmit(onSubmitUpdate)}>
        <div>
          <label>First Name</label>
          {update ? (
            <p>{employeeSelected[0]?.firstName}</p>
          ) : (
            <>
              <input
                type="text"
                name="firstName"
                {...register('firstName')}
                disabled={update}
                placeholder={employeeSelected[0]?.firstName}
                error={appendErrors.firstName?.message}
              ></input>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div>
          <label>Last Name</label>
          {update ? (
            <p>{employeeSelected[0]?.lastName}</p>
          ) : (
            <>
              <input
                type="text"
                name="lastName"
                {...register('lastName')}
                disabled={update}
                placeholder={employeeSelected[0]?.lastName}
                error={appendErrors.firstName?.message}
              ></input>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div>
          <label>Email</label>
          {update ? (
            <p>{employeeSelected[0]?.email}</p>
          ) : (
            <>
              <input
                type="email"
                name="email"
                {...register('email')}
                disabled={update}
                placeholder={employeeSelected[0]?.email}
                error={appendErrors.firstName?.message}
              ></input>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div>
          <label>Password</label>
          {update ? (
            <p>{employeeSelected[0]?.password}</p>
          ) : (
            <>
              <input
                type="password"
                name="password"
                {...register('password')}
                disabled={update}
                placeholder={employeeSelected[0]?.password}
                error={appendErrors.firstName?.message}
              ></input>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div>
          <label>Gender</label>
          {update ? (
            <p>{employeeSelected[0]?.gender}</p>
          ) : (
            <>
              <select {...register('gender')}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div>
          <label>Address</label>
          {update ? (
            <p>{employeeSelected[0]?.address}</p>
          ) : (
            <>
              <input
                type="text"
                name="address"
                {...register('address')}
                disabled={update}
                placeholder={employeeSelected[0]?.address}
                error={appendErrors.address?.message}
              ></input>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div>
          <label>Phone</label>
          {update ? (
            <p>{employeeSelected[0]?.phone}</p>
          ) : (
            <>
              <input
                type="number"
                name="phone"
                {...register('phone')}
                disabled={update}
                placeholder={employeeSelected[0]?.phone}
                error={appendErrors.phone?.message}
              ></input>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div>
          <label>Date of Birthday</label>
          {update ? (
            <p>{new Date(employeeSelected[0]?.dob).toString()}</p>
          ) : (
            <>
              <input
                type="date"
                name="dob"
                {...register('dob')}
                disabled={update}
                placeholder={employeeSelected[0]?.dob}
                error={appendErrors.dob?.message}
              ></input>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div>
          <label>Active</label>
          {update ? (
            <p>{employeeSelected[0]?.active}</p>
          ) : (
            <>
              <input
                type="checkbox"
                name="active"
                {...register('active')}
                disabled={update}
                placeholder={employeeSelected[0]?.active}
                error={appendErrors.active?.message}
              ></input>
              <p>{errors.message}</p>
            </>
          )}
        </div>
        <div className={styles.button}>
          <input type="submit" value="Send" />
        </div>
        <button className={styles.edit} onClick={(e) => e.preventDefault()}>
          CANCEL
        </button>
      </form>
    </>
  );
}

export default Profile;
