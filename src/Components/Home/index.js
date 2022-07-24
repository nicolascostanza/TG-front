import styles from './home.module.css';
import Sidebar from '../Shared/Sidebar';
import Tablehome from 'Components/Shared/Tablehome';
import Loader from 'Components/Shared/Loader';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import Tableproject from 'Components/Shared/Tableproject';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
// VER
// PQ LA FECHA SETEA SE ME SETEA UN DIA DESPUES ? ZONA HORARIA ?
// cambiar modal de task created
// hay q traer el current user con el role (ESTA HARDCODEADO)

// HACER
// MENSAJES ESPECIFICOS EN ERRORES DEL MODAL
// el update task deberia actualizar solo la fecha cada vez q edito
// MOSTRAMOS EL DESCRIPTION PROYECT ? MAS CORTO O COMO HACEMOS ?
// TOMAR EL ROLE DE REDUX (en table home, en tableHome y en tableProject)
// VER COMO HACEMOS PARA Q AL CREAR UN PROYECTO Y ENTRAR NO ROMPA LA TABLA (NULL CHECKER VER)
function Home() {
  let headers = [];
  let keys = [];
  let validator;
  let title = '';
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
  const role = 'ADMIN';
  // let role = useSelector((state) => state.auth.authenticated.role);
  role === 'SUPERADMIN' ? (title = 'ADMINS') : (title = 'PROJECTS');
  // const currentUser = useSelector((state) => state.currentUser.currentUser);
  // const authRole = () => {
  //   role = useSelector((state) => state.auth.authenticated.role);
  // }

  useEffect(() => {
    if (id === '') {
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
  // REACT HOOK FORMS
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validator)
  });
  // MANDA SOLO LOS PROYECTOS RELACIONADOS A SU ROLE
  const dataProjects = (rol) => {
    if (rol === 'ADMIN') {
      return projectsList;
    } else {
      return userCurrent.associatedProjects;
    }
  };
  // CAMBIA LA PANTALLA
  const switcher = () => {
    setScreen(!screen);
  };
  // SELECCIONA EL PROYECTO PARA PASAR A LA OTRA TABLA
  let projectSelected = projectsList.filter((project) => project._id === id);
  let adminSelected = adminsList.filter((admin) => admin._id === id);
  // RESETS EN EL EDIT CON REACT HOOK FORMS
  const handleModal = (request, id) => {
    setId(id);
    setMethod(request);
    if (role === 'SUPERADMIN') {
      if (request === 'POST') {
        reset({
          email: '',
          password: '',
          active: false
        });
      } else {
        let selected = adminsList.filter((admin) => admin._id === id);
        reset({
          email: selected[0].email,
          password: selected[0].password,
          active: selected[0].active
        });
      }
    } else {
      if (request === 'POST') {
        reset({
          name: '',
          description: '',
          clientName: '',
          startDate: '',
          endDate: ''
        });
      } else {
        let selected = projectsList.filter((admin) => admin._id === id);
        reset({
          name: selected[0].name,
          description: selected[0].description,
          clientName: selected[0].clientName,
          startDate: selected[0].startDate.substring(0, 10),
          endDate: selected[0].endDate.substring(0, 10)
        });
      }
    }
    setShowModal(true);
  };
  // SLIDER EN SUPERADMIN HOME
  const activeChanger = async (data, id) => {
    dispatch(
      thunksAdmins.updateAdmin(
        {
          active: data.active === true ? false : true
        },
        id
      )
      // if (role === 'EMPLOYEE') {
      //   return (
      //     <section className={styles.container}>
      //       <Sidebar></Sidebar>
      //       <Button
      //         width={'175px'}
      //         height={'40px'}
      //         onClick={() => history.push('/employees/profile')}
      //         value="employee profile"
      //       >
      //         Employee profile
      //       </Button>
      //     </section>
    );
  };
  // DELETE FUNCTION
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
        // const dataFormatted = {
        //   name: data.name,
        //   description: data.description,
        //   clientName: data.clientName,
        //   startDate: data.startDate
        //   // endDate: data.endDate.length > 1 ? data.endDate : ''
        // };
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
          idProject={id}
          switcher={switcher}
          title={title}
          roleUser={role}
          dataTeam={dataTeam}
          dataTasks={dataTasks}
        />
      </>
      //   <Button
      //     width={'130px'}
      //     height={'40px'}
      //     onClick={() => history.push('/admins/profile')}
      //     value="admin profile"
      //   >
      //     Admin profile
      //   </Button>
      // </section>
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
          <Button
            onClick={() => setShowModalDelete(false)}
            id="deleteCancel"
            width={'75px'}
            height={'30px'}
            type="submit"
            value="cancelDelete"
          >
            CANCEL
          </Button>
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
              <div>
                <Button
                  onClick={() => setShowModal(false)}
                  id="addModalEmployeeCancel"
                  width={'75px'}
                  height={'30px'}
                  type="submit"
                  value="cancelEmoployee"
                >
                  CANCEL
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
                <input id="startdateProject" type="date" {...register('startDate')} />
              </div>
              <div>
                <label htmlFor="end date">End Date</label>
                <input id="endDateProject" type="date" {...register('endDate')} />
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
              <div>
                <Button
                  onClick={() => setShowModal(false)}
                  id="addModalEmployeeCancel"
                  width={'75px'}
                  height={'30px'}
                  type="submit"
                  value="cancelEmoployee"
                >
                  CANCEL
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
