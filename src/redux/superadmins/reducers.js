import {
  ADD_SUPERADMIN_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  GET_SUPERADMIN_ERROR,
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS
} from './constants';

const initialState = {
  list: [],
  isFetching: false,
  message: '',
  response: false
};
let superadminsUpdates = [];
export const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true,
        message: ''
      };
    case GET_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false,
        message: '',
        response: true
      };
    case GET_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
        response: false
      };
    case ADD_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true,
        message: ''
      };
    case ADD_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload.superAdmin],
        isFetching: false,
        message: action.payload.message,
        response: true
      };
    case ADD_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
        response: false
      };
    case EDIT_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true,
        message: ''
      };
    case EDIT_SUPERADMIN_SUCCESS:
      superadminsUpdates = state.list.map((superadmin) => {
        if (superadmin._id === action.payload.id) {
          return action.payload.superAdmin;
        } else {
          return superadmin;
        }
      });
      return {
        ...state,
        list: superadminsUpdates,
        isFetching: false,
        message: action.payload.message,
        response: true
      };
    case EDIT_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
        response: false
      };
    case DELETE_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true,
        message: ''
      };
    case DELETE_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((superadmin) => superadmin._id !== action.payload.superAdminId),
        isFetching: false,
        message: action.payload.message,
        response: true
      };
    case DELETE_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
        response: false
      };
    default:
      return state;
  }
};
