import React from 'react';
import styles from './input.module.css';

const Input = ({ type, htmlForPropAndLabel, register, name, error, width, id }) => {
  return (
    <div>
      <label htmlFor={htmlForPropAndLabel}>{htmlForPropAndLabel}</label>
      <input id={id} style={{ width }} type={type} {...register(name)} name={name} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
