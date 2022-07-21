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
// CORREGIR LOS PMS, EN EL REDUCER PARA Q ACTUALICE
// MODALES mostrar mensajes (hice add project, edit project, falta corregir reducers y mensajes en delete, y admins (add, edit, delete))
// mensajes en tableproject, de employees y tasks en modales, faltan todos
// TOMAR EL ROLE DE REDUX (en table home, en tableHome y en tableProject)
// falta q este isactive o no (superadmin) (lo hacemos mañana)
// CORREGIR LOS SETEOS DE FECHAS EN EL RESET HOOKS FORM
// VER COMO HACEMOS PARA Q AL CREAR UN PROYECTO Y ENTRAR NO ROMPA LA TABLA (NULL CHECKER VER)

// A VER:
// ver el reducers de employee in project (edit pm)
// si devuelve la data de proyectos asociados o todos, en el table home (si es admin o employee)

function Home() {
  const [screen, setScreen] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalResponse, setShowModalResponse] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalDeleteResponse, setshowModalDeleteResponse] = useState(false);
  const [method, setMethod] = useState('');
  const dispatch = useDispatch();
  let isLoading = useSelector((state) => state.projects.isFetching);
  let projectsError = useSelector((state) => state.projects.error);
  let adminsError = useSelector((state) => state.admins.error);
  let projectsList = useSelector((state) => state.projects.list);
  let adminsList = useSelector((state) => state.admins.list);
  let userCurrent = useSelector((state) => state.currentUser.currentUser);
  let message = useSelector((state) => state.projects.message);
  let headers = [];
  let keys = [];
  let validator;
  let title = '';
  const role = 'SUPERADMIN';
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
  }, [screen, message]);
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
  const dataProjects = (rol) => {
    if (rol === 'ADMIN') {
      return projectsList;
    } else {
      return userCurrent.associatedProjects;
    }
  };
  const switcher = () => {
    setScreen(!screen);
  };
  // elijo proyecto
  let projectSelected = projectsList.filter((project) => project._id === id);
  let adminSelected = adminsList.filter((admin) => admin._id === id);
  // modal reset values
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
  const activeChanger = async (data, id) => {
    dispatch(
      thunksAdmins.updateAdmin(
        {
          active: data.active === true ? false : true
        },
        id
      )
    );
  };
  const onDelete = () => {
    if (role === 'SUPERADMIN') {
      dispatch(thunksAdmins.deleteAdmin(id));
      setShowModalDelete(false);
      setshowModalDeleteResponse(true);
      setMethod('');
    } else {
      dispatch(thunksProjects.deleteProject(id));
      setShowModalDelete(false);
      setshowModalDeleteResponse(true);
      setMethod('');
    }
  };
  console.log(errors);
  const onSubmit = (data) => {
    if (role === 'SUPERADMIN') {
      if (method === 'POST') {
        dispatch(thunksAdmins.addAdmin(data));
        setShowModalResponse(true);
      } else if (method === 'PUT') {
        dispatch(thunksAdmins.updateAdmin(data, id));
        setShowModalResponse(true);
        setMethod('');
      } else {
        dispatch(thunksAdmins.deleteAdmin(id));
        setShowModalResponse(true);
      }
    } else {
      if (method === 'POST') {
        dispatch(thunksProjects.addNewProject(data));
        setShowModal(false);
        setShowModalResponse(true);
        setMethod('');
      } else if (method === 'PUT') {
        dispatch(thunksProjects.updateProject(data, id));
        setShowModal(false);
        setShowModalResponse(true);
        setMethod('');
      } else {
        // cambio isdeleted a true
        dispatch(thunksProjects.deleteProject(id));
        setShowModal(false);
        setShowModalResponse(true);
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
        {/* modal con mensaje de exito o error */}
        <Modal
          showModal={showModalDelete}
          handleClose={() => setShowModalDelete(false)}
          modalTitle={'DELETE'}
        >
          {role === 'SUPERADMIN'
            ? `are you sure you want to delete the ${adminSelected[0]?.firstName} ${adminSelected[0]?.lastName} admin?`
            : `are you sure you want to delete the ${projectSelected[0]?.name} project?`}
          <Button onClick={onDelete}>DELETE</Button>
        </Modal>
        <Modal
          showModal={showModalResponse}
          handleClose={() => setShowModalResponse(false)}
          modalTitle={projectsError || adminsError ? 'WARNING' : 'SUCCESS'}
        >
          {message}
        </Modal>
        <Modal
          showModal={showModalDeleteResponse}
          handleClose={() => setshowModalDeleteResponse(false)}
          modalTitle={`DELETED`}
        >
          <Button onClick={() => setshowModalDeleteResponse(false)}>OK</Button>
        </Modal>

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
          activeChanger={activeChanger}
          data={role === 'SUPERADMIN' ? adminsList : dataProjects(role)}
          setId={setId}
          onDelete={() => {
            setShowModalDelete(true);
          }}
        />
      </section>
    );
  }
}

export default Home;
