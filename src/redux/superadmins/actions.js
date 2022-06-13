import {
  GET_SUPERADMIN_ERROR,
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS,
  ADD_SUPERADMIN_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR,
  GETBYID_SUPERADMIN_PENDING,
  GETBYID_SUPERADMIN_SUCCESS,
  GETBYID_SUPERADMIN_ERROR
} from './constants';
// gets
export const getSuperadminPending = () => ({
  type: GET_SUPERADMIN_PENDING
});
export const getSuperadminSuccess = (superAdmins) => ({
  type: GET_SUPERADMIN_SUCCESS,
  payload: superAdmins
});
export const getSuperadminError = (error) => ({
  type: GET_SUPERADMIN_ERROR,
  payload: error
});
// add
export const addSuperadminPending = () => ({
  type: ADD_SUPERADMIN_PENDING
});
export const addSuperadminSuccess = (superAdmin) => ({
  type: ADD_SUPERADMIN_SUCCESS,
  payload: superAdmin
});
export const addSuperadminError = (error) => ({
  type: ADD_SUPERADMIN_ERROR,
  payload: error
});
// edit
export const editSuperadminPending = () => ({
  type: EDIT_SUPERADMIN_PENDING
});
export const editSuperadminSuccess = (superAdmin, id) => ({
  type: EDIT_SUPERADMIN_SUCCESS,
  payload: { superAdmin, id }
});
export const editSuperadminError = (error) => ({
  type: EDIT_SUPERADMIN_ERROR,
  payload: error
});
// delete
export const deleteSuperadminPending = () => ({
  type: DELETE_SUPERADMIN_PENDING
});
export const deleteSuperadminSuccess = (superAdminId) => ({
  type: DELETE_SUPERADMIN_SUCCESS,
  payload: superAdminId
});
export const deleteSuperadminError = (error) => ({
  type: DELETE_SUPERADMIN_ERROR,
  payload: error
});
// getbyid
export const getByIdSuperadminPending = () => ({
  type: GETBYID_SUPERADMIN_PENDING
});
export const getByIdSuperadminSuccess = (superAdmin) => ({
  type: GETBYID_SUPERADMIN_SUCCESS,
  payload: superAdmin
});
export const getByIdSuperadminError = (error) => ({
  type: GETBYID_SUPERADMIN_ERROR,
  payload: error
});
