import React, { useState } from 'react';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationLogIn } from 'Components/EmployeesFlow/validations';
import * as thunksAuth from 'redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';

// const Login = ({ history }) => {
//   const HandleLogin = useCallback(
//     async (event) => {
//       event.preventDefault();
//       const { email, password } = event.target.elements;
//       try {
//         await app.auth().signInWithEmailandPassword(email.value, password.value);
//         history.push('/');
//       } catch (error) {
//         alert(error);
//       }
//     },
//     [history]
//   );

//   const { currentUser } = useContext(AuthContext);

//   if (currentUser) {
//     return <Redirect to="/" />;
//   }
// };

const Login = () => {
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
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidationLogIn)
  });
  const onSubmit = (data) => {
    dispatch(thunksAuth.addEmployee({ ...data, active: true }));
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
};

export default Login;
