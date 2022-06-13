import {
  ADD_SUPERADMIN_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  GET_SUPERADMIN_ERROR,
  GET_SUPERADMIN_PENDING,
  GET_SUPERADMIN_SUCCESS,
  GETBYID_SUPERADMIN_PENDING,
  GETBYID_SUPERADMIN_SUCCESS,
  GETBYID_SUPERADMIN_ERROR,
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
  error: ''
};
let superadminsUpdates = [];
export const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GET_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case GET_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case ADD_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case ADD_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isFetching: false
      };
    case ADD_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case EDIT_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true
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
        isFetching: false
      };
    case EDIT_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case DELETE_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((superadmin) => superadmin._id !== action.payload),
        isFetching: false
      };
    case DELETE_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case GETBYID_SUPERADMIN_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GETBYID_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case GETBYID_SUPERADMIN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
