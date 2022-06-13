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

const initialState = {
  list: [],
  isLoading: false,
  error: ''
};
let updatedSuperAdmin = [];
export const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload
      };
    case GET_SUPERADMIN_PENDING:
      return {
        ...state
      };
    case GET_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ADD_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case ADD_SUPERADMIN_PENDING:
      return {
        ...state
      };
    case ADD_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case EDIT_SUPERADMIN_SUCCESS:
      updatedSuperAdmin = state.list.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: updatedSuperAdmin
      };
    case EDIT_SUPERADMIN_PENDING:
      return {
        ...state
      };
    case EDIT_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case DELETE_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((employee) => employee._id !== action.payload)
      };
    case DELETE_SUPERADMIN_PENDING:
      return {
        ...state
      };
    case DELETE_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
