import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';

function Home() {
  return (
    <section className={styles.container}>
      <Sidebar></Sidebar>
      <h2>Home</h2>
    </section>
  );
}

export default Home;
