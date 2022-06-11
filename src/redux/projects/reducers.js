import * as types from './constants';

// Second, the reducer, it receive 2 params (currentState, action)
// We need an initial state so it does not break

const initialState = {
  list: [],
  isFetching: false,
  error: ''
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET INITIAL DATA
    case types.GET_PROJECTS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.GET_PROJECTS_FULFILLED:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case types.GET_PROJECTS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    // ADD NEW PROJECT
    case types.ADD_NEW_PROJECT_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.ADD_NEW_PROJECT_FULFILLED:
      return {
        ...state,
        list: [...state.list, action.payload],
        isFetching: false
      };
    case types.ADD_NEW_PROJECT_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    // UPDATE PROJECT
    case types.UPDATE_PROJECT_FULFILLED:
      return {
        ...state,
        list: action.payload
      };
    case types.DELETE_PROJECT_FULFILLED:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state;
  }
};
