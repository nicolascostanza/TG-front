import { useEffect, useState } from 'react';
import editProjectStyles from './editProject.module.css';

const EditProject = (props) => {
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
  const { updateProjects } = props;
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
          updateProjects(json.data);
          props.close();
        }
      })
      .catch((error) => console.log(error));
  };

  const cancelUpdate = (e) => {
    e.preventDefault();
    props.close();
  };

  const appendToSelectedEmployees = (id) => {
    const previousState = selectedEmployees;
    setSelectedEmployees([...previousState, id]);
  };

  const deleteFromSelectedEmployees = (id) => {
    setSelectedEmployees(selectedEmployees.filter((emp) => emp !== id));
  };

  const appendToSelectedTasks = (id) => {
    const previousState = selectedTasks;
    setSelectedTasks([...previousState, id]);
  };

  const deleteFromSelectedTasks = (id) => {
    setSelectedTasks(selectedTasks.filter((task) => task !== id));
  };

  return (
    <div className={editProjectStyles.modal}>
      <div className={editProjectStyles.formContainer}>
        <form className={editProjectStyles.form}>
          <label>
            Name:
            <input value={project.name} onChange={handleInputChanges} name="name" type="text" />
          </label>
          <label>
            Description:
            <input
              value={project.description}
              onChange={handleInputChanges}
              name="description"
              type="text"
            />
          </label>
          <label>
            Client Name:
            <input
              value={project.clientName}
              onChange={handleInputChanges}
              name="clientName"
              type="text"
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
            <input
              value={project.endDate}
              onChange={handleInputChanges}
              name="endDate"
              type="date"
            />
          </label>
          <label>
            Project Manager:
            <input
              value={project.projectManager}
              onChange={handleInputChanges}
              name="projectManager"
              type="text"
            />
          </label>
          <label>
            Team:
            <input value={project.team} onChange={handleInputChanges} name="team" type="text" />
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
                            ? editProjectStyles.selectedItem
                            : editProjectStyles.notSelectedItem
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
                      className={editProjectStyles.selectedItem}
                      onClick={() => deleteFromSelectedEmployees(member)}
                    >
                      {allEmployees.find((emp) => emp._id === member).firstName} (
                      {allEmployees.find((emp) => emp._id === member).email})
                    </p>
                  );
                })}
          </label>
          <label>
            Tasks:
            <input value={project.tasks} onChange={handleInputChanges} name="tasks" type="text" />
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
                            ? editProjectStyles.selectedItem
                            : editProjectStyles.notSelectedItem
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
                      className={editProjectStyles.selectedItem}
                      onClick={() => deleteFromSelectedTasks(task)}
                    >
                      {allTasks.find((item) => item._id === task).taskName}:{' '}
                      {allTasks.find((item) => item._id === task).taskDescription}
                    </p>
                  );
                })}
          </label>
          <div className={editProjectStyles.buttonContainer}>
            <button onClick={cancelUpdate}>CANCEL</button>
            <button onClick={handleSubmit}>UPDATE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
