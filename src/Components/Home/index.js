import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Landing from '../Shared/Landing';
import Button from '../Shared/Button/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const role = useSelector((state) => state.auth.authenticated?.role);
  if (!role) {
    return <Landing />;
  }
  if (role === 'EMPLOYEE') {
    return (
      <section className={styles.container}>
        <Sidebar></Sidebar>
        <Button
          width={'175px'}
          height={'40px'}
          onClick={() => history.push('/employees/profile')}
          value="employee profile"
        >
          Employee profile
        </Button>
      </section>
    );
  } else if (role === 'ADMIN') {
    return (
      <section className={styles.container}>
        <Sidebar></Sidebar>
        <Button
          width={'130px'}
          height={'40px'}
          onClick={() => history.push('/admins/profile')}
          value="admin profile"
        >
          Admin profile
        </Button>
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
