import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../Add/Form.module.css';
import Form from '../../Shared/Form';
import Modal from '../../Shared/Modal';

function EditTimeSheets(props) {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${props.editId}`)
      .then((response) => response.json())
      .then((response) => {
        setEmployeeId(response.data.employeeId._id);
        setDescription(response.data.description);
        setProject(response.data.project);
        setDate(new Date(response.data.date).toISOString().split('T')[0] || '');
        setHours(response.data.hours);
        setTask(response.data.task);
        setApproved(response.data.approved);
        setRole(response.data.role);
      });
  }, [props.editId]);
  const [employeeId, setEmployeeId] = useState({});
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [task, setTask] = useState([]);
  const [approved, setApproved] = useState(false);
  const [role, setRole] = useState('');
  const [showModalCorrect, setShowModalCorrect] = useState(false);
  const [showModalIncorrect, setShowModalIncorrect] = useState(false);
  const [data, setData] = useState('');
  const handleCloseMessage = () => {
    setShowModalCorrect(false);
    setShowModalIncorrect(false);
  };

  const editTimeSheets = async (timeSheets) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${props.editId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(timeSheets)
    });
    const data = await res.json();
    if (res.status === 200) {
      setShowModalCorrect(true);
      setData(data);
    } else if (res.status === 400) {
      setShowModalIncorrect(true);
      setData(data);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    editTimeSheets({
      employeeId,
      description,
      project,
      date: new Date(date).toISOString().split('T')[0] || '',
      // date,
      hours,
      task: [...task],
      approved,
      role
    });

    setEmployeeId('');
    setDescription('');
    setProject('');
    setDate('');
    setHours('');
    setTask([]);
    setApproved(false);
    setRole('');
  };
  return (
    <section>
      <Form showModal={props.showModal} handleClose={props.handleClose} handleSubmit={onSubmit}>
        <div className={styles.tittle}>
          <h2> Edit Time-Sheet </h2>
        </div>
        <div className={styles.container}>
          <div>
            <label> Employee ID </label>
            <input
              type="text"
              placeholder="employeeId"
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
              placeholder="Date"
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
            <label> Task </label>
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
        modalTitle={'The Time sheet has been updated successfully'}
      >
        {data.message}
      </Modal>
      <Modal
        showModal={showModalIncorrect}
        handleClose={handleCloseMessage}
        modalTitle={'The was an error updating time sheet'}
      >
        {data.message}
      </Modal>
    </section>
  );
}

export default EditTimeSheets;
