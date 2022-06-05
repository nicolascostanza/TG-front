import React from 'react';
import listItemDropdown from './listItemDropdown.module.css';
import DropdownItem from './DropdownItem';

const TeamDropdown = (props) => {
  const { employees } = props;
  return (
    <div className={listItemDropdown.dropdown}>
      {employees.length !== 0 ? <i className="fa-solid fa-caret-down"></i> : '-'}
      <div className={listItemDropdown.dropdownContent}>
        {employees.map((member) => {
          return (
            <DropdownItem
              key={member._id}
              toPage={`/employees/${member._id}`}
              message={member.firstName}
              className={listItemDropdown.dropdownItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeamDropdown;
