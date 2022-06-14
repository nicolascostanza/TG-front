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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [method, setMethod] = useState('');
  const [ids, setId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(thunks.getSuperadmins(setIsLoading));
    setIsLoading(false);
  }, []);
  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setActive(false);
  };
  // modals
  const handleCloseAlert = () => {
    setShowModalAlert(false);
  };
  const handleCloseMessage = () => {
    setShowModalMessage(false);
  };
  const handleCloseAdd = () => {
    setShowModalAdd(false);
  };
  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };
  const deleteAdmin = async () => {
    dispatch(
      thunks.deleteSuperadmin(deleteId, handleCloseAlert, setShowModalMessage, setIsLoading)
    );
  };
  const onAdd = () => {
    setMethod('POST');
    resetFields();
    setShowModalAdd(true);
  };
  const onEdit = async (id) => {
    setMethod('PUT');
    setShowModalAdd(true);
    setId(id);
    const valuesForm = superAdminsList.filter((superadmin) => superadmin._id === id);
    setFirstName(valuesForm[0].firstName);
    setLastName(valuesForm[0].lastName);
    setEmail(valuesForm[0].email);
    setPassword(valuesForm[0].password);
    setActive(valuesForm[0].active === 'true' ? true : false);
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
      dispatch(thunks.addSuperadmin(superAdmin, handleCloseAdd, setShowModalMessage, setIsLoading));
    } else if (method === 'PUT') {
      dispatch(
        thunks.editSuperadmins(superAdmin, ids, handleCloseAdd, setShowModalMessage, setIsLoading)
      );
    } else {
      alert('Something unexpected happened');
    }
  };
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <section className={styles.container}>
        <Modal showModal={showModalAlert} handleClose={handleCloseAlert} modalTitle={`DELETE`}>
          <Loader isLoading={isLoading} />
          <h4>Are you sure you want to delete the SuperAdmin?</h4>
          <div className={styles.buttonsDeleteModal}>
            <Button onClick={deleteAdmin} width={'100%'} height={'25px'} fontSize={'15px'}>
              Accept
            </Button>
          </div>
          <div className={styles.buttonsDeleteModal}>
            <Button onClick={handleCloseAlert} width={'100%'} height={'25px'} fontSize={'15px'}>
              Cancel
            </Button>
          </div>
        </Modal>
        <Form
          handleSubmit={onSubmit}
          showModal={showModalAdd}
          handleClose={handleCloseAdd}
          title={method === 'POST' ? 'Create Superadmin' : 'Edit Superadmin'}
        >
          <Loader isLoading={isLoading} />
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
          handleClose={handleCloseMessage}
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
