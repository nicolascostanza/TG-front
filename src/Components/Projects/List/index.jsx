import { useState, useEffect } from 'react';
import ListItem from './ListItem';
import EditProject from '../EditProject';

function List() {
  const [projects, setProjects] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editingProject, setEditingProject] = useState({
    name: '',
    description: '',
    clientName: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    team: [],
    tasks: []
  });

  const editProject = (id) => {
    const currentEditing = projects.find((project) => project._id === id);
    setEdit(true);
    setEditingProject(currentEditing);
  };

  const closeModal = () => {
    setEdit(false);
  };

  const deleteProject = (id) => {
    const areYouSure = confirm('Are you sure you want to delete it?');
    if (areYouSure) {
      fetch(`http://localhost:8080/projects/${id}`, { method: 'delete' })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setProjects(projects.filter((project) => project._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/projects')
      .then((response) => response.json())
      .then((json) => {
        setProjects(json.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {edit ? <EditProject initial={editingProject} close={closeModal} /> : ''}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Client name</th>
            <th>Start Date</th>
            <th>End date</th>
            <th>PM</th>
            <th>Team</th>
            <th>Tasks</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            return (
              <ListItem
                key={project._id}
                project={project}
                editProject={editProject}
                deleteProject={deleteProject}
              />
            );
          })}
        </tbody>
      </table>
      <a href="/projects/create">Create new project</a>
    </div>
  );
}

export default List;
