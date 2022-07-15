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
  // validationsFormAddEmployee
} from 'Components/Home/validations';
import * as thunksProjects from '../../redux/projects/thunks';
import * as thunksAdmins from '../../redux/admins/thunks';

// HACER Q APAREZCAN LOS DATOS AL REVEZ
// SETEAR LOS VALORES EN EDIT HOME
// DROPWDOWN
// VER NOMBRE Y APELLIDO DE EMPLOYEES
function Home() {
  const [screen, setScreen] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [method, setMethod] = useState('');
  const [request, setRequest] = useState(false);
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

  console.log('proyectsssssss: ', projectsList);

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
  }, [screen, request]);

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
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validator)
  });
  const switcher = () => {
    setScreen(!screen);
  };
  const handleModal = (request, id) => {
    setId(id);
    setShowModal(!showModal);
    setMethod(request);
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
        <Modal
          showModal={showModalEmployee}
          handleClose={() => setShowModalEmployee(false)}
          modalTitle={'ADD EMPLOYEE'}
        >
          <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="employee id">Employee Id</label>
              <input
                type="text"
                placeholder="Employee Id"
                {...register('employeeId')}
                error={appendErrors.employeeId?.message}
              />
              {errors.employeeId && (
                <p className={styles.errorInput}>{errors.employeeId?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <input
                type="text"
                placeholder="Dev"
                {...register('role')}
                error={appendErrors.role?.message}
              />
              {errors.role && <p className={styles.errorInput}>{errors.role?.message}</p>}
            </div>
            <div>
              <label htmlFor="Rate">Rate</label>
              <input
                type="number"
                placeholder="500"
                {...register('rate')}
                error={appendErrors.rate?.message}
              />
              {errors.rate && <p className={styles.errorInput}>{errors.rate?.message}</p>}
            </div>
            <div className={styles.checkbox}>
              <label htmlFor="isPm">Is PM ?</label>
              <input
                className={styles.inputsProfile}
                type="checkbox"
                name="isPm"
                {...register('isPm')}
              />
            </div>
            <div className={styles.buttonsContainer}>
              <Button width={'75px'} height={'30px'} type="submit" value="GO">
                ADD EMPLOYEE
              </Button>
            </div>
          </form>
        </Modal>
        <Tableproject
          setRequest={setRequest}
          idProject={id}
          openModal={() => setShowModalEmployee(true)}
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
            handleClose={handleModal}
            modalTitle={method === 'POST' ? 'ADD ADMIN' : 'EDIT ADMIN'}
          >
            <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email">Email</label>
                <input
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
                  className={styles.inputsProfile}
                  type="checkbox"
                  name="active"
                  {...register('active')}
                />
              </div>
              <div className={styles.buttonsContainer}>
                <Button width={'75px'} height={'30px'} type="submit" value="CONTINUE">
                  {method === 'POST' ? 'CREATE' : 'EDIT'}
                </Button>
              </div>
            </form>
          </Modal>
        ) : (
          <Modal
            showModal={showModal}
            handleClose={handleModal}
            modalTitle={method === 'POST' ? 'ADD PROJECT' : 'EDIT PROJECT'}
          >
            <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name">Name</label>
                <input
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
                  type="date"
                  {...register('startDate')}
                  error={appendErrors.startDate?.message}
                />
                {errors.startDate && (
                  <p className={styles.errorInput}>{errors.startDate?.message}</p>
                )}
              </div>
              <div className={styles.buttonsContainer}>
                <Button width={'75px'} height={'30px'} type="submit" value="CONTINUE">
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
