import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Button from 'Components/Shared/Button';
import Form from 'Components/Shared/Form';
import Modal from 'Components/Shared/Modal';
import Sidebar from 'Components/Shared/Sidebar';
import Table from 'Components/Shared/Table';
import Loader from 'Components/Shared/Loader/index.jsx';
import styles from 'Components/SuperAdmins/super-admins.module.css';
import * as thunks from 'redux/superadmins/thunks';
import * as actions from 'redux/superadmins/actions';

function SuperAdmins() {
  const headers = [
    '_id',
    'firstName',
    'lastName',
    'email',
    'password',
    'active',
    'createdAt',
    'updatedAt'
  ];
  const dispatch = useDispatch();
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .lowercase()
      .regex(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: Joi.string()
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
      .required(),
    active: Joi.boolean()
  });

  const superAdminsList = useSelector((state) => state.superAdmins.list);
  const message = useSelector((state) => state.superAdmins.message);
  const response = useSelector((state) => state.superAdmins.response);
  const isFetching = useSelector((state) => state.superAdmins.isFetching);
  const method = useSelector((state) => state.superAdmins.method);
  const modalShowForm = useSelector((state) => state.superAdmins.showFormAddEdit);
  const showModalDelete = useSelector((state) => state.superAdmins.showModalDelete);
  const showModalMessage = useSelector((state) => state.superAdmins.showModalMessage);
  // const [active, setActive] = useState(true);
  const [ids, setId] = useState('');
  const [deleteId, setDeleteId] = useState('');

  useEffect(() => {
    dispatch(thunks.getSuperadmins());
    if (method !== 'PUT') {
      reset({});
    }
  }, [method]);
  // functions for reset o complete inputs
  const fillForm = (id) => {
    const valuesForm = superAdminsList.find((superadmin) => superadmin._id === id);
    reset({
      firstName: valuesForm.firstName,
      lastName: valuesForm.lastName,
      email: valuesForm.email,
      password: valuesForm.password,
      active: valuesForm.active === 'true' ? true : false
    });
  };
  // modals
  const closeModals = () => {
    dispatch(actions.closeModals());
  };
  const closeModalMessage = () => {
    dispatch(actions.closeModalMessage());
  };
  const onAdd = () => {
    dispatch(actions.showFormAddEdit('POST'));
    reset({});
  };
  const onEdit = async (id) => {
    dispatch(actions.showFormAddEdit('PUT'));
    setId(id);
    fillForm(id);
  };
  const onDelete = (id) => {
    dispatch(actions.showModalDelete('DELETE'));
    setDeleteId(id);
  };
  // disptachs for CRUD
  const deleteAdmin = async () => {
    dispatch(thunks.deleteSuperadmin(deleteId));
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    const superAdmin = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      active: Boolean(data.active)
    };
    console.log(data);
    if (method === 'POST') {
      dispatch(thunks.addSuperadmin(superAdmin));
    } else if (method === 'PUT') {
      dispatch(thunks.editSuperadmins(superAdmin, ids));
    } else {
      alert('Something unexpected happened');
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    // setValue,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  const formData = getValues('active');
  console.log(formData);
  // console.log(errors);
  return (
    <>
      <Loader isLoading={isFetching} />
      <div>
        <Sidebar />
      </div>
      <section className={styles.container}>
        <Modal showModal={showModalDelete} handleClose={closeModals} modalTitle={`DELETE`}>
          <Loader isLoading={isFetching} />
          <h4>Are you sure you want to delete the SuperAdmin?</h4>
          <div className={styles.buttonsDeleteModal}>
            <Button onClick={deleteAdmin} width={'100%'} height={'25px'} fontSize={'15px'}>
              Accept
            </Button>
          </div>
          <div className={styles.buttonsDeleteModal}>
            <Button onClick={closeModals} width={'100%'} height={'25px'} fontSize={'15px'}>
              Cancel
            </Button>
          </div>
        </Modal>
        <Form
          title={method === 'POST' ? 'Create Superadmin' : 'Edit Superadmin'}
          showModal={modalShowForm}
          handleSubmit={handleSubmit(onSubmit)}
          handleClose={closeModals}
        >
          <Loader isLoading={isFetching} />
          <div className={styles.inputsForm}>
            <label htmlFor="firstName">First Name</label>
            <input {...register('firstName')} name="firstName" type="text" placeholder="John" />
            {errors.firstName?.type === 'string.empty' && (
              <p className={styles.error}>{errors.firstName.message}</p>
            )}
            {errors.firstName?.type === 'string.min' && (
              <p className={styles.error}>{errors.firstName.message}</p>
            )}
          </div>
          <div className={styles.inputsForm}>
            <label htmlFor="lastName">Last Name</label>
            <input {...register('lastName')} name="lastName" type="text" placeholder="Doe" />
            {errors.lastName?.type === 'string.empty' && (
              <p className={styles.error}>{errors.lastName.message}</p>
            )}
            {errors.lastName?.type === 'string.min' && (
              <p className={styles.error}>{errors.lastName.message}</p>
            )}
          </div>
          <div className={styles.inputsForm}>
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              name="email"
              type="text"
              placeholder="trackgenix@radium.com"
            />
            {errors.email?.type === 'string.empty' && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
            {errors.email?.type === 'string.email' && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.inputsForm}>
            <label htmlFor="password">Password</label>
            <input {...register('password')} type="password" />
            {errors.password?.type === 'string.empty' && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
            {errors.password?.type === 'string.pattern.base' && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.inputsForm}>
            <div>
              <label>Active</label>
            </div>
            <div>
              <input
                type="checkbox"
                className={styles.inputsDivs}
                {...register('active')}
                // checked={!formData}
                // onChange={setValue('active', getValues('active'))}
              />
            </div>
          </div>
        </Form>
        <Modal
          showModal={showModalMessage}
          handleClose={closeModalMessage}
          modalTitle={response ? 'SUCCESS' : 'WARNING'}
        >
          {message}
        </Modal>
        <Table
          title={'Super Admins'}
          data={superAdminsList}
          headers={headers}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </section>
    </>
  );
}

export default SuperAdmins;
