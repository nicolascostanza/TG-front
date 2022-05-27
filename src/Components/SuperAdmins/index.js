import styles from './super-admins.module.css';
import List from './List';

function SuperAdmins() {
  const url = `http://localhost:8080/super-admins`;
  console.log(url);
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
}

export default SuperAdmins;
