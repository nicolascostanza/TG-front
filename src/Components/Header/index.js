import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styles from './header.module.css';

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
        <ul className={styles.rutes}>
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
        </ul>
        <div className={styles.appName}>
          <h1>TrackGENIX</h1>
          <h2>we build solutions</h2>
        </div>
      </nav>
    </header>
  );
}

export default withRouter(Header);
