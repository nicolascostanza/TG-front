import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as authActions from 'redux/auth/actions';
import * as currentUserActions from 'redux/currentUser/actions';
// import styles from './header.module.css';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { deepPurple } from '@mui/material/colors';
import logo from './logo.svg';

function Header() {
  const dispatch = useDispatch();
  const pathName = window.location.pathname;
  const onHome = pathName === '/';
  const role = useSelector((state) => state.auth.authenticated?.role);
  const logOut = () => {
    dispatch(authActions.setAuthentication(false));
    dispatch(currentUserActions.setCurrentUserToInitialState());
  };

  if (!role && onHome) {
    return null;
  }
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: deepPurple['A700'] }}>
        <Toolbar>
          <IconButton
            onClick={() => console.log('click')}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/admins" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Admins</Button>
          </Link>
          <Link to="/super-admins" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Super admins</Button>
          </Link>
          <Link to="/employees" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Employees</Button>
          </Link>
          <Link to="/projects" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Projects</Button>
          </Link>
          <Link to="/time-sheets" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Timesheets</Button>
          </Link>
          <Link to="/tasks" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">tasks</Button>
          </Link>
          {role ? (
            <Link onClick={logOut} to="/" style={{ textDecoration: 'none' }}>
              <Button color="inherit">Logout</Button>
            </Link>
          ) : null}
          <img src={logo} alt="logo" sx={{ align: 'right' }} />
        </Toolbar>
      </AppBar>
    </Box>
    // <header>
    //   <nav className={styles.navbar}>
    //     <ul className={styles.rutes}>
    //       <li>
    //         <Link to="/">home</Link>
    //       </li>
    //       <li>
    //         <Link to="/admins">admins</Link>
    //       </li>
    //       <li>
    //         <Link to="/super-admins">super admins</Link>
    //       </li>
    //       <li>
    //         <Link to="/employees">employees</Link>
    //       </li>
    //       <li>
    //         <Link to="/projects">projects</Link>
    //       </li>
    //       <li>
    //         <Link to="/time-sheets">timesheets</Link>
    //       </li>
    //       <li>
    //         <Link to="/tasks">tasks</Link>
    //       </li>
    //       {role ? (
    //         <li>
    //           <Link onClick={logOut} to="/">
    //             Log Out
    //           </Link>
    //         </li>
    //       ) : null}
    //     </ul>
    //     <div className={styles.appName}>
    //       <h1>TrackGENIX</h1>
    //       <h2>we build solutions</h2>
    //     </div>
    //   </nav>
    // </header>
  );
}

export default withRouter(Header);
