import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Tablehome from 'Components/Shared/Tablehome';
import { useState, useEffect } from 'react';
import Tableproject from 'Components/Shared/Tableproject';

// ARREGLAR EL TABLEPROJECTS PARA Q TENGA 2 TABS, POR TASKS Y POR EMPLOYEES (TRABAJAR LA DATA EN LA TABLA POR PROJECTS)
// PONER EL BOTON PARA AGREGAR TASKS (ADENTRO DE LA TABLA O POR FUERA ?)
// AGREGAR FUNCIONES ONADD, ONEDIT, ONDELETE
// VER CONEXION CON TIMESHEETS
function Home() {
  const [screen, setScreen] = useState(false);
  const [data, setData] = useState([]);
  const [idProject, setIdProject] = useState('');
  let headers = [];
  let keys = [];
  let title = '';
  const role = 'SUPERADMIN';
  role === 'SUPERADMIN' ? (title = 'ADMINS') : (title = 'PROJECTS');
  useEffect(() => {
    // if para el home, else para el open project
    if (idProject === '') {
      // aca despues hago un switch con la peticion nueva de projects asociados al employee
      if (role === 'SUPERADMIN') {
        fetch(`${process.env.REACT_APP_API_URL}/admins`)
          .then((response) => response.json())
          .then((data) => setData(data.data));
      }
      if (role === 'ADMIN') {
        fetch(`${process.env.REACT_APP_API_URL}/projects`)
          .then((response) => response.json())
          .then((data) => setData(data.data));
      }
      if (role === 'PM' || role === 'EMPLOYEE') {
        fetch(`${process.env.REACT_APP_API_URL}/projects`)
          .then((response) => response.json())
          .then((data) => setData(data.data));
      }
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${idProject}`)
        .then((response) => response.json())
        .then((data) => {
          title = data.data.name;
          setData([
            {
              name: data.data.name,
              description: data.data.description,
              clientName: data.data.clientName,
              startDate: data.data.startDate,
              endDate: data.data.endDate,
              team: data.data.team,
              tasks: data.data.tasks,
              isDeleted: data.data.isDeleted
            }
          ]);
          setIdProject('');
        });
    }
  }, [screen]);

  if (role === 'SUPERADMIN') {
    headers = ['Email', 'Password', 'Is Active ?'];
    keys = ['email', 'password', 'active'];
  } else {
    headers = ['Name', 'Description', 'Client Name', 'Start Date', 'End Date', 'Team', 'Tasks'];
    keys = ['name', 'description', 'clientName', 'startDate', 'endDate', 'team', 'tasks'];
  }

  const switcher = () => {
    setScreen(!screen);
  };
  if (screen) {
    return (
      <>
        <Sidebar></Sidebar>
        <Tableproject
          switcher={switcher}
          title={title}
          role={role}
          headers={headers}
          keys={keys}
          data={data}
        />
      </>
    );
  } else {
    return (
      <section className={styles.container}>
        <Sidebar></Sidebar>
        <h2>Home</h2>
        <Tablehome
          switcher={switcher}
          title={title}
          role={role}
          headers={headers}
          keys={keys}
          data={data}
          selectedProject={setIdProject}
        />
      </section>
    );
  }
}

export default Home;
