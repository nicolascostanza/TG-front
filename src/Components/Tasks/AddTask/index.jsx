import React from 'react';
import { useState, useEffect } from 'react';
import styles from './addTask.module.css';

const URL = `${process.env.REACT_APP_API_URL}/tasks`;

const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      });
  }, []);

  const [parentProject, setParentProject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('');

  const addTask = async (task) => {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();

    setTasks([...tasks, data]);

    if (res.status === 201) {
      alert('Task added successfully');
    } else if (res.status === 400 || res.status === 500) {
      alert('Something went wrong');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addTask({
      parentProject,
      taskName,
      taskDescription,
      assignedEmployee: [assignedEmployee],
      startDate,
      status
    });
    setParentProject('');
    setTaskName('');
    setTaskDescription('');
    setAssignedEmployee([]);
    setStartDate('');
    setStatus('');
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div>
        <h2>Add New Task</h2>
      </div>
      <div className={styles.form}>
        <div>
          <label>Parent Project:</label>
          <input
            type="text"
            placeholder="Parent Project ID"
            value={parentProject}
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
            value={assignedEmployee}
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
      <input className={styles.button} type="submit" value="Add Task" />
    </form>
  );
};

export default AddTask;
