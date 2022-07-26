import styles from './header.module.css';
import logo from './logo.svg';

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div>
          <img className={styles.logo} src={logo}></img>
        </div>
      </nav>
    </header>
  );
}

export default Header;
