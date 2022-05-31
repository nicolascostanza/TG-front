import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../AddTask/addTask.module.css';

const EditTask = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/tasks/62961f61bf21e677edfd155b')
      .then((response) => response.json())
      .then((response) => {
        setTasks(response.data);
        console.log(tasks);
      });
  }, []);
  const [parentProject, setParentProject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('');

  const editTask = async (task) => {
    const res = await fetch('http://localhost:8080/tasks/62961f61bf21e677edfd155b', {
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
        <h2>Edit Task</h2>
      </div>
      <div>
        <label>Parent Project:</label>
        <input
          type="text"
          placeholder={tasks.parentProject ? tasks.parentProject._id : 'No parent project'}
          //value={tasks.parentProject ? tasks.parentProject._id : 'No parent project'}
          onChange={(e) => setParentProject({ text: e.target.value })}
        />
      </div>
      <div>
        <label>Task Name:</label>
        <input
          type="text"
          placeholder={tasks.taskName}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div>
        <label>Task Description:</label>
        <input
          type="text"
          placeholder={tasks.taskDescription}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Assigned Employee:</label>
        <input
          type="text"
          placeholder={
            tasks.assignedEmployee ? tasks.assignedEmployee[0]._id : 'No assigned employee'
          }
          value={assignedEmployee}
          onChange={(e) => setAssignedEmployee(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="text"
          placeholder={tasks.startDate}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          placeholder={tasks.status}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <input className={styles.button} type="submit" value="Add Task" />
    </form>
  );
};

export default EditTask;
