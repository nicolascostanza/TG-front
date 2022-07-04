import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Tablehome from '../Shared/Tablehome';
import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import Loader from 'Components/Shared/Loader/index.jsx';
// import * as thunks from 'redux/projects/thunks';

function Home() {
  // const dispatch = useDispatch();
  // const rolessss = useSelector((state) => state.auth.authenticated?.role);
  // console.log(rolessss);
  const headers = [
    'firstName',
    'lastName',
    'email',
    'password',
    'active',
    'createdAt',
    'updatedAt'
  ];
  let title = '';
  const role = 'ADMIN';
  role === 'SUPERADMIN' ? (title = 'ADMINS') : (title = 'PROJECTS');
  const [screen, setScreen] = useState(false);
  const [idProject, setIdProject] = useState('');
  const [prueba, setPrueba] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admins`)
      .then((response) => response.json())
      .then((data) => setPrueba(data.data));
    // fetch(`${process.env.REACT_APP_API_URL}/projects`)
    //   .then((response) => response.json())
    //   .then((data) => setPrueba(data.data));
  }, []);
  // PARA LAS FUNCIONES DE LA TABLA
  // switch (role) {
  //   case 'SUPERADMIN':
  //     console.log('SUPERADMIN');
  //     break;
  //   case 'ADMIN':
  //     console.log('ADMIN');
  //     break;
  //   case 'PM':
  //     console.log('PM');
  //     break;
  //   case 'EMPLOYEE':
  //     console.log('EMPLOYEE');
  //     break;
  //   default:
  //     console.log('No tengo mascota');
  //     break;
  // }
  console.log(idProject);
  const switcher = () => {
    setScreen(!screen);
  };
  if (screen) {
    return (
      <>
        <h1>TABLA DEL PROJECTO</h1>
        <Tablehome
          switcher={switcher}
          title={title}
          role={role}
          headers={headers}
          keys={headers}
          data={prueba}
          goback={true}
        />
        <button onClick={() => switcher()}>GO BACK</button>
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
          keys={headers}
          data={prueba}
          selectedProject={setIdProject}
        />
      </section>
    );
  }
}

export default Home;
