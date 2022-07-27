import React, { useState } from 'react';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationSignUp } from 'Components/EmployeesFlow/validations';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as thunksEmployee from 'redux/employees/thunks';
import Modal from 'Components/Shared/Modal';
// import Loader from 'Components/Shared/Loader';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './signup.module.css';

function SignUp() {
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const messageRegister = useSelector((state) => state.employees.messageRegister);
  // const isFetchingEmployees = useSelector((state) => state.employees.isFetching);
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
    dispatch(thunksEmployee.addEmployee(data));
    setShowModalMessage(true);
  };
  const redirectedAuth = () => {
    if (currentUser.firebaseUid) {
      history.push(`/`);
    } else {
      setShowModalMessage(false);
    }
  };
  return (
    <section className={styles.all}>
      {/* <Loader isLoading={isFetchingEmployees} /> */}
      <section className={styles.container}>
        <section>
          <Sidebar />
        </section>
        <Modal showModal={showModalMessage} handleClose={handleCloseMessage}>
          <div className={styles.modal}>
            <p>{messageRegister}</p>
            <button className={styles.buttonOk} value="OK" onClick={redirectedAuth}>
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
                {errors.firstName && (
                  <p className={styles.errorInput}>{errors.firstName?.message}</p>
                )}
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
                <label htmlFor="Email" className={styles.labels}>
                  Email
                </label>
                <input
                  type="text"
                  {...register('email')}
                  error={appendErrors.email?.message}
                ></input>
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
            <div className={styles.bottomLinkContainer}>
              <span className={styles.newHereText}>
                Already have an account?
                <Link to="/login" className={styles.loginRedirect}>
                  Log in
                </Link>
              </span>
            </div>
          </form>
        </section>
      </section>
    </section>
  );
}

export default SignUp;
