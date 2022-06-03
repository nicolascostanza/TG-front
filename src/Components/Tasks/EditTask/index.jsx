import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../AddTask/addTask.module.css';

const params = new URLSearchParams(window.location.search);
const taskID = params.get('id');

const URL = `${process.env.REACT_APP_API_URL}/tasks`;

const EditTask = () => {
  useEffect(() => {
    fetch(`${URL}/${taskID}`)
      .then((response) => response.json())
      .then((response) => {
        setParentProject(response.data.parentProject);
        setTaskName(response.data.taskName);
        setTaskDescription(response.data.taskDescription);
        setAssignedEmployee(response.data.assignedEmployee);
        setStartDate(response.data.startDate);
        setStatus(response.data.status);
      });
  }, []);
  const [parentProject, setParentProject] = useState({});
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('');

  const editTask = async (task) => {
    const res = await fetch(`${URL}/${taskID}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    await res.json();
    if (res.status === 200) {
      alert('Task updated successfully');
    } else if (res.status === 400) {
      alert('Something went wrong');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    editTask({
      parentProject: parentProject._id,
      taskName,
      taskDescription,
      assignedEmployee: [assignedEmployee[0]._id],
      startDate,
      status
    });

    setParentProject({});
    setTaskName('');
    setTaskDescription('');
    setAssignedEmployee([]);
    setStartDate('');
    setStatus('');
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div>
        <h2>Edit Task</h2>
      </div>
      <div className={styles.form}>
        <div>
          <label>Parent Project:</label>
          <input
            type="text"
            placeholder="Parent Project ID"
            value={parentProject._id}
            onChange={(e) => setParentProject(e.target.value)}
          />
        </div>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div>
          <label>Task Description:</label>
          <input
            type="text"
            placeholder="Task description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Assigned Employee:</label>
          <input
            type="text"
            placeholder="Assigned Employee ID"
            value={assignedEmployee && assignedEmployee[0] ? assignedEmployee[0]._id : ''}
            onChange={(e) => setAssignedEmployee(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className={styles.dropdown}>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Ready to deliver">Ready to deliver</option>
            <option value="Paused">Paused</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <input className={styles.button} type="submit" value="Update Task" />
      <a href={URL} className={styles.back}>
        Back
      </a>
    </form>
  );
};

export default EditTask;
