import * as types from './constants';

let taskUpdate = [];

const initialState = {
  list: [],
  isFetching: false,
  error: ''
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TASKS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.GET_TASKS_FULLFILLED:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case types.GET_TASKS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case types.ADD_TASK_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.ADD_TASK_FULLFILLED:
      return {
        ...state,
        list: [...state.list, action.payload],
        isFetching: false
      };
    case types.ADD_TASK_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case types.DELETE_TASK_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.DELETE_TASK_FULLFILLED:
      return {
        ...state,
        list: state.list.filter((task) => task._id !== action.payload),
        isFetching: false
      };
    case types.DELETE_TASK_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case types.EDIT_TASK_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.EDIT_TASK_FULLFILLED:
      taskUpdate = state.list.map((task) => {
        if (task._id === action.payload._id) {
          return action.payload;
        } else {
          return task;
        }
      });
      return {
        ...state,
        list: taskUpdate,
        isFetching: false
      };

    case types.EDIT_TASK_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
};
