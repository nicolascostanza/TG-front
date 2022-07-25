import { useState, useEffect } from 'react';
import styles from '../Add/Form.module.css';
import Form from 'Components/Shared/Form';
import * as thunks from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function EditTimeSheets(props) {
  const { showEditModal, handleClose } = props;
  const [searchProject, setSearchProject] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [searchTask, setSearchTask] = useState('');
  const dispatch = useDispatch();
  const userProjects = useSelector((state) => state.currentUser.currentUser.associatedProjects);
  const allTasks = useSelector((state) => state.tasks.list);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${props.editId}`)
      .then((response) => response.json())
      .then((response) => {
        setSelectedProject(response.data.projectId._id);
        setSearchProject(response.data.projectId.name);
        setSelectedTask(response.data.taskId._id);
        setSearchTask(response.data.taskId.taskName);
        reset({
          employeeId: response.data.employeeId ? response.data.employeeId._id : '',
          date: new Date(response.data.date).toISOString().split('T')[0] || '',
          hours: response.data.hours,
          approved: response.data.approved,
          taskId: response.data.taskId._id
        });
      });
  }, [props.editId]);

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

  const editTimeSheets = async (newBody, id) => {
    dispatch(thunks.editTimesheet(newBody, id));
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    editTimeSheets(
      {
        ...data,
        projectId: selectedProject,
        employeeId: props.currentUser._id,
        taskId: selectedTask
      },
      props.editId
    );
  };
  return (
    <section>
      <Form
        showModal={showEditModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit(onSubmit)}
        title="Edit Time Sheet"
      >
        <div className={styles.container}>
          {props.role === 'PM' && (
            <div>
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
          )}
          <div>
            <label>
              Project ID
              {selectedProject.length < 24 ? null : (
                <i
                  className={`fa-solid fa-circle-xmark ${styles.closeMark}`}
                  onClick={clearProjectSelection}
                />
              )}
            </label>
            <input
              name="projectId"
              value={searchProject}
              onChange={handleProjectChange}
              placeholder="Search a project"
              readOnly={selectedProject?.length > 0}
            />

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
            <label htmlFor="taskId">
              Task
              {selectedTask.length < 24 ? null : (
                <i
                  className={`fa-solid fa-circle-xmark ${styles.closeMark}`}
                  onClick={clearTaskSelection}
                />
              )}
            </label>
            <input
              name="taskId"
              value={searchTask}
              onChange={handleTaskChange}
              placeholder="Search a task"
              readOnly={selectedTask?.length > 0}
            />

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
          {/* {props.role === 'PM' && (
            <div>
              <label htmlFor="approved">Approved</label>
              <input {...register('approved', { required: true })} type="checkbox" />
            </div>
          )} */}
        </div>
      </Form>
    </section>
  );
}

export default EditTimeSheets;
