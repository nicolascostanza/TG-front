import { joiResolver } from '@hookform/resolvers/joi';
import Button from 'Components/Shared/Button';
import Form from 'Components/Shared/Form';
import Loader from 'Components/Shared/Loader';
import Modal from 'Components/Shared/Modal';
import Sidebar from 'Components/Shared/Sidebar';
import Table from 'Components/Shared/Table';
import Joi from 'joi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as thunks from 'redux/admins/thunks';
import styles from './admins.module.css';

function Admins() {
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [method, setMethod] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [idEdit, setId] = useState('');
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const isFetching = useSelector((state) => state.admins.isFetching);
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
      .messages({
        'string.min': 'First name must contain at least 3 characters',
        'string.pattern.base': 'First name must contain only letters',
        'string.empty': 'This field is required'
      }),
    lastName: Joi.string()
      .min(3)
      .required()
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
      .messages({
        'string.min': 'Last name must contain at least 3 characters',
        'string.pattern.base': 'Last name must contain only letters',
        'string.empty': 'This field is required'
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(7)
      .required()
      .messages({
        'string.min': 'Email must contain at least 7 characters',
        'string.email': 'Invalid email format',
        'string.empty': 'This field is required'
      }),
    password: Joi.string()
      .min(8)
      .required()
      .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
      .messages({
        'string.min': 'Password must contain at least 8 characters',
        'string.pattern.base': 'Password must contain letters and numbers',
        'string.empty': 'This field is required'
      }),
    active: Joi.boolean().required()
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  useEffect(() => {
    dispatch(thunks.getAdmins());
    if (method !== 'PUT') {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        active: false
      });
    }
  }, [method]);

  const formattedAdmins = admins.map((admin) => {
    return {
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      password: admin.password,
      active: admin.active ? 'true' : 'false'
    };
  });

  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };

  const deleteAdmin = () => {
    setShowModalAlert(false);
    dispatch(thunks.deleteAdmin(deleteId));
  };

  const handleCloseAlert = () => {
    setShowModalAlert(false);
  };

  const handleCloseMessage = () => {
    setShowModalMessage(false);
  };

  const handleCloseAdd = () => {
    setShowModalAdd(false);
  };

  const onAdd = () => {
    setMethod('POST');
    setShowModalAdd(true);
  };

  const fillInputs = (id) => {
    const valu = admins.filter((admin) => admin._id === id);
    const { firstName, lastName, email, password, active } = valu[0];

    reset({
      firstName,
      lastName,
      email,
      password,
      active
    });
  };

  const addAdmin = async (admin) => {
    dispatch(thunks.addAdmin(admin));
    setMethod('');
    setShowModalAdd(false);
  };

  const onEdit = async (id) => {
    setMethod('PUT');
    setShowModalAdd(true);
    fillInputs(id);
    setId(id);
  };

  const editAdmin = (body) => {
    dispatch(thunks.updateAdmin(body, idEdit));
    if (isFetching) {
      return <h2>Fetching</h2>;
    }
    setMethod('');
    handleCloseAdd(false);
  };

  const onSubmit = (data) => {
    console.log('data: ', data);
    console.log('id: ', idEdit);
    if (method === 'POST') {
      addAdmin(data);
    } else if (method === 'PUT') {
      editAdmin(data);
    } else {
      alert('Something unexpected happened');
    }
  };

  return (
    <section className={styles.container}>
      <div>
        <Sidebar></Sidebar>
      </div>
      <Loader isLoading={isFetching} />
      <Modal
        showModal={showModalAlert}
        handleClose={handleCloseAlert}
        modalTitle={`Are you sure you want to delete the admin?`}
      >
        <div className={styles.boxButtons}>
          <Button onClick={deleteAdmin} width={'75px'} height={'25px'} fontSize={'15px'}>
            Accept
          </Button>
          <Button onClick={handleCloseAlert} width={'75px'} height={'25px'} fontSize={'15px'}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Form
        showModal={showModalAdd}
        handleClose={handleCloseAdd}
        handleSubmit={handleSubmit(onSubmit)}
        title={method === 'POST' ? 'Create Admin' : 'Edit Admin'}
      >
        <div>
          <label htmlFor="firstName">Name</label>
          <input {...register('firstName')} name="firstName" type="text" />
          {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input {...register('lastName')} name="lastName" type="text" />
          {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input {...register('email')} name="email" type="email" />
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register('password')} name="password" type="password" />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>
        <div>
          <div>
            <label htmlFor="active">Active</label>
          </div>
          <div>
            <input type="checkbox" name="active" {...register('active')} />
            {errors.active?.message && <p>{errors.active?.message}</p>}
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              reset({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                active: false
              });
            }}
            width={'75px'}
            height={'25px'}
            fontSize={'15px'}
          >
            Reset
          </Button>
        </div>
      </Form>
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage} modalTitle={''} />
      <Table
        title={'Admins'}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        data={formattedAdmins}
        onDelete={onDelete}
        onAdd={onAdd}
        onEdit={onEdit}
        setId={setId}
        setMethod={setMethod}
      />
    </section>
  );
}

export default Admins;
