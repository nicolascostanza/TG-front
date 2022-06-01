import { useState } from 'react';
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
    team: team || [],
    tasks: tasks.map((task) => task._id).join(';') || ''
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
    fetch(`http://localhost:8080/projects/edit/${id}`, {
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
        team: project.team,
        tasks: project.tasks.length > 0 ? project.tasks.split(';') : []
      })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
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

  return (
    <div className={editProjectStyles.modal}>
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
        <button onClick={cancelUpdate}>CANCEL</button>
        <button onClick={handleSubmit}>UPDATE</button>
      </form>
    </div>
  );
};

export default EditProject;
