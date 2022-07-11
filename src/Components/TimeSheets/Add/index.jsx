import { useState } from 'react';
import styles from './Form.module.css';
import Form from 'Components/Shared/Form';
import * as thunks from 'redux/timesheets/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function AddTimeSheets(props) {
  const [tasks, setTasks] = useState('');
  // const { showCreateModal, handleClose, allTasks } = props;
  const { showCreateModal, handleClose } = props;
  // const [selectedTasks, setSelectedTasks] = useState([]);
  // const [selectedTasks, setSelectedTasks] = useState('');
  const dispatch = useDispatch();
  const schema = Joi.object({
    employeeId: Joi.string().alphanum().length(24).required().messages({
      'string.empty': 'This field must be complete',
      'string.length': 'Employee ID must be 24 characters long',
      'string.alphanum': 'Employee ID must only contain alpha-numeric characters'
    }),
    // BORRAR DESCRIPTION
    // description: Joi.string().min(3).max(80).messages({
    //   'string.empty': 'This field must be complete',
    //   'string.min': 'This field must have at least 3 characters',
    //   'string.max': 'This field can not contain more than 80 characters'
    // }),
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
    approved: Joi.bool().optional(),
    // BORRAR ROLE
    // role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required().messages({
    //   'any.only': 'This field must contain one of the following roles: DEV, QA, PM or TL'
    // })
    taskId: Joi.string()
  });
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  // const appendToSelectedTasks = (id) => {
  //   // const previousState = selectedTasks;
  //   // setSelectedTasks([...previousState, id]);
  //   setSelectedTasks(id);
  //   setTasks('');
  // };

  // const deleteFromSelectedTasks = (id) => {
  //   setSelectedTasks(selectedTasks.filter((task) => task !== id));
  // };
  console.log(errors);

  const addTimeSheets = async (timeSheet) => {
    dispatch(thunks.addTimesheets(timeSheet));
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    addTimeSheets({
      ...data,
      // taskId: selectedTasks,
      // taskId,
      approved: false
      // taskId: '62a8a48ae4163d7c08335e66'
    });
    console.log(data);
    console.log('tasls ', tasks);
  };
  // console.log(tasks);
  return (
    <section>
      <Form
        handleSubmit={handleSubmit(onSubmit)}
        showModal={showCreateModal}
        handleClose={handleClose}
        title="Add Time Sheet"
      >
        <div className={styles.container}>
          <div>
            <label htmlFor="employeeId">Employee ID</label>
            <input
              {...register('employeeId', { required: true })}
              type="text"
              placeholder="Employee ID"
            />
            {errors.employeeId?.type === 'string.empty' && (
              <p className={styles.error}>{errors.employeeId.message}</p>
            )}
          </div>
          {/* <div>
            <label htmlFor="description"> Description </label>
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
            <label htmlFor="projectId">Project ID</label>
            <input
              {...register('projectId', { required: true })}
              type="text"
              placeholder="Project ID"
            />
            {errors.project?.type === 'string.empty' && (
              <p className={styles.error}>{errors.project.message}</p>
            )}
            {errors.project?.type === 'string.min' && (
              <p className={styles.error}>{errors.project.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input {...register('date', { required: true })} type="date" placeholder="YYYY-MM-DD" />
            {errors.date?.type === 'date.base' && (
              <p className={styles.error}>{errors.date.message}</p>
            )}
            {errors.date?.type === 'date.less' && (
              <p className={styles.error}>{errors.date.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="hours">Hours</label>
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
            <label htmlFor="taskId">Task</label>
            <input
              {...register('taskId', { required: true })}
              type="text"
              placeholder="Task ID"
              value={tasks.name}
              onChange={(e) => setTasks(e.target.value)}
              // eslint-disable-next-line react/jsx-no-duplicate-props
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
          {props.role === 'PM' && (
            <div>
              <label htmlFor="approved">Approved</label>
              <input {...register('approved', { required: true })} type="checkbox" />
            </div>
          )}
          {/* <div>
            <label htmlFor="role"> Role </label>
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

export default AddTimeSheets;
