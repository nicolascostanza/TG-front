import * as types from './constants';

export const getCurrentUserByEmailPending = () => {
  return {
    type: types.GET_CURRENT_USER_BY_EMAIL_PENDING
  };
};

export const getCurrentUserByEmailSuccess = (user) => {
  return {
    type: types.GET_CURRENT_USER_BY_EMAIL_SUCCESS,
    payload: user
  };
};

export const getCurrentUserByEmailError = (error) => {
  return {
    type: types.GET_CURRENT_USER_BY_EMAIL_ERROR,
    payload: error
  };
};
