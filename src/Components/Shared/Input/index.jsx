import React from 'react';
import styles from './input.module.css';

const Input = ({ type, htmlForProp, label, register, name, error, width }) => {
  return (
    <div>
      <label htmlFor={htmlForProp}>{label}</label>
      <input style={{ width }} type={type} {...register(name)} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
