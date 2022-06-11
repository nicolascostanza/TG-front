import {
  ADD_SUPERADMIN_ERROR, ADD_SUPERADMIN_PENDING, ADD_SUPERADMIN_SUCCESS, EDIT_SUPERADMIN_ERROR, EDIT_SUPERADMIN_PENDING, EDIT_SUPERADMIN_SUCCESS
} from './constants';

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