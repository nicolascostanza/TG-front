import React from 'react';
import style from './dropdown.module.css';
const Dropdown = ({ children, title, value, onChange, placeholder, width }) => {
  return (
    <div className={style.container}>
      <div>
        <label className={style.dropdownTitle} value={value}>
          {title}
        </label>
      </div>
      <div>
        <select className={style.select} value={value} onChange={onChange} style={{ width }}>
          <option hidden selected>
            {placeholder}
          </option>
          {children}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
