import React from 'react';
import styles from '../Sidebar/sidebar.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, ListItem, Drawer } from '@mui/material';

const Sidebar = ({ children }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  if (!isOpen) {
    return (
      <button className={styles.sideButton} onClick={() => setIsOpen(true)}>
        <i className="fa-solid fa-bars"></i>
      </button>
    );
  }
  return (
    // <div className={styles.Sidebar}>
    //   <section className={styles.container}>
    //     <div className={styles.sidebarTitle}>
    //       <p>Menu</p>
    //       <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
    //     </div>
    //     <a>Home</a> {/*<Link to="/tasks">home</Link>*/}
    //     <a onClick={() => history.push('/signup')}>Sign-up</a>
    //     <a onClick={() => history.push('/login')}>Log-in</a>
    //     <a>Contact</a>
    //   </section>
    //   <section className={styles.container}>{children}</section>
    // </div>
    <Drawer
      variant="permanent"
      // open={isOpen}
      // onOpen={setIsOpen(true)}
      // onClose={handleClose()}
    >
      {/* <section className={styles.container}> */}
      <List>
        <ListItem>
          <p>Menu</p>
        </ListItem>
        <ListItem>
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </ListItem>
        <ListItem>
          <a>Home</a>
        </ListItem>
        <ListItem>
          <a onClick={() => history.push('/signup')}>Sign-up</a>
        </ListItem>
        <ListItem>
          <a onClick={() => history.push('/login')}>Log-in</a>
        </ListItem>
        <ListItem>Contact</ListItem>
      </List>
      {/* <div className={styles.sidebarTitle}>
          <p>Menu</p>
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <a>Home</a> <Link to="/tasks">home</Link>
        <a onClick={() => history.push('/signup')}>Sign-up</a>
        <a onClick={() => history.push('/login')}>Log-in</a>
        Contact */}
      {/* </section> */}
      <section className={styles.container}>{children}</section>
    </Drawer>
  );
};

//It must be implemented inside the components indexes
// You must provide children
//isOpen is a boolean to indicate if is open or not
//handleClose should change isOpen to false

export default Sidebar;
