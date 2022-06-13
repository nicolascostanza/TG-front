import {
  ADD_SUPERADMIN_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_SUCCESS,
  GET_SUPERADMIN_ERROR,
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS
} from './constants';

export const getSuperadminSuccess = (superAdmins) => ({
  type: GET_SUPERADMIN_SUCCESS,
  payload: superAdmins
});
export const getSuperadminPending = () => ({
  type: GET_SUPERADMIN_PENDING
});
export const getSuperadminError = (error) => ({
  type: GET_SUPERADMIN_ERROR,
  payload: error
});
export const addSuperadminSuccess = (superAdmin) => ({
  type: ADD_SUPERADMIN_SUCCESS,
  payload: superAdmin
});
export const addSuperadminPending = () => ({
  type: ADD_SUPERADMIN_PENDING
});
export const addSuperadminError = (error) => ({
  type: ADD_SUPERADMIN_ERROR,
  payload: error
});
export const editSuperadminSuccess = (superAdmin) => ({
  type: EDIT_SUPERADMIN_SUCCESS,
  payload: superAdmin
});
export const editSuperadminPending = () => ({
  type: EDIT_SUPERADMIN_PENDING
});
export const editSuperadminError = (error) => ({
  type: EDIT_SUPERADMIN_ERROR,
  payload: error
});
export const deleteSuperadminSuccess = (superAdminId) => ({
  type: DELETE_SUPERADMIN_SUCCESS,
  payload: superAdminId
});
export const deleteSuperadminPending = () => ({
  type: DELETE_SUPERADMIN_PENDING
});
export const deleteSuperadminError = (error) => ({
  type: DELETE_SUPERADMIN_ERROR,
  payload: error
});
