import React from 'react';
import listItemStyles from './listItem.module.css';

function ListItem(props) {
  const { name, description, clientName, startDate, endDate, projectManager, team, tasks } =
    props.project;
  const { editProject, deleteProject } = props;
  return (
    <tr className={listItemStyles.row}>
      <td>{name}</td>
      <td>{description}</td>
      <td>{clientName}</td>
      <td>{new Date(startDate).toLocaleDateString()}</td>
      <td>{new Date(endDate).toLocaleDateString()}</td>
      <td>{projectManager}</td>
      <td>{team.length > 0 ? team[0].firstName : '-'}</td>
      <td>{tasks.length > 0 ? tasks[0].taskName : '-'}</td>
      <td>
        <i onClick={() => editProject(props.project._id)} className="fa-solid fa-pen"></i>
      </td>
      <td>
        <i onClick={() => deleteProject(props.project._id)} className="fa-solid fa-trash-can"></i>
      </td>
    </tr>
  );
}

export default ListItem;
