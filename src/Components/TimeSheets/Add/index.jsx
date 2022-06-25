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
  const { showCreateModal, handleClose, allTasks } = props;
  const [selectedTasks, setSelectedTasks] = useState([]);
  const dispatch = useDispatch();
  const schema = Joi.object({
    employeeId: Joi.string().required().messages({ 'string.empty': 'This field must be complete' }),
    description: Joi.string().min(3).max(80).messages({
      'string.empty': 'This field must be complete',
      'string.min': 'This field must have at least 3 characters',
      'string.max': 'This field can not contain more than 80 characters'
    }),
    project: Joi.string().min(3).required().messages({
      'string.empty': 'This field must be complete',
      'string.min': 'This field must have at least 3 characters'
    }),
    date: Joi.date().required().messages({ 'date.base': 'This field must be complete' }),
    hours: Joi.number().min(1).max(24).required().messages({
      'number.base': 'This field must be complete',
      'number.min': 'This field must have at least 1 hour',
      'number.max': 'This field can not have more than 24 hours'
    }),
    approved: Joi.bool().required(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required().messages({
      'any.only': 'This field must contain one of the following roles: DEV, QA, PM or TL'
    })
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const appendToSelectedTasks = (id) => {
    const previousState = selectedTasks;
    setSelectedTasks([...previousState, id]);
    setTasks('');
  };

  const deleteFromSelectedTasks = (id) => {
    setSelectedTasks(selectedTasks.filter((task) => task !== id));
  };

  const addTimeSheets = async (timeSheet) => {
    dispatch(thunks.addTimesheets(timeSheet));
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    addTimeSheets({
      ...data,
      task: selectedTasks
    });
  };
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
            <label htmlFor="employeeId"> Employee ID </label>
            <input
              {...register('employeeId', { required: true })}
              type="text"
              placeholder="Employee ID"
            />
            {errors.employeeId?.type === 'string.empty' && (
              <p className={styles.error}>{errors.employeeId.message}</p>
            )}
          </div>
          <div>
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
          </div>
          <div>
            <label htmlFor="project"> Project </label>
            <input {...register('project', { required: true })} type="text" placeholder="Project" />
            {errors.project?.type === 'string.empty' && (
              <p className={styles.error}>{errors.project.message}</p>
            )}
            {errors.project?.type === 'string.min' && (
              <p className={styles.error}>{errors.project.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="date"> Date </label>
            <input {...register('date', { required: true })} type="date" placeholder="YYYY-MM-DD" />
            {errors.date?.type === 'date.base' && (
              <p className={styles.error}>{errors.date.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="hours"> Hours </label>
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
            <label htmlFor="task"> Task </label>
            <input
              type="text"
              placeholder="Task"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
            />
            <div>
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
            </div>
          </div>
          <div>
            <label htmlFor="approved"> Approved </label>
            <input {...register('approved', { required: true })} type="checkbox" />
          </div>
          <div>
            <label htmlFor="role"> Role </label>
            <input {...register('role', { required: true })} type="text" placeholder="Role" />
            {errors.role?.type === 'any.only' && (
              <p className={styles.error}>{errors.role.message}</p>
            )}
          </div>
        </div>
      </Form>
    </section>
  );
}

export default AddTimeSheets;
