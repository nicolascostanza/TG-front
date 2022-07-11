import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../Add/Form.module.css';
import Form from 'Components/Shared/Form';
import * as thunks from 'redux/timesheets/thunks';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function EditTimeSheets(props) {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${props.editId}`)
      .then((response) => response.json())
      .then((response) => {
        console.log('response ', response);
        console.log('proshectid ', response.data.projectId._id);
        reset({
          employeeId: response.data.employeeId ? response.data.employeeId._id : '',
          // description: response.data.description,
          projectId: response.data.projectId._id,
          date: new Date(response.data.date).toISOString().split('T')[0] || '',
          hours: response.data.hours,
          approved: response.data.approved,
          // role: response.data.role
          taskId: response.data.taskId._id
        });
        // setSelectedTasks(response.data.task.map((item) => item._id));
        // setSelectedTasks(response.data.taskId._id);
      });
  }, [props.editId]);
  // const allTasks = useSelector((state) => state.tasks.list);
  const [tasks, setTasks] = useState('');
  // const [selectedTasks, setSelectedTasks] = useState([]);
  const dispatch = useDispatch();
  const { showEditModal, handleClose } = props;

  const schema = Joi.object({
    employeeId: Joi.string().alphanum().length(24).required().messages({
      'string.empty': 'This field must be complete',
      'string.length': 'Employee ID must be 24 characters long',
      'string.alphanum': 'Employee ID must only contain alpha-numeric characters'
    }),
    projectId: Joi.string().alphanum().length(24).required().messages({
      'string.empty': 'This field must be complete',
      'string.length': 'Employee ID must be 24 characters long',
      'string.alphanum': 'Employee ID must only contain alpha-numeric characters'
    }),
    date: Joi.date().less('now').required().messages({
      'date.base': 'This field must be complete',
      'date.less': 'Date is not valid'
    }),
    hours: Joi.number().min(1).max(24).required().messages({
      'number.base': 'This field must be complete',
      'number.min': 'This field must have at least 1 hour',
      'number.max': 'This field can not have more than 24 hours'
    }),
    taskId: Joi.string(),
    approved: Joi.bool().optional()
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  // const appendToSelectedTasks = (id) => {
  //   const previousState = selectedTasks;
  //   setSelectedTasks([...previousState, id]);
  //   setTasks('');
  // };

  // const deleteFromSelectedTasks = (id) => {
  //   setSelectedTasks(selectedTasks.filter((task) => task !== id));
  // };

  const editTimeSheets = async (newBody, id) => {
    dispatch(thunks.editTimesheet(newBody, id));
  };
  const onSubmit = (data, e) => {
    e.preventDefault();

    editTimeSheets(
      {
        ...data
        // task: selectedTasks
      },
      props.editId
    );
  };
  console.log(errors);
  return (
    <section>
      <Form
        showModal={showEditModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit(onSubmit)}
        title="Edit Time Sheet"
      >
        <div className={styles.container}>
          <div>
            {/* ESTO TIENE QUE COMPLETARSE SOLO CON EL ID DEL EMPLEADO LOGEADO */}
            <label>Employee ID</label>
            <input
              {...register('employeeId', { required: true })}
              type="text"
              placeholder="employeeId"
            />
            {errors.employeeId?.type === 'string.empty' && (
              <p className={styles.error}>{errors.employeeId.message}</p>
            )}
          </div>
          {/* <div>
            <label> Description </label>
            <input
              {...register('description', { required: true })}
              type="text"
              placeholder="Description"
            />
            {errors.description?.type === 'string.empty' && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
            {errors.description?.type === 'string.min' && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
            {errors.description?.type === 'string.max' && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
          </div> */}
          <div>
            <label>Project ID</label>
            <input
              {...register('projectId', { required: true })}
              type="text"
              placeholder="Project"
            />
            {errors.project?.type === 'string.empty' && (
              <p className={styles.error}>{errors.project.message}</p>
            )}
            {errors.project?.type === 'string.min' && (
              <p className={styles.error}>{errors.project.message}</p>
            )}
          </div>
          <div>
            <label>Date</label>
            <input {...register('date', { required: true })} type="date" placeholder="Date" />
            {errors.date?.type === 'date.base' && (
              <p className={styles.error}>{errors.date.message}</p>
            )}
            {errors.date?.type === 'date.less' && (
              <p className={styles.error}>{errors.date.message}</p>
            )}
          </div>
          <div>
            <label>Hours</label>
            <input {...register('hours', { required: true })} type="number" placeholder="Hours" />
            {errors.hours?.type === 'number.base' && (
              <p className={styles.error}>{errors.hours.message}</p>
            )}
            {errors.hours?.type === 'number.min' && (
              <p className={styles.error}>{errors.hours.message}</p>
            )}
            {errors.hours?.type === 'number.max' && (
              <p className={styles.error}>{errors.hours.message}</p>
            )}
          </div>
          <div>
            <label>Task</label>
            <input
              type="text"
              placeholder="Task"
              value={tasks}
              {...register('taskId', { required: true })}
              onChange={(e) => setTasks(e.target.value)}
            />
            {/* <div>
              {tasks.length > 0
                ? allTasks
                    .filter(
                      (task) =>
                        task.taskName.match(new RegExp(tasks, 'i')) ||
                        task.taskDescription.match(new RegExp(tasks, 'i'))
                    )
                    .map((task) => {
                      return (
                        <p
                          key={task._id}
                          onClick={() =>
                            selectedTasks.find((item) => item === task._id)
                              ? deleteFromSelectedTasks(task._id)
                              : appendToSelectedTasks(task._id)
                          }
                          className={
                            selectedTasks.find((item) => item === task._id)
                              ? styles.selectedItem
                              : styles.notSelectedItem
                          }
                        >
                          {task.taskName}: {task.taskDescription}
                        </p>
                      );
                    })
                : selectedTasks.map((task) => {
                    return (
                      <p
                        key={task}
                        className={styles.chip}
                        onClick={() => deleteFromSelectedTasks(task)}
                      >
                        {allTasks.find((item) => item._id === task).taskName}:{' '}
                        {allTasks.find((item) => item._id === task).taskDescription}
                      </p>
                    );
                  })}
            </div> */}
          </div>
          <div>
            <label> Approved </label>
            <input {...register('approved', { required: true })} type="checkbox" />
          </div>
          {/* <div>
            <label> Role </label>
            <input {...register('role', { required: true })} type="text" placeholder="Role" />
            {errors.role?.type === 'any.only' && (
              <p className={styles.error}>{errors.role.message}</p>
            )}
          </div> */}
        </div>
      </Form>
    </section>
  );
}

export default EditTimeSheets;
