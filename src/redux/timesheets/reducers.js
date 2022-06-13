import * as types from './constants';

const initialState = {
  list: [],
  isFetching: false,
  error: ''
};

export const timesheetReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET
    case types.GET_TIMESHEET_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.GET_TIMESHEET_FULFILLED:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case types.GET_TIMESHEET_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    //ADD
    case types.ADD_TIMESHEET_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.ADD_TIMESHEET_FULFILLED:
      return {
        ...state,
        list: [...state.list, action.payload],
        isFetching: false
      };
    case types.ADD_TIMESHEET_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    // //UPDATE
    // case types.UPDATE_TIMESHEET_PENDING:
    //   return {
    //     ...state,
    //     isFetching: true
    //   };
    // case types.UPDATE_TIMESHEET_FULFILLED:
    //   return {
    //     ...state,
    //     list: action.payload,
    //     isFetching: false
    //   };
    // case types.UPDATE_TIMESHEET_FAILED:
    //   return {
    //     ...state,
    //     isFetching: false,
    //     error: action.payload
    //   };
    //DELETE
    case types.DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case types.DELETE_TIMESHEET_FULFILLED:
      return {
        ...state,
        list: state.list.filter((timeSheet) => timeSheet._id !== action.payload),
        isFetching: false
      };
    case types.DELETE_TIMESHEET_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
