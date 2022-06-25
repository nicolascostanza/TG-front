/* eslint-disable prettier/prettier */
import React from 'react';
import style from './dropdown.module.css';

const Dropdown = ({
  children,
  title,
  value,
  placeholder,
  width,
  registerValue,
  register,
  error
}) => {
  return (
    <div className={style.container}>
      <div>
        <label className={style.dropdownTitle} htmlFor={value}>
          {title}
        </label>
      </div>
      <div>
        <select
          className={style.select}
          style={{ width }}
          {...(register ? register(registerValue) : registerValue)}
        >
          <option hidden>{placeholder}</option>
          {children}
        </select>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Dropdown;
