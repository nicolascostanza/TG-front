import { useState, useEffect } from 'react';
import ListItem from './ListItem';
import EditProject from '../EditProject';
import listStyles from './list.module.css';

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

  const updateProjects = (editedProject) => {
    const updatedProjects = projects.map((project) => {
      if (project._id === editedProject._id) {
        return editedProject;
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const deleteProject = (id) => {
    const areYouSure = confirm('Are you sure you want to delete it?');
    if (areYouSure) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, { method: 'delete' })
        .then((response) => response.json())
        .then((json) => {
          alert(json.message);
          setProjects(projects.filter((project) => project._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((json) => {
        setProjects(json.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {edit ? (
        <EditProject initial={editingProject} updateProjects={updateProjects} close={closeModal} />
      ) : (
        ''
      )}
      <table className={listStyles.table}>
        <thead className={listStyles.tableHead}>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Client name</th>
            <th>Start Date</th>
            <th>End date</th>
            <th>PM</th>
            <th>Team</th>
            <th>Tasks</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className={listStyles.tableBody}>
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
      <a className={listStyles.createButton} href="/projects/create">
        Create new project
      </a>
    </div>
  );
}

export default List;
