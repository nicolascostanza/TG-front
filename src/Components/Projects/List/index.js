import { useState, useEffect } from 'react';
import ListItem from './ListItem';

function List() {
  const [projects, setProjects] = useState([]);
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
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Client name</th>
          <th>Start Date</th>
          <th>End date</th>
          <th>PM</th>
          <th>Team</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
        {projects.map((project) => {
          return <ListItem key={project._id} project={project} />;
        })}
      </table>
    </div>
  );
}

export default List;
