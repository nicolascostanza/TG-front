import React from 'react';
import styles from './addTask.module.css';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Form from 'Components/Shared/Form';
import * as thunks from 'redux/tasks/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const AddTask = (props) => {
  const schema = Joi.object({
    parentProject: Joi.string()
      .alphanum()
      .required()
      .messages({ 'string.empty': 'This field is required' }),
    taskName: Joi.string().min(1).max(50).required().messages({
      'string.min': 'Name must contain 1 or more characters',
      'string.max': 'Name must contain 50 or less characters',
      'string.empty': 'This field is required'
    }),
    taskDescription: Joi.string().min(1).max(250).optional().messages({
      'string.min': 'Name must contain 1 or more characters',
      'string.max': 'Name must contain 250 or less characters'
    }),
    startDate: Joi.date().required().messages({
      'string.empty': 'This field is required',
      'date.base': 'This must be a valid date'
    }),
    status: Joi.required().messages({ 'string.empty': 'This field is required' })
  });
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'OnBlur',
    resolver: joiResolver(schema)
  });

  const { allEmployees } = props;
  const [employees, setEmployees] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const appendToSelectedEmployees = (id) => {
    const previousState = selectedEmployees;
    setSelectedEmployees([...previousState, id]);
    setEmployees('');
  };

  const deleteFromSelectedEmployees = (id) => {
    setSelectedEmployees(selectedEmployees.filter((emp) => emp !== id));
  };
  const dispatch = useDispatch();
  console.log(errors);

  const addTask = async (task) => {
    dispatch(thunks.addTask(task));
    props.handleClose();
  };
  const onSubmit = (data) => {
    addTask({
      ...data,
      assignedEmployee: selectedEmployees
    });
    console.log('data: ', data);
  };
  return (
    <Form
      showModal={props.showAddModal}
      handleClose={props.handleClose}
      handleSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h2>Add New Task</h2>
      </div>
      <div className={styles.form}>
        <div>
          <label htmlFor="parentProject">Parent Project:</label>
          <input type="text" placeholder="Parent Project ID" {...register('parentProject')} />
          {errors.parentProject?.type === 'string.empty' && (
            <p className={styles.error}>{errors.parentProject.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" placeholder="Task Name" {...register('taskName')} />
          {errors.taskName?.type === 'string.empty' && (
            <p className={styles.error}>{errors.taskName.message}</p>
          )}
          {errors.taskName?.type === 'string.min' && (
            <p className={styles.error}>{errors.taskName.message}</p>
          )}
          {errors.taskName?.type === 'string.max' && (
            <p className={styles.error}>{errors.taskName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="taskDescription">Task Description:</label>
          <input type="text" placeholder="Task description" {...register('taskDescription')} />
          {errors.taskDescription?.type === 'string.min' && (
            <p className={styles.error}>{errors.taskDescription.message}</p>
          )}
          {errors.taskDescription?.type === 'string.max' && (
            <p className={styles.error}>{errors.taskDescription.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="assignedEmployee">Assigned Employee:</label>
          <input
            value={employees}
            type="text"
            onChange={(e) => setEmployees(e.target.value)}
            placeholder="Assigned Employee ID"
          />
          <div>
            {employees.length > 0
              ? allEmployees
                  .filter(
                    (employee) =>
                      employee.email.match(new RegExp(employees, 'i')) ||
                      employee.firstName.match(new RegExp(employees, 'i'))
                  )
                  .map((member) => {
                    return (
                      <p
                        key={member._id}
                        onClick={() =>
                          selectedEmployees.find((emp) => emp === member._id)
                            ? deleteFromSelectedEmployees(member._id)
                            : appendToSelectedEmployees(member._id)
                        }
                        className={
                          selectedEmployees.find((emp) => emp === member._id)
                            ? styles.selectedItem
                            : styles.notSelectedItem
                        }
                      >
                        {member.firstName}: {member.email}
                      </p>
                    );
                  })
              : selectedEmployees.map((member) => {
                  return (
                    <p
                      key={member}
                      className={styles.chip}
                      onClick={() => deleteFromSelectedEmployees(member)}
                    >
                      {allEmployees.find((emp) => emp._id === member).firstName} (
                      {allEmployees.find((emp) => emp._id === member).email})
                    </p>
                  );
                })}
          </div>
          {errors.assignedEmployee?.type === 'string.empty' && (
            <p className={styles.error}>{errors.assignedEmployee.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="text" placeholder="YYYY-MM-DD" {...register('startDate')} />
          {errors.startDate?.type === 'string.empty' && (
            <p className={styles.error}>{errors.startDate.message}</p>
          )}
          {errors.startDate?.type === 'date.base' && (
            <p className={styles.error}>{errors.startDate.message}</p>
          )}
        </div>
        <div className={styles.dropdown}>
          <label htmlFor="status">Status</label>
          <select {...register('status')}>
            <option value="Ready to deliver">Ready to deliver</option>
            <option value="Paused">Paused</option>
          </select>
          {errors.status?.type === 'string.empty' && (
            <p className={styles.error}>{errors.status.message}</p>
          )}
        </div>
      </div>
    </Form>
  );
};

export default AddTask;
