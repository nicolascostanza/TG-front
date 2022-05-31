import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../AddTask/addTask.module.css';

const EditTask = () => {
  useEffect(() => {
    fetch('http://localhost:8080/tasks/62965439e74d6b80516dadd0')
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
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
    const res = await fetch('http://localhost:8080/tasks/62965439e74d6b80516dadd0', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    console.log('Data:', data);
    if (res.status === 200) {
      console.log('Data:', data);
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
        <div>
          <label>Status:</label>
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </div>
      <input className={styles.button} type="submit" value="Update Task" />
    </form>
  );
};

export default EditTask;
