import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © 2021 Radium Rocket</div>
        <div className={styles.socials}>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            href={'https://www.linkedin.com/company/radium-rocket'}
            target={'_blank'}
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href={'https://github.com/radiumrocketapps'} target={'_blank'} rel="noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
