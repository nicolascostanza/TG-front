import styles from './super-admins.module.css';
import { useState } from 'react';
import List from './List';
import Form from './Form';
import Btn from './Btn';

function SuperAdmins() {
  let [screen, setScreen] = useState(false);
  let [method, setMethod] = useState('');
  let [id, setID] = useState('');
  const switchScreen = () => {
    setScreen(screen ? (screen = false) : (screen = true));
  };
  if (screen) {
    return (
      <section className={styles.container}>
        <h2>SuperAdmin Form</h2>
        <Form method={method} switchScreen={switchScreen} id={id} />
        <Btn text="View List" onClick={switchScreen} />
      </section>
    );
  } else {
    return (
      <section className={styles.container}>
        <div className={styles.headerList}>
          <div className={styles.addButton}>
            <i
              className="fa-solid fa-user-plus"
              color="green"
              text="Add SuperAdmin"
              onClick={() => {
                setMethod('POST');
                {
                  switchScreen();
                }
              }}
            ></i>
          </div>
          <h2 className={styles.tittle}>SuperAdmins</h2>
        </div>
        <List switchScreen={switchScreen} setMethod={setMethod} setID={setID} />
      </section>
    );
  }
}

export default SuperAdmins;
