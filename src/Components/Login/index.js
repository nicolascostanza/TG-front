import React, { useEffect } from 'react';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationLogIn } from 'Components/EmployeesFlow/validations';
import * as thunksAuth from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';
import Loader from 'Components/Shared/Loader';

const Login = () => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const isFetchingUser = useSelector((state) => state.currentUser.isFetching);
  const isFetchingAuth = useSelector((state) => state.auth.isFetching);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidationLogIn)
  });

  // Should redirect after current user is auth and loaded
  useEffect(() => {
    if (currentUser?._id) {
      history.push('/');
    }
  }, [currentUser?._id]);

  const onSubmit = (data) => {
    dispatch(thunksAuth.login(data));
  };

  return (
    <section className={styles.container}>
      <Loader isLoading={isFetchingUser || isFetchingAuth} />
      <section>
        <Sidebar />
      </section>
      <section className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.tittle}>LOGIN</h1>
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
            <button className={styles.buttonContinue} type="submit" value="CONTINUE">
              CONTINUE
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Login;
