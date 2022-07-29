import * as types from './constants';

const initialState = {
  list: [],
  isFetching: false,
  error: '',
  message: ''
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ADMINS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.GET_ADMINS_FULFILLED:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case types.GET_ADMINS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case types.ADD_ADMIN_PENDING:
      return {
        ...state,
        isFetching: true,
        message: ''
      };
    case types.ADD_ADMIN_FULFILLED:
      return {
        ...state,
        list: [...state.list, action.payload],
        isFetching: false,
        message: 'Admin successfully added'
      };
    case types.ADD_ADMIN_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        message: 'Error adding an admin'
      };
    case types.UPDATE_ADMIN_PENDING:
      return {
        ...state,
        isFetching: true,
        message: ''
      };
    case types.UPDATE_ADMIN_FULFILLED:
      return {
        ...state,
        list: state.list.map((item) => (item._id === action.payload._id ? action.payload : item)),
        isFetching: false,
        message: 'Admin updated'
      };
    case types.UPDATE_ADMIN_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        message: 'Error when updating admin'
      };
    case types.DELETE_ADMIN_PENDING:
      return {
        ...state,
        isFetching: true,
        message: ''
      };
    case types.DELETE_ADMIN_FULFILLED:
      return {
        ...state,
        list: state.list.filter((admin) => admin._id !== action.payload),
        isFetching: false,
        message: 'Admin successfully removed'
      };
    case types.DELETE_ADMIN_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        message: 'Error deleting an admin'
      };
    default:
      return state;
  }
};
