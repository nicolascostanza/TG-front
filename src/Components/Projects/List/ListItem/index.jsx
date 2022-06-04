import React from 'react';
import TeamDropdown from './ListItemDropdown/TeamDropdown';
import TasksDropdown from './ListItemDropdown/TasksDropdown';
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
      <td>
        <TeamDropdown employees={team} />
      </td>
      <td>
        <TasksDropdown tasks={tasks} />
      </td>
      <td className={listItemStyles.edit}>
        <i onClick={() => editProject(props.project._id)} className="fa-solid fa-pen"></i>
      </td>
      <td className={listItemStyles.delete}>
        <i onClick={() => deleteProject(props.project._id)} className="fa-solid fa-trash-can"></i>
      </td>
    </tr>
  );
}

export default ListItem;
