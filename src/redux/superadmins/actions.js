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
  SHOW_FORM_ADD_EDIT,
  SHOW_MODAL_DELETE,
  SHOW_MODAL_MESSAGE,
  CLOSE_MODALS,
  CLOSE_MODAL_MESSAGE
} from './constants';
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
export const addSuperadminPending = () => ({
  type: ADD_SUPERADMIN_PENDING
});
export const addSuperadminSuccess = (superAdmin, message) => ({
  type: ADD_SUPERADMIN_SUCCESS,
  payload: { superAdmin, message }
});
export const addSuperadminError = (error) => ({
  type: ADD_SUPERADMIN_ERROR,
  payload: error
});
export const editSuperadminPending = () => ({
  type: EDIT_SUPERADMIN_PENDING
});
export const editSuperadminSuccess = (superAdmin, id, message) => ({
  type: EDIT_SUPERADMIN_SUCCESS,
  payload: { superAdmin, id, message }
});
export const editSuperadminError = (error) => ({
  type: EDIT_SUPERADMIN_ERROR,
  payload: error
});
export const deleteSuperadminPending = () => ({
  type: DELETE_SUPERADMIN_PENDING
});
export const deleteSuperadminSuccess = (superAdminId, message) => ({
  type: DELETE_SUPERADMIN_SUCCESS,
  payload: { superAdminId, message }
});
export const deleteSuperadminError = (error) => ({
  type: DELETE_SUPERADMIN_ERROR,
  payload: error
});
export const showFormAddEdit = () => ({
  type: SHOW_FORM_ADD_EDIT
});
export const closeModals = () => ({
  type: CLOSE_MODALS
});
export const showModalDelete = () => ({
  type: SHOW_MODAL_DELETE
});
export const showModalMessage = () => ({
  type: SHOW_MODAL_MESSAGE
});
export const closeModalMessage = () => ({
  type: CLOSE_MODAL_MESSAGE
});
