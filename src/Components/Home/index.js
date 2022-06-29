import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
// import TableNew from 'Components/Shared/TableNew/index.jsx';

function Home() {
  return (
    <section className={styles.container}>
      <Sidebar></Sidebar>
      <h2>Home</h2>
      {/* <TableNew></TableNew> */}
    </section>
  );
}

export default Home;
