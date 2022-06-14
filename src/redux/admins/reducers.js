import * as types from './constants';

const initialState = {
  list: [],
  isFetching: false,
  error: ''
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
        isFetching: true
      };
    case types.ADD_ADMIN_FULFILLED:
      return {
        ...state,
        list: [...state.list, action.payload],
        isFetching: false
      };
    case types.ADD_ADMIN_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case types.UPDATE_ADMIN_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.UPDATE_ADMIN_FULFILLED:
      return {
        ...state,
        list: state.list.map((item) => (item._id === action.payload._id ? action.payload : item)),
        isFetching: false
      };
    case types.UPDATE_ADMIN_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case types.DELETE_ADMIN_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.DELETE_ADMIN_FULFILLED:
      return {
        ...state,
        list: state.list.filter((admin) => admin._id !== action.payload),
        isFetching: false
      };
    case types.DELETE_ADMIN_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
