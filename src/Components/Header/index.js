import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { Link, withRouter } from 'react-router-dom';
import styles from './header.module.css';
import logo from './logo.svg';

function Header() {
  const pathName = window.location.pathname;
  const onHome = pathName === '/';
  const role = useSelector((state) => state.auth.authenticated?.role);

  if (!role && onHome) {
    return null;
  }
  return (
    <header>
      <nav className={styles.navbar}>
        {/* <ul className={styles.rutes}>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/admins">admins</Link>
          </li>
          <li>
            <Link to="/super-admins">super admins</Link>
          </li>
          <li>
            <Link to="/employees">employees</Link>
          </li>
          <li>
            <Link to="/projects">projects</Link>
          </li>
          <li>
            <Link to="/time-sheets">timesheets</Link>
          </li>
          <li>
            <Link to="/tasks">tasks</Link>
          </li>
        </ul> */}
        <section>
          <img className={styles.logo} src={logo}></img>
        </section>
        <section>
          <button className={styles.button}>Login</button>
          <button className={styles.button}>Signup</button>
        </section>
      </nav>
    </header>
  );
}

export default withRouter(Header);
