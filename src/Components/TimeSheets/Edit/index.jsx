import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../Add/Form.module.css';
import Form from 'Components/Shared/Form';
import * as thunks from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function EditTimeSheets(props) {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${props.editId}`)
      .then((response) => response.json())
      .then((response) => {
        reset({
          employeeId: response.data.employeeId ? response.data.employeeId._id : '',
          description: response.data.description,
          project: response.data.project,
          date: new Date(response.data.date).toISOString().split('T')[0] || '',
          hours: response.data.hours,
          // tasks: response.data.task.map((item) => item._id),
          approved: response.data.approved,
          role: response.data.role
        });
        setSelectedTasks(response.data.task.map((item) => item._id));
      });
  }, [props.editId]);
  const allTasks = useSelector((state) => state.tasks.list);
  const [tasks, setTasks] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const dispatch = useDispatch();
  const { showEditModal, handleClose } = props;

  const schema = Joi.object({
    employeeId: Joi.string(),
    description: Joi.string().min(3).max(80),
    project: Joi.string().min(3),
    date: Joi.date(),
    hours: Joi.number().min(1),
    // task: Joi.string().required(),
    approved: Joi.bool(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL')
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

  console.log(errors);

  const appendToSelectedTasks = (id) => {
    const previousState = selectedTasks;
    setSelectedTasks([...previousState, id]);
    setTasks('');
  };

  const deleteFromSelectedTasks = (id) => {
    setSelectedTasks(selectedTasks.filter((task) => task !== id));
  };

  const editTimeSheets = async (newBody, id) => {
    dispatch(thunks.editTimesheet(newBody, id));
  };
  const onSubmit = (data, e) => {
    e.preventDefault();

    editTimeSheets(
      {
        ...data,
        task: selectedTasks
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
      >
        <div className={styles.tittle}>
          <h2> Edit Time-Sheet </h2>
        </div>
        <div className={styles.container}>
          <div>
            <label> Employee ID </label>
            <input
              {...register('employeeId', { required: true })}
              type="text"
              placeholder="employeeId"
            />
            {errors.employeeId?.type === 'string.empty' && <p>{errors.employeeId.message}</p>}
          </div>
          <div>
            <label> Description </label>
            <input
              {...register('description', { required: true })}
              type="text"
              placeholder="Description"
            />
            {errors.description?.type === 'string.empty' && <p>{errors.description.message}</p>}
            {errors.description?.type === 'string.min' && <p>{errors.description.message}</p>}
          </div>
          <div>
            <label> Project </label>
            <input {...register('project', { required: true })} type="text" placeholder="Project" />
          </div>
          <div>
            <label> Date </label>
            <input {...register('date', { required: true })} type="date" placeholder="Date" />
          </div>
          <div>
            <label> Hours </label>
            <input {...register('hours', { required: true })} type="number" placeholder="Hours" />
          </div>
          <div>
            <label> Tasks </label>
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
            <label> Approved </label>
            <input {...register('approved', { required: true })} type="checkbox" />
          </div>
          <div>
            <label> Role </label>
            <input {...register('role', { required: true })} type="text" placeholder="Role" />
          </div>
        </div>
      </Form>
    </section>
  );
}

export default EditTimeSheets;
