import * as types from './constants';

export const loginPending = () => {
  return { types: types.LOGIN_PENDING };
};
export const loginSuccess = (data) => {
  return { types: types.LOGIN_SUCCESS, payload: data };
};
export const loginError = (error) => {
  return { types: types.LOGIN_ERROR, payload: error };
};
export const cleanError = () => {
  return { types: types.CLEAN_ERROR };
};
export const setAuthentication = () => {
  return { types: types.SET_AUTHENTICATION };
};
