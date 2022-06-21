import React from 'react';
import style from './dropdown.module.css';
import { useForm } from 'react-hook-form';

const Dropdown = ({ children, title, value, placeholder, width, registerValue }) => {
  const { register } = useForm();

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
          // value={value}
          // onChange={onChange}
          style={{ width }}
          {...register({ registerValue })}
        >
          <option hidden>{placeholder}</option>
          {children}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
