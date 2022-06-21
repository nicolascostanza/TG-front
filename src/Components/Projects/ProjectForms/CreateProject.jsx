import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Form from 'Components/Shared/Form';
import projectForm from './projectForm.module.css';
import * as thunks from 'redux/projects/thunks';

const CreateProject = (props) => {
  const { showCreateModal, handleClose } = props;
  const initialValues = {
    name: '',
    description: '',
    clientName: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    team: [],
    tasks: []
  };
  const { allEmployees, allTasks } = props;

  const [project, setProject] = useState(initialValues);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const dispatch = useDispatch();
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
      .messages({
        'string.min': 'Name must contain 3 or more characters',
        'string.max': 'Name must contain 30 or less characters',
        'string.pattern.base': 'Name is not valid',
        'string.empty': 'This field is required'
      })
      .required(),
    description: Joi.string()
      .min(3)
      .max(200)
      .messages({
        'string.min': 'Description must contain 3 or more characters',
        'string.max': 'Name must contain 200 or less characters',
        'string.empty': 'This field is required'
      })
      .required(),
    clientName: Joi.string()
      .min(3)
      .max(30)
      .messages({
        'string.min': 'Client name must contain 3 or more characters',
        'string.max': 'Client name must contain 30 or less characters',
        'string.empty': 'This field is required'
      })
      .required(),
    startDate: Joi.date()
      .messages({
        'date.base': 'Date is not valid',
        'date.empty': 'This field is required'
      })
      .required(),
    endDate: Joi.date()
      .greater(Joi.ref('startDate'))
      .messages({
        'date.base': 'Date is not valid',
        'date.greater': 'End date must be after the start date',
        'date.empty': 'This field is required'
      })
      .required(),
    projectManager: Joi.string()
      .min(3)
      .max(30)
      .regex(/^([ \u00c0-\u01ffa-zA-Z'-])+$/)
      .messages({
        'string.min': 'Project manager name must contain 3 or more letters',
        'string.max': 'Project manager name must contain 30 or less letters',
        'string.empty': 'This field is required',
        'string.pattern.base': 'Name is not valid',
        'string.regex': 'Project manager name is not valid'
      })
      .required(),
    team: Joi.array(),
    tasks: Joi.array()
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  const submitNewProject = (data, e) => {
    e.preventDefault();
    const newBody = {
      ...data,
      team: selectedEmployees,
      tasks: selectedTasks
    };
    dispatch(thunks.addNewProject(newBody));
  };

  const appendToSelectedEmployees = (id) => {
    const previousState = selectedEmployees;
    setSelectedEmployees([...previousState, id]);
    setProject({ ...project, team: '' });
  };

  const deleteFromSelectedEmployees = (id) => {
    setSelectedEmployees(selectedEmployees.filter((emp) => emp !== id));
  };

  const appendToSelectedTasks = (id) => {
    const previousState = selectedTasks;
    setSelectedTasks([...previousState, id]);
    setProject({ ...project, tasks: '' });
  };

  const deleteFromSelectedTasks = (id) => {
    setSelectedTasks(selectedTasks.filter((task) => task !== id));
  };

  return (
    <Form
      title="Create project"
      showModal={showCreateModal}
      handleSubmit={handleSubmit(submitNewProject)}
      handleClose={handleClose}
    >
      <label htmlFor="name">Name</label>
      <input
        {...register('name', { required: true })}
        name="name"
        type="text"
        placeholder="Project name"
      />
      {errors.name?.type ? <p className={projectForm.error}>{errors.name.message}</p> : null}

      <label htmlFor="description">Description</label>
      <input
        {...register('description')}
        name="description"
        type="text"
        placeholder="Project description"
      />
      {errors.description?.type ? (
        <p className={projectForm.error}>{errors.description.message}</p>
      ) : null}

      <label htmlFor="clientName">Client Name</label>
      <input {...register('clientName')} name="clientName" type="text" placeholder="Client name" />
      {errors.clientName?.type ? (
        <p className={projectForm.error}>{errors.clientName.message}</p>
      ) : null}

      <label htmlFor="startDate">Start Date</label>
      <input {...register('startDate')} name="startDate" type="date" />
      {errors.startDate?.type ? (
        <p className={projectForm.error}>{errors.startDate.message}</p>
      ) : null}

      <label htmlFor="endDate">End Date</label>
      <input {...register('endDate')} name="endDate" type="date" />
      {errors.endDate?.type ? <p className={projectForm.error}>{errors.endDate.message}</p> : null}

      <label htmlFor="projectManager">Project Manager</label>
      <input
        {...register('projectManager')}
        name="projectManager"
        type="text"
        placeholder="Project manager"
      />
      {errors.projectManager?.type ? (
        <p className={projectForm.error}>{errors.projectManager.message}</p>
      ) : null}

      <label htmlFor="team">Team</label>
      <input
        value={project.team}
        onChange={handleInputChanges}
        name="team"
        type="text"
        placeholder="Search an employee"
      />
      <div className={projectForm.optionContainer}>
        {project.team.length > 0
          ? allEmployees
              .filter(
                (employee) =>
                  employee.email.match(new RegExp(project.team, 'i')) ||
                  employee.firstName.match(new RegExp(project.team, 'i'))
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
                        ? projectForm.selectedItem
                        : projectForm.notSelectedItem
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
                  className={projectForm.chip}
                  onClick={() => deleteFromSelectedEmployees(member)}
                >
                  {allEmployees.find((emp) => emp._id === member).firstName} (
                  {allEmployees.find((emp) => emp._id === member).email})
                </p>
              );
            })}
      </div>
      <label htmlFor="tasks">Tasks</label>
      <input
        value={project.tasks}
        onChange={handleInputChanges}
        name="tasks"
        type="text"
        placeholder="Search a task"
      />
      {project.tasks.length > 0
        ? allTasks
            .filter(
              (task) =>
                task.taskName.match(new RegExp(project.tasks, 'i')) ||
                task.taskDescription.match(new RegExp(project.tasks, 'i'))
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
                      ? projectForm.selectedItem
                      : projectForm.notSelectedItem
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
                className={projectForm.chip}
                onClick={() => deleteFromSelectedTasks(task)}
              >
                {allTasks.find((item) => item._id === task).taskName}:{' '}
                {allTasks.find((item) => item._id === task).taskDescription}
              </p>
            );
          })}
    </Form>
  );
};

export default CreateProject;
