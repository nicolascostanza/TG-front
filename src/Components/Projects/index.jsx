import React from 'react';
import List from './List';
import CreateProject from './CreateProject';
import styles from './projects.module.css';

function Projects(props) {
  const { form } = props;
  return <section className={styles.container}>{form ? <CreateProject /> : <List />}</section>;
}

export default Projects;
