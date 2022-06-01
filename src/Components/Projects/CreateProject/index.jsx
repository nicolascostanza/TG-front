import { useState } from 'react';
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

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/projects/create', {
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
        team: project.team,
        tasks: project.tasks
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.error) {
          alert(json.message);
          resetValues();
        }
      })
      .catch((error) => console.log(error));
  };

  const resetValues = () => {
    setProject(initialValues);
  };

  return (
    <form className={addProjectStyles.form}>
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
        <input value={project.endDate} onChange={handleInputChanges} name="endDate" type="date" />
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
      </label>
      <label>
        Tasks:
        <input value={project.tasks} onChange={handleInputChanges} name="tasks" type="text" />
      </label>
      <button onClick={resetValues}>RESET</button>
      <button onClick={handleSubmit}>CREATE</button>
    </form>
  );
};

export default CreateProject;
