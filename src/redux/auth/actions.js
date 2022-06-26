import * as types from './constants';

export const loginPending = () => {
  return { type: types.LOGIN_PENDING };
};
export const loginSuccess = (data) => {
  return { type: types.LOGIN_SUCCESS, payload: data };
};
export const loginError = (error) => {
  return { type: types.LOGIN_ERROR, payload: error };
};
export const cleanError = () => {
  return { type: types.CLEAN_ERROR };
};
export const setAuthentication = (user) => {
  return { type: types.SET_AUTHENTICATION, payload: user };
};
