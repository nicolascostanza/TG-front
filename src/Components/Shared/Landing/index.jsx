import React from 'react';
import styles from './landing.module.css';
import Sidebar from '../Sidebar/index';
import img1 from './assets/img/img1.png';
import img2 from './assets/img/img2.png';
import img3 from './assets/img/img3.png';
import img4 from './assets/img/img4.png';

function Landing() {
  return (
    <>
      <Sidebar />
      <div className={styles.sidebarMain}>
        <main className={styles.mainSection}>
          <section className={styles.firstSection}>
            <div className={styles.imgTablet}>
              <div className={styles.divSeparator1}></div>
              <div className={styles.divSeparator2}>
                <h1 id="trackgenix" className={styles.tittle}>
                  Hi, we are Trackgenix SA
                </h1>
                <p className={styles.subtittle}>THE MOST POPULAR TEAM TIME TRACKER</p>
                <p className={styles.textMainSection}>
                  TRACKGENIX is a time tracker and schedule app used by millions of user all around
                  the world. Our time tracking software facilitates the recording of hours worked by
                  each employee in each project and work team of this company which provides
                  software development services to other ones. If you want to provide solutions to
                  manage and organize the work performed by employees this is the perfect app.
                </p>
              </div>
              {/* <img className={styles.imgTabletSize} src={mainImg} alt="Reloj" /> */}
            </div>
          </section>
          <h2 id="functionalities" className={styles.landingH2}>
            FUNCTIONALITIES
          </h2>
          <section className={styles.secondSection}>
            <div className={styles.peerSeparator}>
              {/* <div className={styles.group}> */}
              <div className={styles.imagenLeftBox}>
                <img src={img1} alt="trackgenix" id={styles['descriptionImage']} />
                <div className={styles.subGroup}>
                  <h3 className={styles.groupTitle}>WORKED HOURS RECORD</h3>
                  <p className={styles.text}>
                    This app has a lot of hours for each member of the company, so you can then
                    accept, reject or edit them to your liking to optimize work time
                  </p>
                </div>
              </div>
              {/* </div> */}
              {/* <div className={styles.group}> */}
              <div className={styles.imagenLeftBox}>
                <img src={img2} alt="trackgenix" id={styles['descriptionImage']} />
                <div className={styles.subGroup}>
                  <h3 className={styles.groupTitle}>REPORTS</h3>
                  <p className={styles.text}>
                    You will have a section where you will find the reports of all areas of your
                    company, both in the form of graphics and text. they are useful to detect
                    possible opportunities
                  </p>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className={styles.peerSeparator}>
              {/* <div className={styles.group}> */}
              <div className={styles.imagenLeftBox}>
                <img src={img3} alt="trackgenix" id={styles['descriptionImage']} />
                <div className={styles.subGroup}>
                  <h3 className={styles.groupTitle}>RESOURCES MANAGEMENT</h3>
                  <p className={styles.text}>
                    You will be able to manage your expenses, costs, salaries and all kinds of
                    economic movement of your company to make the best possible decisions
                  </p>
                </div>
              </div>
              {/* </div> */}
              {/* <div className={styles.group}> */}
              <div className={styles.imagenLeftBox}>
                <img src={img4} alt="trackgenix" id={styles['descriptionImage']} />
                <div className={styles.subGroup}>
                  <h3 className={styles.groupTitle}>MULTIPLE ROLES</h3>
                  <p className={styles.text}>
                    You will have a list of all the members of the company with their respective
                    roles and functions, which you can add, delete and change their role.
                  </p>
                </div>
              </div>
              {/* </div> */}
            </div>
          </section>
          {/* <div className={styles.separator}></div> */}
          <h2 id="reasons" className={styles.landingH2}>
            REASONS WHY YOU NEED US
          </h2>
          <section className={styles.secondSection}>
            <div className={styles.peerSeparator}>
              {/* <div className={styles.group}> */}
              <div className={styles.imagenLeftBox}>
                <div className={styles.descriptionImage}>
                  <img src={img1} alt="trackgenix" id={styles['descriptionImage']} />
                </div>
                <div className={styles.subGroup}>
                  <h3 className={styles.groupTitle}>PRODUCTIVITY ENHANCER</h3>
                  <p className={styles.text}>
                    This app has a lot of hours for each member of the company, so you can then
                    accept, reject or edit them to your liking to optimize work time
                  </p>
                </div>
              </div>
              {/* </div> */}
              {/* <div className={styles.group}> */}
              <div className={styles.imagenLeftBox}>
                <img src={img2} alt="trackgenix" id={styles['descriptionImage']} />
                <div className={styles.subGroup}>
                  <h3 className={styles.groupTitle}>DECISION MAKING</h3>
                  <p className={styles.text}>
                    You will have a section where you will find the reports of all areas of your
                    company, both in the form of graphics and text. they are useful to detect
                    possible opportunities
                  </p>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className={styles.peerSeparator}>
              {/* <div className={styles.group}> */}
              <div className={styles.imagenLeftBox}>
                <img src={img3} alt="trackgenix" id={styles['descriptionImage']} />
                <div className={styles.subGroup}>
                  <h3 className={styles.groupTitle}>WORK TRACEABILITY</h3>
                  <p className={styles.text}>
                    You will be able to manage your expenses, costs, salaries and all kinds of
                    economic movement of your company to make the best possible decisions
                  </p>
                </div>
              </div>
              {/* </div> */}
              {/* <div className={styles.group}> */}
              <div className={styles.imagenLeftBox}>
                <img src={img4} alt="trackgenix" id={styles['descriptionImage']} />
                <div className={styles.subGroup}>
                  <h3 className={styles.groupTitle}>LEADERSHIP AND TEAM MANAGEMENT</h3>
                  <p className={styles.text}>
                    You will have a list of all the members of the company with their respective
                    roles and functions, which you can add, delete and change their role.
                  </p>
                </div>
              </div>
              {/* </div> */}
            </div>
          </section>
          {/* <div className={styles.separator}></div> */}
          <div>
            <form className={styles.contactForm}>
              <h2 id="contact" className={styles['centeredText']}>
                CONTACT US
              </h2>
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
                  SEND
                </button>
              </div>
            </form>
          </div>
          {/* <div className={styles.separator}></div> */}
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
          {/* <div className={styles.separator}></div> */}
        </main>
      </div>
    </>
  );
}

export default Landing;
