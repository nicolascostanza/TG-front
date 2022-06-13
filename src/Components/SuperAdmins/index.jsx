import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Shared/Button/Button';
import Form from '../Shared/Form';
import Modal from '../Shared/Modal';
import Sidebar from '../Shared/Sidebar';
import Table from '../Shared/Table';
import styles from './super-admins.module.css';

// mio
import * as thunks from '../../redux/superadmins/thunks';
// import * as action from '../../redux/superadmins/actions';

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
  // const [tittleModal, setTittleModal] = useState('');
  // const [message, setMessage] = useState('');
  useEffect(() => {
    dispatch(thunks.getSuperadmins());
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

  // edits functions
  const onEdit = async (id) => {
    setMethod('PUT');
    setShowModalAdd(true);
    // fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setFirstName(response.data.firstName);
    //     setLastName(response.data.lastName);
    //     setEmail(response.data.email);
    //     setPassword(response.data.password);
    //     setActive(response.data.active);
    //   });
    setId(id);
  };
  // const Editing = async (superAdmin) => {
  //   const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${ids}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(superAdmin)
  //   });
  //   const data = await res.json();
  //   if (res.status === 200) {
  //     handleCloseAdd(false);
  //     resetFields();
  //     setTittleModal('EDITED');
  //     setMessage(data.message);
  //     setShowModalMessage(true);
  //     setMethod('');
  //   } else {
  //     setShowModalAdd(false);
  //     setTittleModal('ERROR');
  //     setMessage(data.message);
  //     setShowModalMessage(true);
  //     setMethod('');
  //   }
  // };
  // delete functions
  const onDelete = (id) => {
    setShowModalAlert(true);
    setDeleteId(id);
  };

  // const deleteProject = (id) => {
  //   const areYouSure = confirm('Are you sure you want to delete it?');
  //   if (areYouSure) {
  //     dispatch(thunks.deleteProject(id));
  //   }
  // };
  const deleteAdmin = async () => {
    dispatch(thunks.deleteSuperadmin(deleteId));
    // if (res.status === 200) {
    //   /*setList(list.filter((superadmin) => superadmin._id !== deleteId)); */
    //   setShowModalAlert(false);
    //   setTittleModal('DELETED');
    //   setMessage(data.message);
    //   setShowModalMessage(true);
    // } else {
    //   setShowModalAdd(false);
    //   setTittleModal('ERROR');
    //   setMessage(data.message);
    //   setShowModalMessage(true);
    //   setMethod('');
  };
  // add functions and submit
  const onAdd = () => {
    setMethod('POST');
    resetFields();
    setShowModalAdd(true);
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
      // Editing({ firstName, lastName, email, password, active });
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
        <Modal
          showModal={showModalAlert}
          handleClose={handleCloseAlert}
          modalTitle={`Are you sure you want to delete the SuperAdmin?`}
        >
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
          // modalTitle={tittleModal}
          modalTitle={'titulo'}
        >
          {/* {message} */}
          {'mensaje'}
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
