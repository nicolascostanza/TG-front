import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'redux/accessibility/actions';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.accessibility.theme);

  const toggleTheme = (theme) => {
    if (theme === 'dark') {
      dispatch(actions.lightTheme());
    } else {
      dispatch(actions.darkTheme());
    }
  };

  return (
    <div onClick={() => toggleTheme(theme)}>
      <i className={theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i>
    </div>
  );
};

export default ThemeToggle;
