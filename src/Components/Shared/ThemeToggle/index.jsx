import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'redux/accessibility/actions';
import styles from './toggler.module.css';

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

  if (theme === 'light') {
    return (
      <div className={styles.togglerContainer} onClick={() => toggleTheme(theme)}>
        <i className="fa-solid fa-toggle-off fa-2x">
          <span id={styles.span}>dark mode</span>
        </i>
      </div>
    );
  } else if (theme === 'dark') {
    return (
      <div className={styles.togglerContainer} onClick={() => toggleTheme(theme)}>
        <i className="fa-solid fa-toggle-on fa-2x" style={{ color: 'white' }}>
          <span id={styles.span}>light mode</span>
        </i>
      </div>
    );
  }
};
export default ThemeToggle;
