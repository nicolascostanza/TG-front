import React from 'react';
import styles from './landing.module.css';
import Sidebar from '../Sidebar/index';
import img1 from './assets/img/img1.png';
import img2 from './assets/img/img2.png';
import img3 from './assets/img/img3.png';
import img4 from './assets/img/img4.png';
import img5 from './assets/img/img5.png';

function Landing() {
  return (
    <>
      <Sidebar />
      <div className={styles.sidebarMain}>
        <main className={styles.mainSection}>
          <section className={styles.firstSection}>
            <div className={styles.resizeTablet}>
              <h1 id="trackgenix" className={styles.tittle}>
                Hi, we are Trackgenix SA
              </h1>
              <div className={styles.imgTablet}>
                <img className={styles.imgTabletSize} src={img5} alt="Reloj" />
              </div>
              <p className={styles.subtittle}>A FREE AND FULLY RESPONSIVE SITE</p>
              <p className={styles.textMainSection}>
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
            </div>
            <div className={styles.wrapImage}>
              <img className={styles.imgMainSection} src={img5} alt="Reloj" />
            </div>
          </section>
          <h2 id="functionalities" className={styles.landingH2}>
            Functionalities
          </h2>
          <section className={styles.secondSection}>
            <div className={styles.peerSeparator}>
              <div className={styles.group}>
                <div className={styles.imagenLeftBox}>
                  <img src={img1} alt="trangenix" id={styles['descriptionImage']} />
                  <div className={styles.subGroup}>
                    <h3 className={styles.groupTitle}>Record of worked hours</h3>
                    <p className={styles.text}>
                      This app has a lot of hours for each member of the company, so you can then
                      accept, reject or edit them to your liking to optimize work time
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.group}>
                <div className={styles.imagenLeftBox}>
                  <img src={img2} alt="trangenix" id={styles['descriptionImage']} />
                  <div className={styles.subGroup}>
                    <h3 className={styles.groupTitle}>Reports</h3>
                    <p className={styles.text}>
                      You will have a section where you will find the reports of all areas of your
                      company, both in the form of graphics and text. they are useful to detect
                      possible opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.peerSeparator}>
              <div className={styles.group}>
                <div className={styles.imagenLeftBox}>
                  <img src={img3} alt="trangenix" id={styles['descriptionImage']} />
                  <div className={styles.subGroup}>
                    <h3 className={styles.groupTitle}>Resources management</h3>
                    <p className={styles.text}>
                      You will be able to manage your expenses, costs, salaries and all kinds of
                      economic movement of your company to make the best possible decisions
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.group}>
                <div className={styles.imagenLeftBox}>
                  <img src={img4} alt="trangenix" id={styles['descriptionImage']} />
                  <div className={styles.subGroup}>
                    <h3 className={styles.groupTitle}>Multiple roles</h3>
                    <p className={styles.text}>
                      You will have a list of all the members of the company with their respective
                      roles and functions, which you can add, delete and change their role.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className={styles.separator}></div>
          <h2 id="reasons" className={styles.landingH2}>
            Reasons why you need us
          </h2>
          <section className={styles.secondSection}>
            <div className={styles.peerSeparator}>
              <div className={styles.group}>
                <div className={styles.imagenLeftBox}>
                  <div className={styles.descriptionImage}>
                    <img src={img1} alt="trangenix" id={styles['descriptionImage']} />
                  </div>
                  <div className={styles.subGroup}>
                    <h3 className={styles.groupTitle}>Productivity enhancer</h3>
                    <p className={styles.text}>
                      This app has a lot of hours for each member of the company, so you can then
                      accept, reject or edit them to your liking to optimize work time
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.group}>
                <div className={styles.imagenLeftBox}>
                  <img src={img2} alt="trangenix" id={styles['descriptionImage']} />
                  <div className={styles.subGroup}>
                    <h3 className={styles.groupTitle}>Decision making</h3>
                    <p className={styles.text}>
                      You will have a section where you will find the reports of all areas of your
                      company, both in the form of graphics and text. they are useful to detect
                      possible opportunities
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.peerSeparator}>
              <div className={styles.group}>
                <div className={styles.imagenLeftBox}>
                  <img src={img3} alt="trangenix" id={styles['descriptionImage']} />
                  <div className={styles.subGroup}>
                    <h3 className={styles.groupTitle}>Work traceability</h3>
                    <p className={styles.text}>
                      You will be able to manage your expenses, costs, salaries and all kinds of
                      economic movement of your company to make the best possible decisions
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.group}>
                <div className={styles.imagenLeftBox}>
                  <img src={img4} alt="trangenix" id={styles['descriptionImage']} />
                  <div className={styles.subGroup}>
                    <h3 className={styles.groupTitle}>Leadership and team management</h3>
                    <p className={styles.text}>
                      You will have a list of all the members of the company with their respective
                      roles and functions, which you can add, delete and change their role.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className={styles.separator}></div>
          <div>
            <h2 id="contact" className={styles['centeredText']}>
              Request information
            </h2>
            <form className={styles.contactForm}>
              <div className={styles.nameEmailForm}>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
              </div>
              <div>
                <select className={styles.selectLanding} placeholder={'Category'} width={'800px'}>
                  <option value="HHRR">Human Resources</option>
                  <option value="Systems">Systems</option>
                  <option value="Commerce">Commercialization</option>
                </select>
              </div>
              <div className={styles.messageForm}>
                <textarea placeholder="Enter your message"></textarea>
              </div>
              <div className={styles.buttonsForm}>
                <button className={styles.buttonForm} type="submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className={styles.separator}></div>
          <section className={styles.listFooter}>
            <div className={styles.valuesContainer}>
              <h4>Products</h4>
              <ol className={styles.olItems}>
                <li>Features</li>
                <li>Downloads</li>
                <li>Integrations</li>
                <li>Extras</li>
              </ol>
            </div>
            <div className={styles.valuesContainer}>
              <h4>Company</h4>
              <ol>
                <li>About us</li>
                <li>Customers</li>
                <li>Resources</li>
                <li>Blog</li>
              </ol>
            </div>
            <div className={styles.valuesContainer}>
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
          <div className={styles.separator}></div>
        </main>
      </div>
    </>
  );
}

export default Landing;
