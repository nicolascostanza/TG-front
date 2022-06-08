import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Form.module.css';
import Form from '../../Shared/Form';

function AddTimeSheets(props) {
  const [timeSheets, saveTimeSheets] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/`)
      .then((response) => response.json())
      .then((response) => {
        saveTimeSheets(response.data);
      });
  }, []);
  const [employeeId, setEmployeeId] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [task, setTask] = useState([]);
  const [approved, setApproved] = useState(false);
  const [role, setRole] = useState('');
  const addTimeSheets = async (timeSheet) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(timeSheet)
    });
    const data = await res.json;
    console.log(data);
    saveTimeSheets([...timeSheets, data]);

    if (res.status === 201) {
      alert('Time-sheet added successfully');
    } else if (res.status === 400) {
      alert('There is an error on data');
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTimeSheets({
      employeeId,
      description,
      project,
      date,
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
    <Form
      handleSubmit={onSubmit}
      showModal={props.showModal}
      handleClose={props.handleClose}
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
          <label> Task </label>
          <input
            type="text"
            placeholder="Task"
            value={task._id}
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
  );
}

export default AddTimeSheets;
