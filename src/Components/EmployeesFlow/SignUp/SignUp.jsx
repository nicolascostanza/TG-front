import React, { useState } from 'react';
// import { appendErrors, useForm } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationSignUp } from 'Components/EmployeesFlow/validations';
import * as thunksEmployee from 'redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
// import Modal from 'Components/Shared/Modal';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './signup.module.css';
import { useHistory } from 'react-router-dom';
import { Button, Box, Typography, Modal, Container, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { deepPurple } from '@mui/material/colors';

const ContinueButton = styled(Button)({
  backgroundColor: deepPurple['A700'],
  color: 'white'
});

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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  return (
    <section className={styles.container}>
      {/* <Container> */}
      <section>
        <Sidebar />
      </section>
      {/* <Modal showModal={showModalMessage} handleClose={handleCloseMessage}>
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
      </Modal> */}
      <Modal
        open={showModalMessage}
        onClose={handleCloseMessage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" id="modal-modal-title">
            Registered successfully!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
          <Button
            id="ok"
            onClick={() => history.push('/employees/profile/629d83d3d9d731ead71b218c')}
          ></Button>
        </Box>
      </Modal>
      {/* <section className={styles.form}> */}
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            {/* <h1 className={styles.tittle}>REGISTER</h1> */}
            <Typography variant="h3">Register</Typography>
            {/* <div className={styles.formFlex}> */}
            {/* <div className={styles.inputContainer}>
              <label htmlFor="First name" className={styles.labels}>
                First name
              </label>
              <input
                type="text"
                {...register('firstName')}
                error={appendErrors.firstName?.message}
              ></input>
              {errors.firstName && <p className={styles.errorInput}>{errors.firstName?.message}</p>}
            </div> */}
            <TextField
              id="firstName"
              label="First name"
              variant="outlined"
              {...register('firstName')}
              margin="normal"
              fullWidth
              error={errors.firstName && true}
              helperText={errors.firstName?.message}
            />
            {/* <div className={styles.inputContainer}>
              <label htmlFor="Last name" className={styles.labels}>
                Last Name
              </label>
              <input
                type="text"
                {...register('lastName')}
                error={appendErrors.lastName?.message}
              ></input>
              {errors.lastName && <p className={styles.errorInput}>{errors.lastName?.message}</p>}
            </div> */}
            <TextField
              id="lastName"
              label="Last name"
              variant="outlined"
              {...register('lastName')}
              margin="normal"
              fullWidth
              error={errors.lastName && true}
              helperText={errors.lastName?.message}
            />
            {/* </div> */}
            {/* <div className={styles.formFlex}> */}
            {/* <div className={styles.inputContainer}>
              <label htmlFor="Email" className={styles.labels}>
                Email
              </label>
              <input type="text" {...register('email')} error={appendErrors.email?.message}></input>
              {errors.email && <p className={styles.errorInput}>{errors.email?.message}</p>}
            </div> */}
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              {...register('email')}
              margin="normal"
              fullWidth
              error={errors.email && true}
              helperText={errors.email?.message}
            />
            {/* <div className={styles.inputContainer}>
              <label htmlFor="Password" className={styles.labels}>
                Password
              </label>
              <input
                type="password"
                {...register('password')}
                error={appendErrors.password?.message}
              ></input>
              {errors.password && <p className={styles.errorInput}>{errors.password?.message}</p>}
            </div> */}
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              {...register('password')}
              margin="normal"
              fullWidth
              error={errors.password && true}
              helperText={errors.password?.message}
            />
            {/* </div> */}
            {/* <div className={styles.buttonsContainer}> */}
            <ContinueButton variant="contained" type="submit" fullWidth>
              Continue
            </ContinueButton>
            <Box>
              <Button onClick={() => reset()}>Reset</Button>
              {/* <button className={styles.buttonReset} onClick={() => reset()}>
              RESET
            </button>
            <button className={styles.buttonContinue} type="submit" value="CONTINUE">
              CONTINUE
            </button> */}
            </Box>
            {/* </div> */}
          </Container>
        </form>
      </Container>
      {/* </section> */}
      {/* </Container> */}
    </section>
  );
}

export default SignUp;