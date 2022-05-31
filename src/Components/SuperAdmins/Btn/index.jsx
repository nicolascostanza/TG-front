import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

function Btn({ onClick, text, color }) {
  return (
    <button
      className={styles.container}
      a
      onClick={onClick}
      style={{ backgroundColor: color, cursor: 'pointer' }}
    >
      {text}
    </button>
  );
}
Btn.defaultProps = {
  text: '',
  color: '#EA3354'
};

Btn.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string
};
export default Btn;
