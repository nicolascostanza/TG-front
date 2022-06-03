import React from 'react';
import listItemDropdown from './listItemDropdown.module.css';

const TeamDropdown = (props) => {
  const { tasks } = props;
  return (
    <div className={listItemDropdown.dropdown}>
      {tasks.length !== 0 ? 'Tasks' : '-'}
      <div className={listItemDropdown.dropdownContent}>
        {tasks.map((task) => {
          return <p key={task._id}>{task.taskName}</p>;
        })}
      </div>
    </div>
  );
};

export default TeamDropdown;
