import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Shared/Button/Button';
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
  const [active, setActive] = useState(false);
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
    setActive(false);
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
          handleSubmit={onSubmit}
          showModal={modalShowForm}
          handleClose={closeModals}
          title={method === 'POST' ? 'Create Superadmin' : 'Edit Superadmin'}
        >
          <Loader isLoading={isFetching} />
          <div className={styles.inputsForm}>
            <label>Name</label>
            <input
              className={styles.inputsDivs}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.inputsForm}>
            <label>LastName</label>
            <input
              className={styles.inputsDivs}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles.inputsForm}>
            <label>Email</label>
            <input
              className={styles.inputsDivs}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputsForm}>
            <label>Password</label>
            <input
              className={styles.inputsDivs}
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
                value={active}
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
  // }
}

export default SuperAdmins;
