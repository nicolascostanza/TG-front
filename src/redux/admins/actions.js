import * as types from './constants';

export const getAdminsFulfilled = (admins) => ({
  type: types.GET_ADMINS_FULFILLED,
  payload: admins
});

export const getAdminsPending = () => ({
  type: types.GET_ADMINS_PENDING
});

export const getAdminsFailed = (error) => ({
  type: types.GET_ADMINS_FAILED,
  payload: error
});

export const addAdminFulfilled = (admin) => ({
  type: types.ADD_ADMIN_FULFILLED,
  payload: admin
});

export const addAdminPending = () => ({
  type: types.ADD_ADMIN_PENDING
});

export const addAdminFailed = (error) => ({
  type: types.ADD_ADMIN_FAILED,
  payload: error
});

export const updateAdminFulfilled = (admin) => ({
  type: types.UPDATE_ADMIN_FULFILLED,
  payload: admin
});

export const updateAdminPending = () => ({
  type: types.UPDATE_ADMIN_PENDING
});

export const updateAdminFailed = (error) => ({
  type: types.UPDATE_ADMIN_FAILED,
  payload: error
});

export const deleteAdminFulfilled = (admin) => ({
  type: types.DELETE_ADMIN_FULFILLED,
  payload: admin
});

export const deleteAdminPending = () => ({
  type: types.DELETE_ADMIN_PENDING
});

export const deleteAdminFailed = (error) => ({
  type: types.DELETE_ADMIN_FAILED,
  payload: error
});
