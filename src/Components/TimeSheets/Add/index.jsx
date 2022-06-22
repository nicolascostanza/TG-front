import { useState } from 'react';
import styles from './Form.module.css';
import Form from 'Components/Shared/Form';
import * as thunks from 'redux/timesheets/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function AddTimeSheets(props) {
  // const [employeeId, setEmployeeId] = useState('');
  // const [description] = useState('');
  // const [project] = useState('');
  // const [date] = useState('');
  // const [hours] = useState('');
  const [tasks, setTasks] = useState('');
  // const [approved] = useState(false);
  // const [role] = useState('');
  const { showCreateModal, handleClose, allTasks } = props;
  const [selectedTasks, setSelectedTasks] = useState([]);
  const dispatch = useDispatch();
  const schema = Joi.object({
    employeeId: Joi.string().required(),
    description: Joi.string().min(3).max(80),
    project: Joi.string().min(3).required(),
    date: Joi.date().required(),
    hours: Joi.number().min(1).required(),
    // task: Joi.string().required(),
    approved: Joi.bool().required(),
    role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required()
  });
  const {
    register,
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

  const addTimeSheets = async (timeSheet) => {
    dispatch(thunks.addTimesheets(timeSheet));
  };
  const onSubmit = (data, e) => {
    e.preventDefault();
    addTimeSheets({
      ...data,
      task: selectedTasks
    });
    console.log(data);
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
              // value={employeeId}
              // onChange={(e) => setEmployeeId(e.target.value)}
            />
            {errors.employeeId?.type === 'string.empty' && <p>{errors.employeeId.message}</p>}
          </div>
          <div>
            <label htmlFor="description"> Description </label>
            <input
              {...register('description', { required: true })}
              type="text"
              placeholder="Description"
            />
            {errors.description?.type === 'string.empty' && <p>{errors.description.message}</p>}
            {errors.description?.type === 'string.min' && <p>{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="project"> Project </label>
            <input {...register('project', { required: true })} type="text" placeholder="Project" />
            {errors.project?.type === 'string.empty' && <p>{errors.project.message}</p>}
            {errors.project?.type === 'string.min' && <p>{errors.project.message}</p>}
          </div>
          <div>
            <label htmlFor="date"> Date </label>
            <input {...register('date', { required: true })} type="date" placeholder="YYYY-MM-DD" />
            {errors.date?.type === 'date.base' && <p>{errors.date.message}</p>}
          </div>
          <div>
            <label htmlFor="hours"> Hours </label>
            <input {...register('hours', { required: true })} type="number" placeholder="Hours" />
            {errors.hours?.type === 'number.base' && <p>{errors.hours.message}</p>}
            {errors.hours?.type === 'number.min' && <p>{errors.hours.message}</p>}
          </div>
          <div>
            <label htmlFor="task"> Task </label>
            <input
              // {...register('task', { required: true })}
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
            {errors.task?.type === 'string.empty' && <p>{errors.task.message}</p>}
          </div>
          <div>
            <label htmlFor="approved"> Approved </label>
            <input {...register('approved', { required: true })} type="checkbox" />
          </div>
          <div>
            <label htmlFor="role"> Role </label>
            <input {...register('role', { required: true })} type="text" placeholder="Role" />
            {errors.role?.type === 'any.only' && <p>{errors.role.message}</p>}
          </div>
        </div>
      </Form>
    </section>
  );
}

export default AddTimeSheets;
