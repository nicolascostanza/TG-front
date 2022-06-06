import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, width, height, fontSize }) => {
  return (
    <button onClick={onClick} className={styles.Button} style={{ width, height, fontSize }}>
      {children}
    </button>
  );
};

export default Button;
