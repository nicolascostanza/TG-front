import { useState, useEffect } from 'react';
import ListItem from './ListItem';

function List() {
  const [projects, setProjects] = useState([]);

  const editProject = (id) => {
    console.log(`editamos ${id}`);
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
    </div>
  );
}

export default List;
