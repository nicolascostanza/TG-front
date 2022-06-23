import React, { useEffect, useState } from 'react';
import Sidebar from 'Components/Shared/Sidebar';
import Table from 'Components/Shared/Table';
import styles from 'Components/Employees/employees.module.css';
import Modal from 'Components/Shared/Modal';
import Dropdown from 'Components/Shared/Dropdown';
import Form from 'Components/Shared/Form';
import Button from 'Components/Shared/Button';
import * as thunks from 'redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Loader from 'Components/Shared/Loader';
// import Input from 'Components/Shared/Input';

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'Name must contain 3 or more characters',
      'string.pattern.base': 'Name is not valid',
      'string.empty': 'This field is required'
    }),
  lastName: Joi.string()
    .min(3)
    .required()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
    .messages({
      'string.min': 'Name must contain 3 or more characters',
      'string.pattern.base': 'Name is not valid',
      'string.empty': 'This field is required'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(7)
    .required()
    .messages({
      'string.email': 'Invalid email',
      'string.min': 'Email must contain 7 or more characters',
      'string.empty': 'This field is required'
    }),
  gender: Joi.string()
    .valid('Male', 'Female', 'Other')
    .messages({ 'any.only': 'This field is required' }),
  address: Joi.string()
    .regex(/^[a-zA-Z0-9\s,'-]*$/)
    .messages({
      'string.empty': 'This field is required',
      'string.pattern.base': 'Address is not valid'
    }),
  dob: Joi.date().less('now').required().messages({
    'date.base': 'Date is not valid',
    'date.less': 'Invalid date'
  }),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/)
    .messages({
      'string.empty': 'This field is required',
      'string.min': 'Password must contain 8 or more characters',
      'string.pattern.base': 'Password must contain only letters and numbers'
    }),
  phone: Joi.string()
    .regex(/^[0-9\-+]{9,10}$/)
    .messages({
      'string.empty': 'This field is required',
      'string.pattern.base': 'Phone must contain between 9 and 10 characters'
    }),
  active: Joi.boolean()
});

function Employees() {
  const headers = [
    '_id',
    'firstName',
    'lastName',
    'email',
    'gender',
    'address',
    'dob',
    'password',
    'phone',
    'active'
  ];
  const [showAddEdit, setShowAddEdit] = useState(false);
  const [employeeIdToEdit, setEmployeeIdToEdit] = useState('');
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [tittleModal, setTittleModal] = useState('');
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [method, setMethod] = useState('');
  let message = useSelector((state) => state.employees.message);
  const error = useSelector((state) => state.employees.response);
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isFetchingEmployees = useSelector((state) => state.employees.isFetching);
  useEffect(() => {
    dispatch(thunks.getEmployees());
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };
  const deleteEmployee = async () => {
    // ACAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    setShowModalMessage(false);
    setShowModalAlert(false);
    console.log(isFetchingEmployees);
    await dispatch(thunks.deleteEmployee(deleteId));
    setTittleModal('DELETE');
    setShowModalMessage(true);
  };
  const handleCloseAlert = () => {
    setShowModalAlert(false);
  };

  const handleCloseMessage = () => {
    setShowModalMessage(false);
    setShowModalMessage('');
  };

  const formEmployee = () => {
    resetFields();
    setMethod('POST');
    setTittleModal('Add new Employee');
    setShowAddEdit(true);
  };

  const formEmployeeEdit = (id) => {
    setMethod('PUT');
    setTittleModal('Update Employee');
    setEmployeeIdToEdit(id);
    const employeeToEdit = employees.filter((employee) => {
      if (employee._id === id) {
        return employee;
      }
    });
    setShowAddEdit(true);
    setEmployeeIdToEdit(id);
    reset({
      firstName: employeeToEdit[0].firstName,
      lastName: employeeToEdit[0].lastName,
      email: employeeToEdit[0].email,
      gender: employeeToEdit[0].gender,
      address: employeeToEdit[0].address,
      dob: new Date(employeeToEdit[0].dob).toISOString().split('T')[0] || '',
      password: employeeToEdit[0].password,
      phone: employeeToEdit[0].phone,
      active: employeeToEdit[0].active === 'true' ? true : false
    });
  };
  console.log(errors);

  const resetFields = () => {
    reset({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      address: '',
      dob: '',
      password: '',
      phone: '',
      active: false
    });
  };

  const closeForm = () => {
    setShowAddEdit(false);
    setMethod('');
    resetFields();
    // setShowModalMessage('');
    message = '';
  };

  const onSubmit = async (data) => {
    setShowModalMessage(false);
    if (method === 'POST') {
      await dispatch(thunks.addEmployee(data));
      resetFields();
      if (!error) {
        setShowAddEdit(false);
        setMethod('');
        resetFields();
      }
      setShowModalMessage(true);
    } else if (method === 'PUT') {
      await dispatch(
        thunks.editEmployee({
          _id: employeeIdToEdit,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          gender: data.gender,
          address: data.address,
          dob: data.dob,
          password: data.password,
          phone: data.phone,
          active: data.active
        })
      );
      if (!error) {
        setShowAddEdit(false);
        setMethod('');
      }
      setShowModalMessage(true);
    } else {
      alert('Something unexpected happened');
    }
    resetFields();
    console.log(errors);
  };

  return (
    <section className={styles.container}>
      <Loader isLoading={isFetchingEmployees} />
      <section>
        <Sidebar />
      </section>
      <Modal showModal={showModalAlert} handleClose={handleCloseAlert}>
        <h2>Are you sure you want to delete the employee?</h2>
        <div className={styles.buttonsDeleteModal}>
          <Button
            className={styles.deleteModalButton}
            onClick={deleteEmployee}
            width={'100%'}
            height={'25px'}
            fontSize={'15px'}
          >
            Accept
          </Button>
        </div>
        <div className={styles.buttonsDeleteModal}>
          <Button
            className={styles.deleteModalButton}
            onClick={handleCloseAlert}
            width={'100%'}
            height={'25px'}
            fontSize={'15px'}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage}>
        <h2>{tittleModal}</h2>
        <p className={styles.modalText}>{message}</p>
      </Modal>
      <section>
        <Table
          title={'Employees'}
          headers={headers}
          data={employees}
          onEdit={formEmployeeEdit}
          onAdd={formEmployee}
          onDelete={onDelete}
        />
        <Form
          title={tittleModal}
          handleSubmit={handleSubmit(onSubmit)}
          handleClose={closeForm}
          showModal={showAddEdit}
          background
        >
          {/* ESTO COMENTADO ES PARA IMPLEMENTAR EL INPUT COPARTIDO */}
          <div>
            <label htmlFor="First name">First name</label>
            <input type="text" {...register('firstName')} />
            {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
          </div>
          {/* <Input
            type={'text'}
            htmlForProp={'First name'}
            label={'First name'}
            register={register}
            name={'firstName'}
            error={errors.firstName?.message}
            width={'189.63px'}
          /> */}
          <div>
            <label htmlFor="Last name">Last name</label>
            <input type="text" {...register('lastName')} />
            {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
          </div>
          {/* <Input
            type={'text'}
            htmlForProp={'Last name'}
            label={'Last name'}
            register={register}
            name={'lastName'}
            error={errors.lastName?.message}
          /> */}
          <div>
            <label htmlFor="Email">Email</label>
            <input type="text" {...register('email')} />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          {/* <Input
            type={'text'}
            htmlForProp={'Email'}
            label={'Email'}
            register={register}
            name={'email'}
            error={errors.email?.message}
          /> */}
          <div>
            <Dropdown
              width={'189.63px'}
              placeholder={'Select gender'}
              value={'gender'}
              registerValue={'gender'}
              register={register}
              title={'Gender'}
              error={errors.gender?.message}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Dropdown>
          </div>
          <div>
            <label htmlFor="Address">Address</label>
            <input type="text" {...register('address')} />
            {errors.address && <p className={styles.error}>{errors.address.message}</p>}
          </div>
          {/* <Input
            type={'text'}
            htmlForProp={'Address'}
            label={'Address'}
            register={register}
            name={'address'}
            error={errors.address?.message}
          /> */}
          <div>
            <label htmlFor="Date of birth">Dob</label>
            <input type="date" {...register('dob')} />
            {errors.dob && <p className={styles.error}>{errors.dob.message}</p>}
          </div>
          {/* <Input
            type={'date'}
            htmlForProp={'Date of birth'}
            label={'Date of birth'}
            register={register}
            name={'dob'}
            error={errors.dob?.message}
          /> */}
          <div>
            <label htmlFor="Password">Password</label>
            <input type="password" {...register('password')} />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          {/* <Input
            type={'password'}
            htmlForProp={'Password'}
            label={'Password'}
            register={register}
            name={'password'}
            error={errors.password?.message}
          /> */}
          <div>
            <label htmlFor="Phone">Phone</label>
            <input type="number" {...register('phone')} />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
          </div>
          {/* <Input
            type={'number'}
            htmlForProp={'Phone'}
            label={'Phone'}
            register={register}
            name={'phone'}
            error={errors.phone?.message}
          /> */}
          <div>
            <div>
              <label htmlFor="Active?">Active</label>
            </div>
            <div>
              <input type="checkbox" {...register('active')} />
            </div>
          </div>
        </Form>
      </section>
    </section>
  );
}

export default Employees;
