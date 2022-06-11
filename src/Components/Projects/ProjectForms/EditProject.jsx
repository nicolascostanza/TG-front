import { useEffect, useState } from 'react';
import Form from '../../Shared/Form';
import projectForm from './projectForm.module.css';

const EditProject = (props) => {
  const { updateProjectFulfilleds, showModal, handleClose, forceCloseModal } = props;
  const {
    _id: id,
    name,
    description,
    clientName,
    startDate,
    endDate,
    projectManager,
    team,
    tasks
  } = props.initial;
  const initialValues = {
    name: name || '',
    description: description || '',
    clientName: clientName || '',
    startDate: new Date(startDate).toISOString().split('T')[0] || '',
    endDate: new Date(endDate).toISOString().split('T')[0] || '',
    projectManager: projectManager || '',
    team: '',
    tasks: ''
  };

  const [project, setProject] = useState(initialValues);
  const [allEmployees, setAllEmployees] = useState({});
  const [allTasks, setAllTasks] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((json) => {
        setAllEmployees(json.data);
        setSelectedEmployees([...team.map((member) => member._id)]);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((json) => {
        setAllTasks(json.data);
        setSelectedTasks([...tasks.map((task) => task._id)]);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/projects/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: project.name,
        description: project.description,
        clientName: project.clientName,
        startDate: project.startDate,
        endDate: project.endDate,
        projectManager: project.projectManager,
        team: selectedEmployees,
        tasks: selectedTasks
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.error) {
          alert(json.message);
          updateProjectFulfilleds(json.data);
          forceCloseModal();
        }
      })
      .catch((error) => console.log(error));
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
      title="Edit projects"
      handleSubmit={handleSubmit}
      showModal={showModal}
      handleClose={handleClose}
      className={projectForm.form}
    >
      <label>Name</label>
      <input
        value={project.name}
        onChange={handleInputChanges}
        name="name"
        type="text"
        placeholder="Project name"
      />

      <label>Description</label>
      <input
        value={project.description}
        onChange={handleInputChanges}
        name="description"
        type="text"
        placeholder="Project description"
      />

      <label>Client Name</label>
      <input
        value={project.clientName}
        onChange={handleInputChanges}
        name="clientName"
        type="text"
        placeholder="Client name"
      />

      <label>Start Date</label>
      <input value={project.startDate} onChange={handleInputChanges} name="startDate" type="date" />

      <label>End Date</label>
      <input value={project.endDate} onChange={handleInputChanges} name="endDate" type="date" />

      <label>Project Manager</label>
      <input
        value={project.projectManager}
        onChange={handleInputChanges}
        name="projectManager"
        type="text"
        placeholder="Project manager"
      />

      <label>Team</label>
      <input
        value={project.team}
        onChange={handleInputChanges}
        name="team"
        type="text"
        placeholder="Search an employee"
      />
      {/* SHOW SELECTED TEAM MEMBERS */}
      {project.team.length > 0 // IF THE PROJECT INPUT HAVE SOME VALUE
        ? allEmployees // FILTER BY THE INPUT VALUE, ANY MATCH
            .filter(
              (employee) =>
                employee.email.match(new RegExp(project.team, 'i')) ||
                employee.firstName.match(new RegExp(project.team, 'i'))
            ) // THE 'i' FLAG IS FOR CASE INSENSITIVE
            .map((member) => {
              return (
                <p
                  key={member._id}
                  // IF IT IS ALREADY ASIGNED, THEN UNASIGN IT
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

      <label>Tasks</label>
      <input
        value={project.tasks}
        onChange={handleInputChanges}
        name="tasks"
        type="text"
        placeholder="Search a task"
      />
      {/* SHOW SELECTED TASKS */}
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

export default EditProject;
