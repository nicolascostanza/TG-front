import styles from './header.module.css';
import logo from './logo.svg';

function Header() {
  return (
    // <AppBar>
    //   <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
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
        <div>
          <img className={styles.logo} src={logo}></img>
        </div>
      </nav>
    </header>
    // </AppBar>
  );
}

export default Header;
