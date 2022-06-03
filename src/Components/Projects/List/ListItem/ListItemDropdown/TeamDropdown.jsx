import React from 'react';
import listItemDropdown from './listItemDropdown.module.css';

const TeamDropdown = (props) => {
  const { employees } = props;
  return (
    <div className={listItemDropdown.dropdown}>
      {employees.length !== 0 ? 'Team' : '-'}
      <div className={listItemDropdown.dropdownContent}>
        {employees.map((member) => {
          return <p key={member._id}>{member.firstName}</p>;
        })}
      </div>
    </div>
  );
};

export default TeamDropdown;
