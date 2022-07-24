import React from 'react';
import Sidebar from '../Shared/Sidebar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as thunksAdmins from '../../redux/admins/thunks';
import {
  validationsFormSuperadminCreate,
  validationsFormSuperadminEdit
} from 'Components/Home/validations';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Loader from 'Components/Shared/Loader';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import styles from './home.module.css';
import Tablehome from 'Components/Shared/Tablehome';

const superAdminHome = () => {
  const dispatch = useDispatch();
  let message = useSelector((state) => state.projects.message);
  const [showModalResponse, setShowModalResponse] = useState(false);
  const [method, setMethod] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalDeleteResponse, setshowModalDeleteResponse] = useState(false);
  const [screen, setScreen] = useState(false);
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  let isLoading = useSelector((state) => state.projects.isFetching);
  let adminsList = useSelector((state) => state.admins.list);
  let projectsError = useSelector((state) => state.projects.error);
  let adminsError = useSelector((state) => state.admins.error);
  // ROLE
  let role = useSelector((state) => state.auth.authenticated.role);
  let title = 'SUPERADMIN';

  useEffect(() => {
    dispatch(thunksAdmins.getAdmins());
  }, [screen, message]);

  let headers = ['Email', 'Is Active ?'];
  let keys = ['email', 'active'];
  let validator;

  if (method === 'POST') {
    validator = validationsFormSuperadminCreate;
  } else {
    validator = validationsFormSuperadminEdit;
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

  // CAMBIA LA PANTALLA
  const switcher = () => {
    setScreen(!screen);
  };
  // SELECCIONA EL PROYECTO PARA PASAR A LA OTRA TABLA
  let adminSelected = adminsList.filter((admin) => admin._id === id);

  // SLIDER EN SUPERADMIN HOME
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

  // DELETE FUNCTION
  const onDelete = () => {
    dispatch(thunksAdmins.deleteAdmin(id));
    setShowModalDelete(false);
    setshowModalDeleteResponse(true);
    setMethod('');
  };

  const onSubmit = (data) => {
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
  };

  // RESETS EN EL EDIT CON REACT HOOK FORMS
  const handleModal = (request, id) => {
    setId(id);
    setMethod(request);
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

    setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <Sidebar></Sidebar>
      {/* modal con mensaje de exito o error */}
      <Modal
        showModal={showModalDelete}
        handleClose={() => setShowModalDelete(false)}
        modalTitle={'DELETE'}
      >
        {`are you sure you want to delete the ${adminSelected[0]?.firstName} ${adminSelected[0]?.lastName} admin?`}
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
      <Tablehome
        openModal={handleModal}
        switcher={switcher}
        title={title}
        role={role}
        headers={headers}
        keys={keys}
        activeChanger={activeChanger}
        data={adminsList}
        setId={setId}
        onDelete={() => {
          setShowModalDelete(true);
        }}
      />
    </section>
  );
};

export default superAdminHome;
