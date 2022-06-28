import * as types from './constants';

export const lightTheme = () => ({
  type: types.TOGGLE_LIGHT_THEME
});

export const darkTheme = () => ({
  type: types.TOGGLE_DARK_THEME
});
