import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
//import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as authActions from 'redux/auth/actions';
import * as currentUserActions from 'redux/currentUser/actions';

function TemporaryDrawer() {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authActions.setAuthentication(false));
    dispatch(currentUserActions.setCurrentUserToInitialState());
  };
  const role = useSelector((state) => state.auth.authenticated?.role);
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => () => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    setState({ ...state, [anchor]: open });
  };

  const listWithNoRole = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem key={text} disablePadding={false}>
            <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <ListItem disablePadding={false}>
          <Link to={'/'}>
            <ListItemButton>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link to={'/signup'}>
            <ListItemButton>
              <ListItemText primary={'Sign Up'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link to={'/login'}>
            <ListItemButton>
              <ListItemText primary={'Log In'} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  const listEmp = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem key={text} disablePadding={false}>
            <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <ListItem disablePadding={false}>
          <Link to={'/'}>
            <ListItemButton>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding={false}>
          <Link to={'/employees/profile'}>
            <ListItemButton>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding={false}>
          <Link to={'/'}>
            <ListItemButton onClick={logOut}>
              <ListItemText primary={'Log Out'} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  const listAdm = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem key={text} disablePadding={false}>
            <ListItemButton>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <ListItem disablePadding={false}>
          <Link to={'/'}>
            <ListItemButton>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding={false}>
          <Link to={'/admins/profile'}>
            <ListItemButton>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link to={'/'}>
            <ListItemButton onClick={logOut}>
              <ListItemText primary={'Log Out'} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  if (!role) {
    return (
      <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <IconButton
              onClick={toggleDrawer(anchor, true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {listWithNoRole(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  } else if (role === 'EMPLOYEE') {
    return (
      <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <IconButton
              onClick={toggleDrawer(anchor, true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {listEmp(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  } else if (role === 'ADMIN') {
    return (
      <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <IconButton
              onClick={toggleDrawer(anchor, true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {listAdm(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default withRouter(TemporaryDrawer);
