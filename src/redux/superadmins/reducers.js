import {
  ADD_SUPERADMIN_ERROR, ADD_SUPERADMIN_PENDING, ADD_SUPERADMIN_SUCCESS, EDIT_SUPERADMIN_ERROR, EDIT_SUPERADMIN_PENDING, EDIT_SUPERADMIN_SUCCESS
} from './constants';

let updatedSuperadmin = [];


export const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUPERADMIN_SUCCESS:
      return {
      };
    case ADD_SUPERADMIN_PENDING:
      return {
      };
    case ADD_SUPERADMIN_ERROR:
      return {
      };
    case EDIT_SUPERADMIN_SUCCESS:
      updatedSuperadmin = state.list.map((item) => {
        if (item._id === action.payload._id) {
          return;
        } else {
        }
      });
      return {
      };
    case EDIT_SUPERADMIN_PENDING:
      return {
      };
    case EDIT_SUPERADMIN_ERROR:
      return {
      };
    default:
      return;
  }
};