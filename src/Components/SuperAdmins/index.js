import styles from './super-admins.module.css';
import { useState } from 'react';
import List from './List';
import Form from './Form';
import Btn from './Btn';

function SuperAdmins() {
  let [screen, setScreen] = useState(false);
  let [method, setMethod] = useState('');
  let [id, setID] = useState('');
  // let [info, setInfo] = useState([]);
  // useEffect(() => {
  //   fetch(process.env.REACT_APP_LOCALHOST_URL)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setInfo(response.data);
  //     });
  // }, []);
  const switchScreen = () => {
    setScreen(screen ? (screen = false) : (screen = true));
  };
  if (screen) {
    return (
      <section className={styles.container}>
        <h2>SuperAdmin Form</h2>
        <Form method={method} switchScreen={switchScreen} id={id} />
        <Btn color="blue" text="View List" onClick={switchScreen} />
      </section>
    );
  } else {
    return (
      <section className={styles.container}>
        <h2>SuperAdmin List</h2>
        <List switchScreen={switchScreen} setMethod={setMethod} setID={setID} />
        <Btn
          color="green"
          text="Add SuperAdmin"
          onClick={() => {
            setMethod('POST');
            {
              switchScreen();
            }
          }}
        />
      </section>
    );
  }
}

export default SuperAdmins;
