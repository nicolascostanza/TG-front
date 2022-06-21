import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import Table from '../Shared/Table';
import styles from './employees.module.css';
import Modal from '../Shared/Modal';
// import Dropdown from '../Shared/Dropdown';
import Form from '../Shared/Form';
import Button from '../Shared/Button';
import * as thunks from '../../redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
  lastName: Joi.string()
    .min(3)
    .required()
    .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(7)
    .required(),
  gender: Joi.string().valid('Male', 'Female', 'Other'),
  address: Joi.string().regex(/^[a-zA-Z0-9\s,'-]*$/),
  dob: Joi.date().required(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,25})$/),
  phone: Joi.string().regex(/^[0-9\-+]{9,10}$/),
  active: Joi.boolean().required()
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [active, setActive] = useState('');
  const [method, setMethod] = useState('');
  const message = useSelector((state) => state.employees.message);
  const error = useSelector((state) => state.employees.response);
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isFetchingEmployees = useSelector((state) => state.employees.isFetching);

  useEffect(() => {
    dispatch(thunks.getEmployees());
    // reset({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   gender: '',
    //   address: '',
    //   dob: '',
    //   password: '',
    //   phone: '',
    //   active: ''
    // });
  }, []);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  console.log(watch(register.firstName));
  // console.log('Errors: ', errors);

  // const valueGenderChange = (e) => {
  //   return setGender(e.target.value);
  // };

  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };
  const deleteEmployee = () => {
    dispatch(thunks.deleteEmployee(deleteId));
    setShowModalAlert(false);
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
    // console.log('coso raro: ', employeeToEdit[0].lastName);
    // setFirstName(register.firstName);
    // setLastName(register.lastName);
    watch(firstName, employeeToEdit[0].firstName);
    setFirstName(employeeToEdit[0].firstName);
    setLastName(employeeToEdit[0].lastName);
    setEmail(employeeToEdit[0].email);
    setGender(employeeToEdit[0].gender);
    setAddress(employeeToEdit[0].address);
    setDob(new Date(employeeToEdit[0].dob).toISOString().split('T')[0] || '');
    setPassword(employeeToEdit[0].password);
    setPhone(employeeToEdit[0].phone);
    setActive(employeeToEdit[0].active === 'true' ? true : false);
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

  const resetFields = () => {
    // setFirstName('');
    // setLastName('');
    // setEmail('');
    // setGender('');
    // setAddress('');
    // setDob('');
    // setPassword('');
    // setPhone('');
    // setActive(false);
    reset({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      address: '',
      dob: '',
      password: '',
      phone: '',
      active: ''
    });
  };

  const closeForm = () => {
    setShowAddEdit(false);
    setMethod('');
    resetFields();
  };

  const onSubmit = (data) => {
    // e.preventDefault();
    // console.log(data);
    if (method === 'POST') {
      dispatch(
        thunks.addEmployee({
          firstName,
          lastName,
          email,
          gender,
          address,
          dob,
          password,
          phone,
          active: active ? 'true' : 'false'
        })
      );
      // dispatch(thunks.addEmployee(data));
      resetFields();
      if (!error) {
        setShowAddEdit(false);
        setMethod('');
        resetFields();
      }
      setShowModalMessage(true);
    } else if (method === 'PUT') {
      dispatch(
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
      console.log('dataaa: ', data);
      // dispatch(thunks.editEmployee(data));
      if (!error) {
        setShowAddEdit(false);
        setMethod('');
      }
      setShowModalMessage(true);
    } else {
      alert('Something unexpected happened');
    }
    resetFields();
  };

  if (isFetchingEmployees) {
    return <div>Fetching...</div>;
  }

  return (
    <section className={styles.container}>
      <section>
        <Sidebar />
      </section>
      <Modal showModal={showModalAlert} handleClose={handleCloseAlert}>
        <h2>Are you sure you want to delete the employee?</h2>
        <div className={styles.buttonsDeleteModal}>
          <Button onClick={deleteEmployee} width={'100%'} height={'25px'} fontSize={'15px'}>
            Accept
          </Button>
        </div>
        <div className={styles.buttonsDeleteModal}>
          <Button onClick={handleCloseAlert} width={'100%'} height={'25px'} fontSize={'15px'}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal showModal={showModalMessage} handleClose={handleCloseMessage}>
        <h2>{tittleModal}</h2>
        <p>{message}</p>
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
          <div>
            <label htmlFor="First name">First name</label>
            <input
              type="text"
              // name="firstName"
              // value={firstName}
              // onChange={(e) => setFirstName(e.target.value)}
              {...register('firstName')}
            />
            {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="Last name">Last name</label>
            <input
              type="text"
              // name="lastName"
              // value={lastName}
              // onChange={(e) => setLastName(e.target.value)}
              {...register('lastName')}
            />
            {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
          </div>
          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              // name="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              {...register('email')}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          <div>
            {/* <label htmlFor="Gender">Gender</label>
            <Dropdown
              value={gender}
              // onChange={valueGenderChange}
              placeholder={'Select gender'}
              width={'189.63px'}
              registerValue={'gender'}
              title={'Gender'}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Dropdown> */}
            <label htmlFor="Gender">Gender</label>
            <select {...register('gender')}>
              <option hidden>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}
          </div>
          <div>
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              // name="address"
              // value={address}
              // onChange={(e) => setAddress(e.target.value)}
              {...register('address')}
            />
            {errors.address && <p className={styles.error}>{errors.address.message}</p>}
          </div>
          <div>
            <label htmlFor="Date of birth">Dob</label>
            <input
              type="date"
              // name="dob"
              // value={dob}
              // onChange={(e) => setDob(e.target.value)}
              {...register('dob')}
            />
            {errors.dob && <p className={styles.error}>{errors.dob.message}</p>}
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              // name="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              {...register('password')}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="Phone">Phone</label>
            <input
              type="number"
              // name="phone"
              // value={phone}
              // onChange={(e) => setPhone(e.target.value)}
              {...register('phone')}
            />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
          </div>
          <div>
            <div>
              <label htmlFor="Active?">Active</label>
            </div>
            <div>
              <input
                type="checkbox"
                // checked={active}
                // value={active}
                // onChange={(e) => setActive(e.currentTarget.checked)}
                {...register('active')}
              />
            </div>
          </div>
        </Form>
      </section>
    </section>
  );
}

export default Employees;
