import React, { useEffect } from 'react';
// import { appendErrors, useForm } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { employeeValidationLogIn } from 'Components/EmployeesFlow/validations';
import * as thunksAuth from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';
import Loader from 'Components/Shared/Loader';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const ContinueButton = styled(Button)({
  backgroundColor: deepPurple['A700']
});

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
      {/* <section className={styles.form}> */}
      <Container maxWidth="sm">
        {/* <Container fixed> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <h1 className={styles.tittle}>LOGIN</h1> */}
          <Typography variant="h3">Login</Typography>
          <div className={styles.formFlex}>
            {/* <div className={styles.inputContainer}>
              <label htmlFor="Email" className={styles.labels}>
                Email
              </label>
              <input type="text" {...register('email')} error={appendErrors.email?.message}></input>
              {errors.email && <p className={styles.errorInput}>{errors.email?.message}</p>}
            </div> */}
            <TextField
              type="email"
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
          </div>
          <Typography variant="subtitle1" sx={{ marginTop: 2, marginBottom: 2 }}>
            Forgot password?
          </Typography>
          <div className={styles.buttonsContainer}>
            <ContinueButton
              id="login"
              variant="contained"
              type="submit"
              className={styles.continueButton}
              fullWidth
              onClick={handleSubmit}
            >
              LOGIN
            </ContinueButton>
            {/* <button className={styles.buttonContinue} type="submit" value="CONTINUE">
              CONTINUE
            </button> */}
          </div>
          <Box sx={{ marginTop: 3 }}>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Typography variant="subtitle2" gutterBottom component="div">
                Don&apos;t have an account? Sign up
              </Typography>
            </Link>
          </Box>
        </form>
      </Container>
    </section>
  );
};

export default Login;
