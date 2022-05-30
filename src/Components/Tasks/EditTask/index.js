import React from 'react';
import { useState, useEffect } from 'react';
import styles from './editTask.module.css';

const EditTask = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then((response) => response.json())
      .then((response) => {
        setTasks(response.data);
      });
  }, []);

  const [parentProject, setParentProject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('');

  const editTask = async (task) => {
    const res = await fetch('http://localhost:8080/tasks/6294cdde1f43d2a7d2276d8b', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTask({
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
    console.log(tasks);
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div>
        <h2>Edit Task</h2>
      </div>
      <div>
        <label>Parent Project</label>
        <input
          type="text"
          placeholder="Parent Project"
          value={parentProject}
          onChange={(e) => setParentProject(e.target.value)}
        />
      </div>
      <div>
        <label>Task Name</label>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div>
        <label>Task Description</label>
        <input
          type="text"
          placeholder="Task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Assigned Employee</label>
        <input
          type="text"
          placeholder="Assigned Employee"
          value={assignedEmployee}
          onChange={(e) => setAssignedEmployee(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date</label>
        <input
          type="text"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>Status</label>
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <input className="button" type="submit" value="Add Task" />
    </form>
  );
};

export default EditTask;
