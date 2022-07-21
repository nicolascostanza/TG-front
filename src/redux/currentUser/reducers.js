import * as types from './constants';

const initialState = {
  isFetching: false,
  currentUser: JSON.parse(sessionStorage.getItem('currentUser')) || {},
  error: ''
};

export const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_USER_BY_EMAIL_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.GET_CURRENT_USER_BY_EMAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: { ...action.payload }
      };
    case types.GET_CURRENT_USER_BY_EMAIL_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case types.SET_CURRENT_USER_TO_INITIAL_STATE:
      return {
        ...state,
        ...initialState
      };
    case types.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    default:
      return state;
  }
};
