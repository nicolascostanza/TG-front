import * as types from './constants';

const initialState = {
  list: [],
  isFetching: false,
  error: false,
  message: '',
  messageRegister: ''
};
let updatedEmployee = [];

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false,
        error: false
      };
    case types.GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case types.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((e) => e._id !== action.payload.id),
        isFetching: false,
        error: action.payload.res.error,
        message: action.payload.res.message
      };
    case types.DELETE_EMPLOYEE_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.payload.error
      };
    case types.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload.employee],
        isFetching: false,
        error: action.payload.res.error,
        message: action.payload.res.message,
        messageRegister: 'Successful registration'
      };
    case types.ADD_EMPLOYEE_PENDING:
      return {
        ...state,
        messageRegister: ''
      };
    case types.ADD_EMPLOYEE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.payload,
        messageRegister: 'Error when registering'
      };
    case types.EDIT_EMPLOYEE_SUCCESS:
      updatedEmployee = state.list.map((item) => {
        if (item._id === action.payload.employee._id) {
          return action.payload.employee;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: updatedEmployee,
        error: action.payload.res.error,
        isFetching: false,
        message: action.payload.res.message
      };
    case types.EDIT_EMPLOYEE_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.EDIT_EMPLOYEE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.payload
      };
    // HERE THE NEW ASSOCIATED PROJECT
    case types.PUSH_PROJECTS_ASSOCIATED_IN_EMPLOYEE_SUCCESS:
      updatedEmployee = state.list.map((item) => {
        if (item._id === action.payload.employee._id) {
          return action.payload.employee;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: updatedEmployee,
        error: false,
        isFetching: false,
        message: action.payload.res.message
      };
    case types.PUSH_PROJECTS_ASSOCIATED_IN_EMPLOYEE_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case types.PUSH_PROJECTS_ASSOCIATED_IN_EMPLOYEE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.payload
      };
    // HERE THE UPDATED PROJECT ASSOCIATED
    case types.PUSH_EDIT_PROJECTS_ASSOCIATED_IN_EMPLOYEE_SUCCESS:
      updatedEmployee = state.list.map((item) => {
        if (item._id === action.payload.employee._id) {
          return action.payload.employee;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: updatedEmployee,
        error: false,
        isFetching: false,
        message: action.payload.res.message
      };
    case types.PUSH_EDIT_PROJECTS_ASSOCIATED_IN_EMPLOYEE_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case types.PUSH_EDIT_PROJECTS_ASSOCIATED_IN_EMPLOYEE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.payload
      };
    // HERE DELETE ASSOCIATED PROJECT
    // review delete reducer success
    case types.PULL_PROJECTS_ASSOCIATED_IN_EMPLOYEE_SUCCESS:
      updatedEmployee = state.list.map((item) => {
        if (item._id === action.payload.employee._id) {
          return action.payload.employee;
        } else {
          return item;
        }
      });
      return {
        ...state,
        list: updatedEmployee,
        error: false,
        isFetching: false,
        message: action.payload.res.message
      };
    case types.PULL_PROJECTS_ASSOCIATED_IN_EMPLOYEE_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case types.PULL_PROJECTS_ASSOCIATED_IN_EMPLOYEE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        message: action.payload
      };
    default:
      return state;
  }
};
