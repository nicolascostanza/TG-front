import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, width, height, fontSize, backgroundColor }) => {
  return (
    <button
      onClick={onClick}
      className={styles.Button}
      style={{ width, height, fontSize, backgroundColor }}
    >
      {children}
    </button>
  );
};

export default Button;
