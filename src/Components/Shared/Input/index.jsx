import React from 'react';
import styles from './input.module.css';

const Input = ({ type, htmlForPropAndLabel, register, name, error, width }) => {
  return (
    <div>
      <label htmlFor={htmlForPropAndLabel}>{htmlForPropAndLabel}</label>
      <input style={{ width }} type={type} {...register(name)} name={name} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
