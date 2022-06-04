import React from 'react';
import listItemDropdown from './listItemDropdown.module.css';
import DropdownItem from './DropdownItem';

const TeamDropdown = (props) => {
  const { tasks } = props;
  return (
    <div className={listItemDropdown.dropdown}>
      {tasks.length !== 0 ? <i className="fa-solid fa-caret-down"></i> : '-'}
      <div className={listItemDropdown.dropdownContent}>
        {tasks.map((task) => {
          return (
            <DropdownItem
              key={task._id}
              toPage={`/tasks/${task._id}`}
              message={task.taskName}
              className={listItemDropdown.dropdownItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeamDropdown;
