import AddBtn from './AddBtn/AddBtn';
import styles from './employees.module.css';
import List from './List/List';

function Employees() {
  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <AddBtn />
      <List />
    </section>
  );
}

export default Employees;
