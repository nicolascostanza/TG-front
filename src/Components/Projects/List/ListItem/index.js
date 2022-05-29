import React from 'react';

function ListItem(props) {
  const { name, description, clientName, startDate, endDate, projectManager, team } = props.project;
  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{clientName}</td>
      <td>{new Date(startDate).toLocaleDateString()}</td>
      <td>{new Date(endDate).toLocaleDateString()}</td>
      <td>{projectManager}</td>
      <td>{team[0].firstName}</td>
      <td>EDIT</td>
      <td>DELETE</td>
    </tr>
  );
}

export default ListItem;
