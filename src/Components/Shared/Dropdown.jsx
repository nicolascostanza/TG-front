import React from 'react';
import style from './dropdown.module.css';

const Dropdown = ({ children, title, value, onChange }) => {
  console.log(value);
  console.log(onChange);
  return (
    <div className={style.container}>
      <div>
        <label className={style.dropdownTitle} value={value}>
          {title}
        </label>
      </div>
      <div>
        <select className={style.select} value={value} onChange={onChange}>
          {children}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
