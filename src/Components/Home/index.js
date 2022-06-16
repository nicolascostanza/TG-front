import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Landing from '../Shared/Landing';

function Home() {
  const landing = true;
  if (landing) {
    return (
      <>
        <Landing></Landing>
      </>
    );
  }
  return (
    <section className={styles.container}>
      <Sidebar></Sidebar>
      <h2>Home</h2>
    </section>
  );
}

export default Home;
