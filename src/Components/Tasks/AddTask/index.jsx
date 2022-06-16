import React from 'react';
import { useState } from 'react';
import styles from './addTask.module.css';
import Dropdown from '../../Shared/Dropdown/Dropdown';
import Form from '../../Shared/Form';
import * as thunks from '../../../redux/tasks/thunks';
import { useDispatch } from 'react-redux';

const AddTask = (props) => {
  const [parentProject, setParentProject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  const addTask = async (task) => {
    dispatch(thunks.addTask(task));
    props.handleClose();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
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

  const valueChange = (e) => {
    console.log('e', e.target.value);
    return setStatus(e.target.value);
  };

  // const handleError = (e) => {
  //   console.log(e);
  //   if()
  // };

  return (
    <Form showModal={props.showAddModal} handleClose={props.handleClose} handleSubmit={onSubmit}>
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
            // onBlur={(e) => handleError(e.target.value)}
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
          <Dropdown
            title="Status"
            value={status}
            onChange={valueChange}
            placeholder="Choose an option"
          >
            <option value="Ready to deliver">Ready to deliver</option>
            <option value="Paused">Paused</option>
          </Dropdown>
        </div>
      </div>
    </Form>
  );
};

export default AddTask;
