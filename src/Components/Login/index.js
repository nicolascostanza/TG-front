import React from 'react';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationLogIn } from 'Components/EmployeesFlow/validations';
import * as thunksAuth from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidationLogIn)
  });
  const onSubmit = (data) => {
    dispatch(thunksAuth.login(data));
  };
  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
      <section className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.tittle}>LOGIN</h1>
          <div className={styles.formFlex}>
            <div className={styles.inputContainer}>
              <label htmlFor="Email" className={styles.labels}></label>
              <input
                type="text"
                {...register('email')}
                placeholder="Email"
                error={appendErrors.email?.message}
              ></input>
              {errors.email && <p className={styles.errorInput}>{errors.email?.message}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="Password" className={styles.labels}></label>
              <input
                type="password"
                placeholder="Password"
                {...register('password')}
                error={appendErrors.password?.message}
              ></input>
              {errors.password && <p className={styles.errorInput}>{errors.password?.message}</p>}
            </div>
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.buttonContinue}
              type="submit"
              value="CONTINUE"
              onClick={() => history.push('/employees/profile/629d83d3d9d731ead71b218c')}
            >
              CONTINUE
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Login;
