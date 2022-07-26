import styles from './tasks.module.css';
import Sidebar from 'Components/Shared/Sidebar';
import { useEffect, useState } from 'react';
import Table from 'Components/Shared/Table';
import Form from 'Components/Shared/Form';
import AddTask from './AddTask';
import * as taskThunks from 'redux/tasks/thunks';
import * as employeesThunks from 'redux/employees/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Loader from 'Components/Shared/Loader';

function Tasks() {
  const schema = Joi.object({
    parentProject: Joi.string()
      .alphanum()
      .required()
      .messages({ 'string.empty': 'This field is required' }),
    taskName: Joi.string().min(3).max(50).required().messages({
      'string.min': 'Name must contain 1 or more characters',
      'string.max': 'Name must contain 50 or less characters',
      'string.empty': 'This field is required'
    }),
    taskDescription: Joi.string().min(3).max(250).optional().messages({
      'string.min': 'Name must contain 1 or more characters',
      'string.max': 'Name must contain 250 or less characters'
    }),
    startDate: Joi.date().required().messages({
      'string.empty': 'This field is required',
      'date.base': 'This must be a valid date'
    }),
    assignedEmployee: Joi.array(),
    status: Joi.required().messages({ 'string.empty': 'This field is required' })
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });
  const URL = `${process.env.REACT_APP_API_URL}/tasks`;
  const [showModal, setShowModal] = useState(false);
  const [editedId, setEditedId] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const openAddTask = () => {
    setShowAddModal(true);
  };
  const handleClose = () => {
    setShowAddModal(false);
    setShowModal(false);
  };
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const isFetching = useSelector((state) => state.tasks.isFetching);
  const headers = [
    '_id',
    'parentProject',
    'taskCreatorId',
    'taskName',
    'taskDescription',
    'assignedEmployee',
    'startDate',
    'status',
    'createdAt',
    'updatedAt'
  ];

  useEffect(() => {
    dispatch(taskThunks.getTasks());
    dispatch(employeesThunks.getEmployees());
  }, []);

  const allEmployees = useSelector((state) => state.employees.list);

  const onEdit = (id) => {
    setEditedId(id);
    setShowModal(true);
    fetch(`${URL}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const { parentProject, taskName, taskDescription, assignedEmployee, startDate, status } =
          data.data;
        const { _id } = parentProject;
        setSelectedEmployees(data.data.assignedEmployee.map((item) => item._id));
        reset({
          parentProject: _id,
          taskName,
          taskDescription,
          assignedEmployee: [...assignedEmployee],
          startDate,
          status
        });
      });
  };

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
  useEffect(() => {}, [editedId]);
  const onSubmit = (data, e) => {
    e.preventDefault();
    let editTasks = {};
    editTasks = {
      parentProject: data.parentProject,
      taskName: data.taskName,
      taskDescription: data.taskDescription,
      startDate: data.startDate,
      status: data.status,
      assignedEmployee: selectedEmployees
    };
    dispatch(taskThunks.editTask(editTasks, editedId));
    handleClose();
  };

  const deleteTask = async (id) => {
    const deleteConfirm = confirm('Are you sure you want to delete this task?');
    if (deleteConfirm) {
      dispatch(taskThunks.deleteTask(id));
    }
  };
  return (
    <section className={styles.container}>
      <section className={styles.sidebar}>
        <Sidebar>
          <h2>What to do</h2>
          <ul>
            <li>Side Tasks</li>
            <li>Schedule</li>
            <li>Monthly report</li>
          </ul>
        </Sidebar>
      </section>
      <Loader isLoading={isFetching} />
      <section className={styles.container}>
        <Table
          title={'Tasks'}
          data={tasks}
          headers={headers}
          onDelete={deleteTask}
          onEdit={onEdit}
          onAdd={openAddTask}
        />
      </section>
      <AddTask
        showAddModal={showAddModal}
        handleClose={handleClose}
        handleSubmit={onSubmit}
        allEmployees={allEmployees}
      />
      <Form
        showModal={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit(onSubmit)}
        allEmployees={allEmployees}
        title={'Edit Task'}
      >
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="parentProject">Parent Project:</label>
            <input type="text" placeholder="Parent Project ID" {...register('parentProject')} />
            {errors.parentProject?.type === 'string.empty' && (
              <p className={styles.error}>{errors.parentProject.message}</p>
            )}
          </div>
          <div className={styles.inputContainer}>
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
          <div className={styles.inputContainer}>
            <label htmlFor="taskDescription">Task Description:</label>
            <input type="text" placeholder="Task description" {...register('taskDescription')} />
            {errors.taskDescription?.type === 'string.min' && (
              <p className={styles.error}>{errors.taskDescription.message}</p>
            )}
            {errors.taskDescription?.type === 'string.max' && (
              <p className={styles.error}>{errors.taskDescription.message}</p>
            )}
          </div>
          <div className={styles.inputContainer}>
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
          <div className={styles.inputContainer}>
            <label htmlFor="startDate">Start Date:</label>
            <input type="text" placeholder="YYYY-MM-DD" {...register('startDate')} />
            {errors.startDate?.type === 'string.empty' && (
              <p className={styles.error}>{errors.startDate.message}</p>
            )}
            {errors.startDate?.type === 'date.base' && (
              <p className={styles.error}>{errors.startDate.message}</p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="status" className={styles.dropdownTitleTask}>
              Status
            </label>
            <select
              {...register('status')}
              placeholder="Choose an option"
              className={styles.selectTask}
            >
              <option value="Ready to deliver">Ready to deliver</option>
              <option value="Paused">Paused</option>
            </select>
            {errors.status?.type === 'string.empty' && (
              <p className={styles.error}>{errors.status.message}</p>
            )}
          </div>
        </div>
      </Form>
    </section>
  );
}
export default Tasks;
