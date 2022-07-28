import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'redux/accessibility/actions';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.accessibility.theme);

  const toggleTheme = (theme) => {
    if (theme === 'dark') {
      dispatch(actions.lightTheme());
      sessionStorage.setItem('theme', 'light');
    } else {
      dispatch(actions.darkTheme());
      sessionStorage.setItem('theme', 'dark');
    }
  };

  if (theme === 'light') {
    return (
      <div onClick={() => toggleTheme(theme)}>
        <i className="fa-solid fa-moon fa-2x"></i>
      </div>
    );
  } else if (theme === 'dark') {
    return (
      <div onClick={() => toggleTheme(theme)}>
        <i className="fa-solid fa-sun fa-2x"></i>
      </div>
    );
  }
};
export default ThemeToggle;
