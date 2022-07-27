import * as types from './constants';

if (!sessionStorage.getItem('theme')) {
  sessionStorage.setItem(
    'theme',
    window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  );
}

const initTheme = sessionStorage.getItem('theme');

const initialState = {
  theme: initTheme
};

export const accessibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_LIGHT_THEME:
      return {
        ...state,
        theme: 'light'
      };
    case types.TOGGLE_DARK_THEME:
      return {
        ...state,
        theme: 'dark'
      };
    default:
      return state;
  }
};
