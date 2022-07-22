import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as thunksEmployee from 'redux/employees/thunks';
// import { appendErrors, useForm } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationUpdate } from 'Components/EmployeesFlow/validations';
import styles from './profile.module.css';
import Modal from 'Components/Shared/Modal';
import Sidebar from 'Components/Shared/Sidebar';
import { Button, Container, Typography, TextField, Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const message = useSelector((state) => state.employees.message);
  const response = useSelector((state) => state.employees.error);
  const { _id, firstName, lastName, email, password } = currentUser;
  useEffect(() => {
    reset({
      firstName,
      lastName,
      email,
      password
    });
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: { firstName, lastName, email, password },
    resolver: joiResolver(employeeValidationUpdate)
  });
  const UpdateEmployee = (data) => {
    const employee = { ...data, _id };
    dispatch(thunksEmployee.editEmployee(employee));

    console.log('update: ', update);
    console.log('data: ', data);
    console.log('id: ', _id);

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
    <Container>
      <Sidebar />
      <Typography variant="h3" align="center">{`Welcome ${firstName}`}</Typography>
      <div className={styles.divButton}>
        <Button
          variant="contained"
          color={update ? 'success' : 'error'}
          onClick={(e) => {
            e.preventDefault();
            setUpdate(!update);
          }}
        >
          {update ? 'EDIT' : 'CANCEL'}
        </Button>
        <Button onClick={() => history.push('/employees/home/629d83d3d9d731ead71b218c')}>
          Go home
        </Button>
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
          <Typography variant="body1">First Name</Typography>
          <div className={styles.secondColumn}>
            {update ? (
              <Typography variant="body1">{firstName}</Typography>
            ) : (
              <>
                <TextField
                  id="firstName"
                  variant="outlined"
                  {...register('firstName')}
                  defaultValue={firstName}
                  margin="none"
                  size="small"
                  disabled={update}
                  error={errors.firstName && true}
                  helperText={errors.firstName?.message}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <Typography variant="body1">Last Name</Typography>
          <div className={styles.secondColumn}>
            {update ? (
              <Typography variant="body1">{lastName}</Typography>
            ) : (
              <>
                <TextField
                  id="lastName"
                  variant="outlined"
                  {...register('lastName')}
                  defaultValue={lastName}
                  margin="none"
                  size="small"
                  disabled={update}
                  error={errors.lastName && true}
                  helperText={errors.lastName?.message}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <Typography variant="body1">Email</Typography>
          <div className={styles.secondColumn}>
            {update ? (
              // <p className={styles.text}>{email}</p>
              <Typography variant="body1">{email}</Typography>
            ) : (
              <>
                <TextField
                  type="email"
                  id="email"
                  variant="outlined"
                  {...register('email')}
                  defaultValue={email}
                  margin="none"
                  size="small"
                  disabled={update}
                  error={errors.email && true}
                  helperText={errors.email?.message}
                />
              </>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <Typography variant="body1">Password</Typography>
          <div className={styles.secondColumn}>
            {update ? (
              <Typography variant="body1">**************</Typography>
            ) : (
              <>
                <TextField
                  type="password"
                  id="password"
                  variant="outlined"
                  {...register('password')}
                  defaultValue={password}
                  margin="none"
                  size="small"
                  disabled={update}
                  error={errors.password && true}
                  helperText={errors.password?.message}
                />
              </>
            )}
          </div>
        </div>
        {update ? null : (
          <Box>
            <Button
              type="submit"
              value="submit"
              variant="contained"
              sx={{ backgroundColor: deepPurple['A700'], color: 'white' }}
            >
              Update
            </Button>
          </Box>
        )}
      </form>
    </Container>
  );
}

export default Profile;
