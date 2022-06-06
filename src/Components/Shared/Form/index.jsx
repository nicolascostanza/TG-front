/* Labels, inputs, buttons */
import React from 'react';
import styles from './form.module.css';

const Form = ({ children, handleSubmit, buttonText }) => {
  return (
    <form className={styles.form}>
      <div>
        {children}
        <button className={styles.button} onClick={() => handleSubmit()}>
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default Form;
