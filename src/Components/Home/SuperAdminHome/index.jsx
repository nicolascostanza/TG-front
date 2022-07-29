import React from 'react';
import Sidebar from 'Components/Shared/Sidebar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as thunksAdmins from 'redux/admins/thunks';
import {
  validationsFormSuperadminCreate,
  validationsFormSuperadminEdit
} from 'Components/Home/validations';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Loader from 'Components/Shared/Loader';
import Modal from 'Components/Shared/Modal';
import styles from '../home.module.css';
import Tablehome from 'Components/Shared/Tablehome';

const SuperAdminHome = () => {
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
  let title = 'SUPERADMIN';

  useEffect(() => {
    dispatch(thunksAdmins.getAdmins());
  }, [screen, message]);

  const headers = ['Email', 'Is Active ?'];
  const keys = ['email', 'active'];
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
  // let adminSelected = adminsList.filter((admin) => admin._id === id);

  // SLIDER EN SUPERADMIN HOME
  const activeChanger = async (data, id) => {
    dispatch(
      thunksAdmins.updateAdmin(
        {
          active: data.active ? false : true
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
      <Modal
        showModal={showModalDelete}
        handleClose={() => setShowModalDelete(false)}
        modalTitle={'DELETE'}
      >
        <div className={styles.modal}>
          <p>Are you sure you want to delete the admin?</p>
          <button onClick={onDelete}>
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
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
      ></Modal>
      <Loader isLoading={isLoading} />
      <Modal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        modalTitle={method === 'POST' ? 'ADD ADMIN' : 'EDIT ADMIN'}
      >
        <form className={styles.formEditAdmin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.labelInput}>
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
          <div className={styles.labelInput}>
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
          <div className={styles.checkboxAdm}>
            <label htmlFor="active">Active</label>
            <input
              id="activeAdmin"
              className={styles.inputsProfile}
              type="checkbox"
              name="active"
              {...register('active')}
            />
          </div>
          <div className={styles.modalAddEdit}>
            <button
              id="buttonSuperadminCreate"
              className={styles.buttonAddEdit}
              type="submit"
              value="CONTINUE"
            >
              {method === 'POST' ? (
                <i className="fa-solid fa-check" />
              ) : (
                <i className="fa-solid fa-pencil" />
              )}
            </button>
          </div>
        </form>
      </Modal>
      <Tablehome
        openModal={handleModal}
        switcher={switcher}
        title={title}
        role={'SUPERADMIN'}
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

export default SuperAdminHome;
