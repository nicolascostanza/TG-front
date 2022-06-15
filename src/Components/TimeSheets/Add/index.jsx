import { useState } from 'react';
import styles from './Form.module.css';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal';
import * as thunks from '../../../redux/timesheets/thunks';
import { useDispatch } from 'react-redux';

function AddTimeSheets(props) {
  const [employeeId, setEmployeeId] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [task, setTask] = useState([]);
  const [approved, setApproved] = useState(false);
  const [role, setRole] = useState('');
  const [showModalCorrect, setShowModalCorrect] = useState(false);
  const [showModalIncorrect, setShowModalIncorrect] = useState(false);
  const { showCreateModal, handleClose } = props;
  const dispatch = useDispatch();
  const addTimeSheets = async (timeSheet) => {
    dispatch(thunks.addTimesheets(timeSheet));
  };
  const handleCloseMessage = () => {
    setShowModalCorrect(false);
    setShowModalIncorrect(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTimeSheets({
      employeeId,
      description,
      project,
      date,
      hours,
      task: [task],
      approved,
      role
    });
  };
  return (
    <section>
      <Form
        handleSubmit={onSubmit}
        showModal={showCreateModal}
        handleClose={handleClose}
        title="Add Time Sheet"
      >
        <div className={styles.container}>
          <div>
            <label> Employee ID </label>
            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div>
            <label> Description </label>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label> Project </label>
            <input
              type="text"
              placeholder="Project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
          </div>
          <div>
            <label> Date </label>
            <input
              type="date"
              placeholder="YYYY-MM-DD"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label> Hours </label>
            <input
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div>
            <label> Task ID </label>
            <input
              type="text"
              placeholder="Task"
              value={task && task[0] ? task[0]._id : ''}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div>
            <label> Approved </label>
            <input
              type="checkbox"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
            />
          </div>
          <div>
            <label> Role </label>
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
      </Form>
      <Modal
        showModal={showModalCorrect}
        handleClose={handleCloseMessage}
        modalTitle={'The Time sheet has been created successfully'}
      ></Modal>
      <Modal
        showModal={showModalIncorrect}
        handleClose={handleCloseMessage}
        modalTitle={'The was an error creating time sheet'}
      ></Modal>
    </section>
  );
}

export default AddTimeSheets;
