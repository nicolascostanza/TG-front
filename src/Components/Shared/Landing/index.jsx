import React from 'react';
import styles from './landing.module.css';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';

function Landing() {
  return (
    <div>
      <header className={styles.header}>
        <nav>
          <ul className={styles.iconsHeader}>
            <li>FB</li>
            <li>TWT</li>
            <li>LKDIN</li>
            <li>IG</li>
            <li>GITHUB</li>
          </ul>
        </nav>
      </header>
      <div className={styles.sidebarMain}>
        <aside className={styles.sidebar}>sidebar</aside>
        <main className={styles.mainSection}>
          <section className={styles.firstSection}>
            <div>
              <h1>Hi, we are Trackgenix SA</h1>
              <p>A FREE AND FULLY RESPONSIBE SITE</p>
              {/* <img src="./assets/img/reloj.jpg" alt="Reloj" /> */}
              <p>
                Scelerisque augue scelerisque pharetra, platea rutrum. Orci est faucibus tempor
                pellentesque vulputate. Arcu in cras iaculis scelerisque odio venenatis magna nisl.
                Suspendisse maecenas ac sit urna neque eu amet, cras. Vel amet, id accumsan
                fringilla. Eros, habitant tortor quam consequat hendrerit nunc, euismod dolor.
                Tortor, quam velit sit tincidunt turpis viverra. Sapien rhoncus neque, varius
                facilisi pretium, volutpat non. Molestie proin placerat ultrices rhoncus massa
                scelerisque hac vel aliquam. Accumsan massa accumsan est a. Purus massa condimentum
                nam non ultricies eleifend. Orci, augue mauris tincidunt ullamcorper elementum in
                fringilla. Sed varius nibh scelerisque tortor sapien. Sit egestas ac imperdiet lorem
                massa, tempor malesuada. Massa enim interdum morbi nunc eleifend viverra. Mauris
                iaculis arcu platea ut massa ultrices. In est porta etiam a nisl quisque nullam.
                Interdum vel, pellentesque imperdiet lacus fermentum. Consectetur amet, purus leo
                nulla. Ac mauris ac ultrices egestas maecenas suspendisse leo, mi.
              </p>
              <Button backgroundColor={'#FFF'} className={styles.buttonText}>
                LEARN MORE
              </Button>
            </div>
            <div>
              <img src="./assets/img/reloj.jpg" alt="Reloj" />
            </div>
          </section>
          <div>
            <form
              action=""
              method="POST"
              name="requestInformationForm"
              className="requestInformationForm"
            >
              <div className={styles.nameAndEmail}>
                <div>
                  <input type="text" placeholder="Name" />
                </div>
                <div className={styles.emailSection}>
                  <input type="email" placeholder="Email" />
                  <input type="checkbox" />
                </div>
              </div>
              <Dropdown placeholder={'Category'} width={'800px'}>
                <option value="">Human Resources</option>
                <option value="">Systems</option>
                <option value="">Commercialization</option>
              </Dropdown>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Enter your message"
              ></textarea>
            </form>
          </div>
          <section className={styles.listFooter}>
            <div>
              <h4>Products</h4>
              <ol>
                <li>Features</li>
                <li>Downloads</li>
                <li>Integrations</li>
                <li>Extras</li>
              </ol>
            </div>
            <div>
              <h4>Company</h4>
              <ol>
                <li>About us</li>
                <li>Customers</li>
                <li>Resources</li>
                <li>Blog</li>
              </ol>
            </div>
            <div>
              <h4>Support</h4>
              <ol>
                <li>Help</li>
                <li>Tutorials</li>
                <li>API</li>
                <li>Contact</li>
              </ol>
            </div>
          </section>
          <div className={styles.buttonsFooterDiv}></div>
          <div className={styles.header}></div>
          <footer>
            <div>
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
              <a
                href={'https://www.instagram.com/radium.rocket/'}
                target={'_blank'}
                rel="noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href={'https://github.com/radiumrocketapps'} target={'_blank'} rel="noreferrer">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
            <div>
              <p>Trackgenix ®</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Landing;
