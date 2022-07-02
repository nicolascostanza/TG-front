import styles from './home.module.css';
// import Sidebar from '../Shared/Sidebar';
import Landing from 'Components/Shared/Landing';

function Home() {
  return (
    <section className={styles.container}>
      <Landing />
      {/* <Sidebar /> */}
      {/* <h2>Home</h2> */}
    </section>
  );
}

export default Home;
