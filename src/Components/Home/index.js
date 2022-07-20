import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Tablehome from 'Components/Shared/Tablehome';
import Loader from 'Components/Shared/Loader';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
//import Form from 'Components/Shared/Form';
// import Button from 'Components/Shared/Button';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Tableproject from 'Components/Shared/Tableproject';
import { useSelector } from 'react-redux';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  validationsFormProjectCreate,
  validationsFormProjectEdit,
  validationsFormSuperadminCreate,
  validationsFormSuperadminEdit
} from 'Components/Home/validations';
import * as thunksProjects from '../../redux/projects/thunks';
import * as thunksAdmins from '../../redux/admins/thunks';

// LO QUE FALTA
// falta q este isactive o no (superadmin)
// EL TABLE HOME FALTA Q MUESTRE SI ES PM O EMPLOYEE SOLO LOS PROYECT ASOCIADOS Y DE ULTIMO A PRIMERO
// SI LAS TABLAS NO TIENEN NADA Q MUESTRE UN MSJ Q NO HAY DISPONIBLES
// CORREGIR LOS SETEOS DE FECHAS EN EL RESET HOOKS FORM
// VER COMO HACEMOS PARA Q AL CREAR UN PROYECTO Y ENTRAR NO ROMPA LA TABLA (NULL CHECKER VER)

function Home() {
  const [screen, setScreen] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [method, setMethod] = useState('');
  const dispatch = useDispatch();
  let isLoading = useSelector((state) => state.projects.isFetching);
  let projectsError = useSelector((state) => state.projects.error);
  let adminsError = useSelector((state) => state.admins.error);
  let projectsList = useSelector((state) => state.projects.list);
  let adminsList = useSelector((state) => state.admins.list);
  let headers = [];
  let keys = [];
  let validator;
  let title = '';
  const role = 'ADMIN';
  role === 'SUPERADMIN' ? (title = 'ADMINS') : (title = 'PROJECTS');

  useEffect(() => {
    // dispatch(thunksAdmins.getAdmins());
    // if para el home, else para el open project
    if (id === '') {
      // aca despues hago un switch con la peticion nueva de projects asociados al employee
      if (role === 'SUPERADMIN') {
        dispatch(thunksAdmins.getAdmins());
      }
      if (role === 'ADMIN') {
        dispatch(thunksProjects.getProjects());
      }
      if (role === 'PM' || role === 'EMPLOYEE') {
        dispatch(thunksProjects.getProjects());
      }
    } else {
      dispatch(thunksProjects.getProjects());
    }
  }, [screen]);

  // headers and keys
  if (role === 'SUPERADMIN') {
    headers = ['Email', 'Password', 'Is Active ?'];
    keys = ['email', 'password', 'active'];
    if (method === 'POST') {
      validator = validationsFormSuperadminCreate;
    } else {
      validator = validationsFormSuperadminEdit;
    }
  } else {
    headers = ['Name', 'Description', 'Client Name', 'Start Date', 'End Date', 'Tasks', 'Team'];
    keys = ['name', 'description', 'clientName', 'startDate', 'endDate', 'tasks', 'team'];
    if (method === 'POST') {
      validator = validationsFormProjectCreate;
    } else {
      validator = validationsFormProjectEdit;
    }
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validator)
  });

  const switcher = () => {
    setScreen(!screen);
  };
  const handleModal = (request, id) => {
    setId(id);
    setMethod(request);
    // SETEO DE VALORES EN MODAL SUPERADMIN
    if (role === 'SUPERADMIN') {
      if (request === 'POST') {
        reset({
          email: '',
          password: '',
          active: false
        });
      } else {
        let selected = adminsList.filter((admin) => admin._id === id);
        console.log('selected:', selected);
        reset({
          email: selected[0].email,
          password: selected[0].password,
          active: selected[0].active
        });
      }
    } else {
      // SETEO DE VALORES EN MODAL PROJECTS
      if (request === 'POST') {
        reset({
          name: '',
          description: '',
          clientName: '',
          startDate: ''
        });
      } else {
        let selected = projectsList.filter((admin) => admin._id === id);
        reset({
          name: selected[0].name,
          description: selected[0].description,
          clientName: selected[0].clientName,
          startDate: selected[0].startDate
        });
      }
    }
    setShowModal(true);
  };
  const onDelete = (id) => {
    const resp = confirm('Borrar ?');
    if (role === 'SUPERADMIN') {
      if (resp) {
        dispatch(thunksAdmins.deleteAdmin(id));
        setMethod('');
      }
    } else {
      if (resp) {
        dispatch(thunksProjects.deleteProject(id));
        setMethod('');
      }
    }
  };
  console.log(errors);

  const onSubmit = (data) => {
    console.log('data', data);
    if (role === 'SUPERADMIN') {
      if (method === 'POST') {
        dispatch(thunksAdmins.addAdmin(data));
      } else if (method === 'PUT') {
        dispatch(thunksAdmins.updateAdmin(data, id));
        setMethod('');
      } else {
        // cambio isdeleted a true
        dispatch(thunksAdmins.deleteAdmin(id));
      }
      if (!adminsError) {
        setShowModal(false);
        setMethod('');
      }
    } else {
      if (method === 'POST') {
        dispatch(thunksProjects.addNewProject(data));
        setMethod('');
      } else if (method === 'PUT') {
        dispatch(thunksProjects.updateProject(data, id));
        setMethod('');
      } else {
        // cambio isdeleted a true
        dispatch(thunksProjects.deleteProject(id));
        setMethod('');
      }
      if (!projectsError) {
        setShowModal(false);
        setMethod('');
      }
    }
  };
  if (screen) {
    const info = projectsList.filter((project) => project?._id === id);
    const dataTeam = info[0].team;
    const dataTasks = info[0].tasks;
    return (
      <>
        <Sidebar></Sidebar>
        <Loader isLoading={isLoading} />
        <Tableproject
          // setRequest={setRequest}
          idProject={id}
          switcher={switcher}
          title={title}
          roleUser={role}
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
        <Loader isLoading={isLoading} />
        {role === 'SUPERADMIN' ? (
          <Modal
            showModal={showModal}
            handleClose={() => setShowModal(false)}
            modalTitle={method === 'POST' ? 'ADD ADMIN' : 'EDIT ADMIN'}
          >
            <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="emailAdmin"
                  type="email"
                  placeholder="example@gmail.com"
                  {...register('email')}
                  error={appendErrors.email?.message}
                />
                {errors.email && <p className={styles.errorInput}>{errors.email?.message}</p>}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="passwordAdmin"
                  type="password"
                  placeholder="password"
                  {...register('password')}
                  error={appendErrors.password?.message}
                />
                {errors.password && <p className={styles.errorInput}>{errors.password?.message}</p>}
              </div>
              <div className={styles.checkbox}>
                <label htmlFor="active">Active</label>
                <input
                  id="activeAdmin"
                  className={styles.inputsProfile}
                  type="checkbox"
                  name="active"
                  {...register('active')}
                />
              </div>
              <div className={styles.buttonsContainer}>
                <Button
                  id="buttonSuperadminCreate"
                  width={'75px'}
                  height={'30px'}
                  type="submit"
                  value="CONTINUE"
                >
                  {method === 'POST' ? 'CREATE' : 'EDIT'}
                </Button>
              </div>
            </form>
          </Modal>
        ) : (
          <Modal
            showModal={showModal}
            handleClose={() => setShowModal(false)}
            modalTitle={method === 'POST' ? 'ADD PROJECT' : 'EDIT PROJECT'}
          >
            <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="nameProject"
                  type="text"
                  placeholder="Name"
                  {...register('name')}
                  error={appendErrors.name?.message}
                />
                {errors.name && <p className={styles.errorInput}>{errors.name?.message}</p>}
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  id="descriptionProject"
                  type="text"
                  placeholder="Description"
                  {...register('description')}
                  error={appendErrors.description?.message}
                />
                {errors.description && (
                  <p className={styles.errorInput}>{errors.description?.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="client">Client</label>
                <input
                  id="clientProject"
                  type="text"
                  placeholder="Client"
                  {...register('clientName')}
                  error={appendErrors.clientName?.message}
                />
                {errors.clientName && (
                  <p className={styles.errorInput}>{errors.clientName?.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="start date">Start Date</label>
                <input
                  id="startdateProject"
                  type="date"
                  {...register('startDate')}
                  error={appendErrors.startDate?.message}
                />
                {errors.startDate && (
                  <p className={styles.errorInput}>{errors.startDate?.message}</p>
                )}
              </div>
              <div className={styles.buttonsContainer}>
                <Button
                  id="buttonProjects"
                  width={'75px'}
                  height={'30px'}
                  type="submit"
                  value="CONTINUE"
                >
                  {method === 'POST' ? 'CREATE' : 'EDIT'}
                </Button>
              </div>
            </form>
          </Modal>
        )}
        <Tablehome
          openModal={handleModal}
          switcher={switcher}
          title={title}
          role={role}
          headers={headers}
          keys={keys}
          data={role === 'SUPERADMIN' ? adminsList : projectsList}
          selected={setId}
          onDelete={onDelete}
        />
      </section>
    );
  }
}

export default Home;
