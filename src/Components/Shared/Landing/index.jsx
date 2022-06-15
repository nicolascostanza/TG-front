import React from 'react';
import styles from './landing.module.css';
import Button from '../Button/Button';

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
        </main>
      </div>
    </div>
  );
}

export default Landing;
