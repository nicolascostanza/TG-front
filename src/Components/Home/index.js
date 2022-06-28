import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const role = useSelector((state) => state.auth.authenticated?.role);
  console.log(role);
  if (role === 'EMPLOYEE') {
    return (
      <section className={styles.container}>
        <Sidebar></Sidebar>
        <h2>Home</h2>
        <button
          onClick={() => history.push('/employees/profile/629d83d3d9d731ead71b218c')}
          className={styles.buttonOk}
          value="employee profile"
        >
          Employee profile
        </button>
      </section>
    );
  } else if (role === 'ADMIN') {
    return (
      <section className={styles.container}>
        <Sidebar></Sidebar>
        <h2>Home</h2>
        <button
          onClick={() => history.push('/admin/profile/62bb2dbe576424de7c76bff5')}
          className={styles.buttonOk}
          value="admin profile"
        >
          Admin profile
        </button>
      </section>
    );
  } else {
    return (
      <section className={styles.container}>
        <Sidebar></Sidebar>
        <h2>Home</h2>
      </section>
    );
  }
}

export default Home;
