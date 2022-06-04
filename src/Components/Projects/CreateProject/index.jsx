import { useEffect, useState } from 'react';
import addProjectStyles from './createProject.module.css';

const CreateProject = () => {
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
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((json) => {
        setAllTasks(json.data);
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
    fetch(`${process.env.REACT_APP_API_URL}/projects/create`, {
      method: 'POST',
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
          resetValues(e);
        }
      })
      .catch((error) => console.log(error));
  };

  const resetValues = (e) => {
    e.preventDefault();
    setProject(initialValues);
    setSelectedEmployees([]);
    setSelectedTasks([]);
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
    <div className={addProjectStyles.formContainer}>
      <div className={addProjectStyles.navContainer}>
        <a href="/projects" className="fa-solid fa-arrow-left"></a>
        <h3>Create a new project</h3>
      </div>
      <form className={addProjectStyles.form}>
        <label>
          Name:
          <input
            value={project.name}
            onChange={handleInputChanges}
            name="name"
            type="text"
            placeholder="Project name"
          />
        </label>
        <label>
          Description:
          <input
            value={project.description}
            onChange={handleInputChanges}
            name="description"
            type="text"
            placeholder="Project description"
          />
        </label>
        <label>
          Client Name:
          <input
            value={project.clientName}
            onChange={handleInputChanges}
            name="clientName"
            type="text"
            placeholder="Client name"
          />
        </label>
        <label>
          Start Date:
          <input
            value={project.startDate}
            onChange={handleInputChanges}
            name="startDate"
            type="date"
          />
        </label>
        <label>
          End Date:
          <input value={project.endDate} onChange={handleInputChanges} name="endDate" type="date" />
        </label>
        <label>
          Project Manager:
          <input
            value={project.projectManager}
            onChange={handleInputChanges}
            name="projectManager"
            type="text"
            placeholder="Project manager"
          />
        </label>
        <label>
          Team:
          <input
            value={project.team}
            onChange={handleInputChanges}
            name="team"
            type="text"
            placeholder="Search an employee"
          />
          <div className={addProjectStyles.optionContainer}>
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
                            ? addProjectStyles.selectedItem
                            : addProjectStyles.notSelectedItem
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
                      className={addProjectStyles.selectedItem}
                      onClick={() => deleteFromSelectedEmployees(member)}
                    >
                      {allEmployees.find((emp) => emp._id === member).firstName} (
                      {allEmployees.find((emp) => emp._id === member).email})
                    </p>
                  );
                })}
          </div>
        </label>
        <label>
          Tasks:
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
                          ? addProjectStyles.selectedItem
                          : addProjectStyles.notSelectedItem
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
                    className={addProjectStyles.selectedItem}
                    onClick={() => deleteFromSelectedTasks(task)}
                  >
                    {allTasks.find((item) => item._id === task).taskName}:{' '}
                    {allTasks.find((item) => item._id === task).taskDescription}
                  </p>
                );
              })}
        </label>
        <div className={addProjectStyles.buttonContainer}>
          <button onClick={resetValues}>RESET</button>
          <button onClick={handleSubmit}>CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
