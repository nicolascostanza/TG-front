import { useState, useEffect } from 'react';
import styles from './Form.module.css';
import Form from 'Components/Shared/Form';
import * as thunks from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function AddTimeSheets(props) {
  const { showCreateModal, handleClose } = props;
  const [searchProject, setSearchProject] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [searchTask, setSearchTask] = useState('');
  const dispatch = useDispatch();
  const userProjects = useSelector((state) => state.currentUser.currentUser.associatedProjects);
  const allTasks = useSelector((state) => state.tasks.list);
  const schema = Joi.object({
    employeeId: Joi.string().alphanum().length(24).required().messages({
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
    taskId: Joi.string()
  });

  const handleProjectChange = (e) => {
    setSearchProject(e.target.value);
  };

  const selectProject = (id, name) => {
    setSelectedProject(id);
    setSearchProject(name);
  };

  const clearProjectSelection = () => {
    setSelectedProject('');
    setSearchProject('');
  };

  const handleTaskChange = (e) => {
    setSearchTask(e.target.value);
  };

  const selectTask = (id, name) => {
    setSelectedTask(id);
    setSearchTask(name);
  };

  const clearTaskSelection = () => {
    setSelectedTask('');
    setSearchTask('');
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    reset({
      employeeId: props.currentUser._id
    });
  }, []);

  const addTimeSheets = async (timeSheet) => {
    dispatch(thunks.addTimesheets(timeSheet));
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    addTimeSheets({
      ...data,
      projectId: selectedProject,
      employeeId: props.currentUser._id,
      taskId: selectedTask,
      approved: false
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
          {props.role === 'PM' && (
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
          )}
          <div>
            <label htmlFor="projectId">
              Project ID
              {selectedProject.length < 24 ? null : (
                <i
                  className={`fa-solid fa-circle-xmark ${styles.closeMark}`}
                  onClick={clearProjectSelection}
                />
              )}
            </label>
            {selectedProject.length < 24 ? (
              <input
                name="projectId"
                value={searchProject}
                onChange={handleProjectChange}
                placeholder="Search a project"
              />
            ) : (
              <input
                name="projectId"
                value={searchProject}
                onChange={handleProjectChange}
                placeholder="Search a project"
                readOnly
              />
            )}

            {searchProject.length > 0 && selectedProject.length < 24
              ? userProjects
                  .filter((item) => item.projectId.name.match(new RegExp(searchProject, 'i')))
                  .map((userProject) => {
                    return (
                      <p
                        key={userProject.projectId._id}
                        onClick={() =>
                          selectProject(userProject.projectId._id, userProject.projectId.name)
                        }
                        className={
                          userProject.projectId._id === searchProject
                            ? styles.selectedItem
                            : styles.notSelectedItem
                        }
                      >
                        {userProject.projectId.name}
                      </p>
                    );
                  })
              : null}
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
            <label htmlFor="taskId">
              Task
              {selectedTask.length < 24 ? null : (
                <i
                  className={`fa-solid fa-circle-xmark ${styles.closeMark}`}
                  onClick={clearTaskSelection}
                />
              )}
            </label>
            {selectedTask.length < 24 ? (
              <input
                name="taskId"
                value={searchTask}
                onChange={handleTaskChange}
                placeholder="Search a task"
              />
            ) : (
              <input
                name="taskId"
                value={searchTask}
                onChange={handleTaskChange}
                placeholder="Search a task"
                readOnly
              />
            )}

            {searchTask.length > 0 && selectedTask.length < 24
              ? allTasks
                  .filter(
                    (item) =>
                      item.taskName.match(new RegExp(searchTask, 'i')) ||
                      item.taskDescription.match(new RegExp(searchTask, 'i'))
                  )
                  .map((task) => {
                    return (
                      <p
                        key={task._id}
                        onClick={() => selectTask(task._id, task.taskName)}
                        className={
                          task._id === searchTask ? styles.selectedItem : styles.notSelectedItem
                        }
                      >
                        {task.taskName}
                      </p>
                    );
                  })
              : null}
          </div>
          {props.role === 'PM' && (
            <div>
              <label htmlFor="approved">Approved</label>
              <input {...register('approved', { required: true })} type="checkbox" />
            </div>
          )}
        </div>
      </Form>
    </section>
  );
}

export default AddTimeSheets;
