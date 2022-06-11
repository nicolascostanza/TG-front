import * as types from './constants';

// Second, the reducer, it receive 2 params (currentState, action)
// We need an initial state so it does not break

const initialState = {
  list: []
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROJECTS_FULFILLED:
      return {
        ...state,
        list: action.payload
      };
    case types.ADD_NEW_PROJECT:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case types.UPDATE_PROJECT:
      return {
        ...state,
        list: action.payload
      };
    case types.DELETE_PROJECT:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state;
  }
};
