import styles from './admins.module.css';
import List from './List/list';

function Admins() {
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
}

export default Admins;
