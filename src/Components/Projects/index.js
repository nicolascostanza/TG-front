import React from 'react';
import List from './List';
import AddProject from './AddProject';
import styles from './projects.module.css';

function Projects(props) {
  const { create } = props;
  return <section className={styles.container}>{create ? <AddProject /> : <List />}</section>;
}

export default Projects;
