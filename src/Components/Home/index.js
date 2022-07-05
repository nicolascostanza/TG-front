import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Tablehome from 'Components/Shared/Tablehome';
import { useState, useEffect } from 'react';
import Tableproject from 'Components/Shared/Tableproject';

// HACER HEADERS PARA SUPERADMINS APARTE
// CAMBIAR EL HEADERS CON EL NUEVO SCHEMA DE PROJECTS
// ARREGLAR EL TABLEPROJECTS PARA Q TENGA 2 TABS, POR TASKS Y POR EMPLOYEES
// PONER EL BOTON PARA AGREGAR TASKS (ADENTRO DE LA TABLA O POR FUERA ?)
// AGREGAR FUNCIONES ONADD, ONEDIT, ONDELETE
// VER CONEXION CON TIMESHEETS
function Home() {
  const [screen, setScreen] = useState(false);
  const [data, setData] = useState([]);
  const [idProject, setIdProject] = useState('');
  const headersProject = [
    'name',
    'description',
    'clientName',
    'startDate',
    'endDate',
    'projectManager'
    // 'updatedAt'
  ];
  let title = '';
  const role = 'ADMIN';
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
  const switcher = () => {
    setScreen(!screen);
  };
  if (screen) {
    return (
      <>
        <Tableproject
          switcher={switcher}
          title={title}
          role={role}
          headers={headersProject}
          keys={headersProject}
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
          headers={headersProject}
          keys={headersProject}
          data={data}
          selectedProject={setIdProject}
        />
      </section>
    );
  }
}

export default Home;
