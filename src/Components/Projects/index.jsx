import React from 'react';
import List from './List';
import CreateProject from './CreateProject';
import styles from './projects.module.css';
import Table from '../Shared/Table';
import { useState, useEffect } from 'react';

function Projects(props) {
  const { form } = props;
  const [list, setList] = useState([]);
  useEffect(() => {
    requestList();
  }, []);
  const requestList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        response.data.map((superadmin) => {
          superadmin.active = superadmin.active ? 'true' : 'false';
        });
        setList(response.data);
      });
  };
  return (
    <div>
      <section className={styles.container}>{form ? <CreateProject /> : <List />}</section>;
      <Table data={list} title={['name', 'description']} />
    </div>
  );
}

export default Projects;
