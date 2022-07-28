import styles from './header.module.css';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import ThemeToggle from 'Components/Shared/ThemeToggle';

function Header() {
  return (
    <header>
      <div className={styles.navbar}>
        <div className={styles.icon}>
          <ThemeToggle className={styles.icon} />
        </div>
        <Link to={'/'}>
          <img className={styles.logo} src={logo}></img>
        </Link>
      </div>
    </header>
  );
}

export default Header;
