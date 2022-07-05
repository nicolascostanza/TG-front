import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Tablehome from 'Components/Shared/Tablehome';
import Modal from 'Components/Shared/Loader';
import Button from 'Components/Shared/Button';
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
  const [modalDelete, setModalDelete] = useState(false);
  let headers = [];
  let keys = [];
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
    }
  }, [screen]);
  // headers and keys
  if (role === 'SUPERADMIN') {
    headers = ['Email', 'Password', 'Is Active ?'];
    keys = ['email', 'password', 'active'];
  } else {
    headers = ['Name', 'Description', 'Client Name', 'Start Date', 'End Date', 'Tasks', 'Team'];
    keys = ['name', 'description', 'clientName', 'startDate', 'endDate', 'tasks', 'team'];
  }
  // funciones para crud
  const switcher = () => {
    setScreen(!screen);
  };
  if (screen) {
    const info = data.filter((data) => data._id === idProject);
    // console.log(info[0].tasks);
    const dataTeam = info[0].team;
    const dataTasks = info[0].tasks;
    console.log(dataTasks);
    return (
      <>
        <Sidebar></Sidebar>
        <Tableproject
          idProject={idProject}
          switcher={switcher}
          title={title}
          roleUser={role}
          headers={['ID', 'Name', 'Last Name', 'Role', 'Rate']}
          keys={['employeeId', 'role', 'rate']}
          dataTeam={dataTeam}
          dataTasks={dataTasks}
        />
      </>
    );
  } else {
    return (
      <section className={styles.container}>
        <Sidebar></Sidebar>
        <h2>Home</h2>
        <Modal
          showModal={modalDelete}
          handleClose={() => setModalDelete(!modalDelete)}
          modalTitle={`DELETE`}
        >
          <h4>Are you sure you want to delete the SuperAdmin?</h4>
          <div className={styles.buttonsDeleteModal}>
            <Button width={'100%'} height={'25px'} fontSize={'15px'}>
              Accept
            </Button>
          </div>
          <div className={styles.buttonsDeleteModal}>
            <Button width={'100%'} height={'25px'} fontSize={'15px'}>
              Cancel
            </Button>
          </div>
        </Modal>
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
