import React from 'react';
import styles from './addTask.module.css';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Form from '../../Shared/Form';
import * as thunks from '../../../redux/tasks/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

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
  assignedEmployee: Joi.string(),
  startDate: Joi.date().required().messages({
    'string.empty': 'This field is required',
    'date.base': 'This must be a valid date'
  }),
  status: Joi.required().messages({ 'string.empty': 'This field is required' })
});

const AddTask = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'OnBlur',
    resolver: joiResolver(schema)
  });

  const dispatch = useDispatch();
  console.log(errors);

  const addTask = async (task) => {
    dispatch(thunks.addTask(task));
    props.handleClose();
  };
  const onSubmit = (data) => {
    console.log('data: ', data);
    addTask(data);
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
          {errors.parentProject?.type === 'string.empty' && <p>{errors.parentProject.message}</p>}
        </div>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" placeholder="Task Name" {...register('taskName')} />
          {errors.taskName?.type === 'string.empty' && <p>{errors.taskName.message}</p>}
          {errors.taskName?.type === 'string.min' && <p>{errors.taskName.message}</p>}
          {errors.taskName?.type === 'string.max' && <p>{errors.taskName.message}</p>}
        </div>
        <div>
          <label htmlFor="taskDescription">Task Description:</label>
          <input type="text" placeholder="Task description" {...register('taskDescription')} />
          {errors.taskDescription?.type === 'string.min' && <p>{errors.taskDescription.message}</p>}
          {errors.taskDescription?.type === 'string.max' && <p>{errors.taskDescription.message}</p>}
        </div>
        <div>
          <label htmlFor="assignedEmployee">Assigned Employee:</label>
          <input type="text" placeholder="Assigned Employee ID" {...register('assignedEmployee')} />
          {errors.assignedEmployee?.type === 'array.base' && (
            <p>{errors.assignedEmployee.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="text" placeholder="YYYY-MM-DD" {...register('startDate')} />
          {errors.startDate?.type === 'string.empty' && <p>{errors.startDate.message}</p>}
          {errors.startDate?.type === 'date.base' && <p>{errors.startDate.message}</p>}
        </div>
        <div className={styles.dropdown}>
          <label htmlFor="status">Status</label>
          <select {...register('status')}>
            <option value="Ready to deliver">Ready to deliver</option>
            <option value="Paused">Paused</option>
          </select>
        </div>
      </div>
    </Form>
  );
};

export default AddTask;
