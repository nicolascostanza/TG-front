import * as types from './constants';

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
    case types.ADD_TASK_FULLFILLED:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case types.EDIT_TASK_FULLFILLED:
      return {
        ...state,
        list: action.payload
      };
    case types.DELETE_TASK_FULLFILLED:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state;
  }
};
