import * as types from './constants';

const initTheme = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';

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
