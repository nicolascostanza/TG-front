import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Button from '../Shared/Button';
import Form from '../Shared/Form';
import Modal from '../Shared/Modal';
import Sidebar from '../Shared/Sidebar';
import Table from '../Shared/Table';
import Loader from '../Shared/Loader/index.jsx';
import styles from './super-admins.module.css';
import * as thunks from '../../redux/superadmins/thunks';
import * as actions from '../../redux/superadmins/actions';

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
    firstName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required()
      .regex(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: Joi.string()
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
      .required(),
    active: Joi.boolean()
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const superAdminsList = useSelector((state) => state.superAdmins.list);
  const message = useSelector((state) => state.superAdmins.message);
  const response = useSelector((state) => state.superAdmins.response);
  const isFetching = useSelector((state) => state.superAdmins.isFetching);
  const method = useSelector((state) => state.superAdmins.method);
  const modalShowForm = useSelector((state) => state.superAdmins.showFormAddEdit);
  const showModalDelete = useSelector((state) => state.superAdmins.showModalDelete);
  const showModalMessage = useSelector((state) => state.superAdmins.showModalMessage);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(true);
  const [ids, setId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  useEffect(() => {
    dispatch(thunks.getSuperadmins());
  }, []);
  // functions for reset o complete inputs
  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setActive(true);
  };
  const fillForm = (id) => {
    const valuesForm = superAdminsList.filter((superadmin) => superadmin._id === id);
    setFirstName(valuesForm[0].firstName);
    setLastName(valuesForm[0].lastName);
    setEmail(valuesForm[0].email);
    setPassword(valuesForm[0].password);
    setActive(valuesForm[0].active === 'true' ? true : false);
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
    resetFields();
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
  const onSubmit = (e) => {
    e.preventDefault();
    const superAdmin = {
      firstName,
      lastName,
      email,
      password,
      active
    };
    if (method === 'POST') {
      dispatch(thunks.addSuperadmin(superAdmin));
    } else if (method === 'PUT') {
      dispatch(thunks.editSuperadmins(superAdmin, ids));
    } else {
      alert('Something unexpected happened');
    }
  };
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
            <input
              {...register('firstName', {
                required: true,
                maxLength: 50
              })}
              name="firstName"
              type="text"
            />
            {errors.firstName?.type === 'required' && <p>This field is required</p>}
            {errors.firstName?.type === 'maxLength' && (
              <p>This field must contains less than 50 characters</p>
            )}
          </div>
          <div className={styles.inputsForm}>
            <label htmlFor="lastName">Last Name</label>
            <input
              {...register('lastName', {
                required: true,
                maxLength: 50
              })}
              name="lastName"
              type="text"
            />
            {errors.lastName?.type === 'required' && <p>This field is required</p>}
            {errors.lastName?.type === 'maxLength' && (
              <p>This field must contains less than 50 characters</p>
            )}
          </div>
          <div className={styles.inputsForm}>
            <label htmlFor="email">Email</label>
            <input
              {...register('email', {
                required: true,
                pattern:
                  // eslint-disable-next-line no-useless-escape
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
              name="email"
              type="text"
            />
            {errors.email?.type === 'pattern' && <p>This field must be valid</p>}
          </div>
          <div className={styles.inputsForm}>
            <label htmlFor="password">Password</label>
            <input {...register('password', { required: true })} name="password" type="password" />
          </div>
          <div className={styles.inputsForm}>
            <div>
              <label>Active</label>
            </div>
            <div>
              <input
                className={styles.inputsDivs}
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.currentTarget.checked)}
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
