import React from 'react';
import PropTypes from 'prop-types';

function Btn({ text = '', onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

Btn.propTypes = {
  text: PropTypes.string
};
export default Btn;
