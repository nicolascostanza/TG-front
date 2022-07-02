import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Landing from '../Shared/Landing';
import { useSelector } from 'react-redux';

function Home() {
  const role = useSelector((state) => state.auth.authenticated?.role);
  if (!role) {
    return <Landing />;
  }
  return (
    <section className={styles.container}>
      <Sidebar></Sidebar>
      <h2>Home</h2>
    </section>
  );
}

export default Home;
