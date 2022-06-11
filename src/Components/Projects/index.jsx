import React from 'react';
import List from './List';
import styles from './projects.module.css';

function Projects() {
  return (
    <section className={styles.container}>
      <List />
    </section>
  );
}

export default Projects;
