/* import React, { useState } from 'react';
import styles from './addForm.module.css';

const AddTask = () => {
  const [userInput, setUserInput] = useState({
    parentProject: '',
    taskName: '',
    taskDescription: '',
    assignedEmployee: '',
    startDate: '',
    status: ''
  });
  const onChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.parentProject]: e.target.value,
      [e.target.taskName]: e.target.value,
      [e.target.taskDescription]: e.target.value,
      [e.target.assignedEmployee]: e.target.value,
      [e.target.startDate]: e.target.value,
      [e.target.status]: e.target.value
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setUserInput({
      parentProject: '',
      taskName: '',
      taskDescription: '',
      assignedEmployee: '',
      startDate: '',
      status: ''
    });
    const inputs = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        parentProject: userInput.parentProject,
        taskName: userInput.taskName,
        taskDescription: userInput.taskDescription,
        assignedEmployee: userInput.assignedEmployee,
        startDate: userInput.startDate,
        status: userInput.status
      })
    };
    const URL = 'http://localhost:8080/tasks';

    fetch(URL, inputs).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        return response.json().then(({ message }) => {
          throw new Error(message);
        });
      }
      return response.json();
    });
  };
  return (
    <div className={styles.container}>
      <div>
        <h2>Add New Task</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Parent Project</label>
          <input
            type="text"
            name="parentProject"
            value={userInput.parentProject}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Task Name</label>
          <input type="text" name="taskName" value={userInput.taskName} onChange={onChange} />
        </div>
        <div>
          <label>Task Description</label>
          <input
            type="text"
            name="taskDescription"
            value={userInput.taskDescription}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Assigned Employee</label>
          <input
            type="text"
            name="assignedEmployee"
            value={userInput.assignedEmployee}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Start Date</label>
          <input type="text" name="startDate" value={userInput.startDate} onChange={onChange} />
        </div>
        <div>
          <label>Status</label>
          <input type="text" name="status" value={userInput.status} onChange={onChange} />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default AddTask;

*/
import React from 'react';
import { useState, useEffect } from 'react';
import styles from './addForm.module.css';

const AddTask = () => {
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
  const [assignedEmployee, setAssignedEmployee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('');
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addTask(parentProject, taskName, taskDescription, assignedEmployee, startDate, status);
    setParentProject('');
    setTaskName('');
    setTaskDescription('');
    setAssignedEmployee('');
    setStartDate('');
    setStatus('');
    console.log(tasks);
  };
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <div>
        <h2>Add New Task</h2>
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
      <input type="submit" value="Add Task" />
    </form>
  );
};

export default AddTask;
