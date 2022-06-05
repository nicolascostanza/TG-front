import React from 'react';

const DropdownItem = (props) => {
  return <a href={props.toPage}>{props.message}</a>;
};

export default DropdownItem;
