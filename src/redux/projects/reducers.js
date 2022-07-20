import * as types from './constants';

const initialState = {
  list: [],
  isFetching: false,
  error: '',
  createModalShow: false,
  editModalShow: false,
  message: ''
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
        ...state
      };
    case types.ADD_NEW_PROJECT_FULFILLED:
      return {
        ...state,
        list: [...state.list, action.payload.project],
        message: action.payload.message
      };
    case types.ADD_NEW_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload
      };
    // UPDATE PROJECT
    case types.UPDATE_PROJECT_PENDING:
      return {
        ...state
      };
    case types.UPDATE_PROJECT_FULFILLED:
      return {
        ...state,
        list: state.list.map((item) =>
          item._id === action.payload.project._id ? action.payload.project : item
        ),
        message: action.payload.message
      };
    case types.UPDATE_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload,
        message: action.payload
      };
    // DELETE PROJECTS
    case types.DELETE_PROJECT_PENDING:
      return {
        ...state
      };
    case types.DELETE_PROJECT_FULFILLED:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
        isFetching: false
      };
    case types.DELETE_PROJECT_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        message: action.payload
      };
    // MODAL HANDLING FUNCTIONS
    case types.CLOSE_ALL_MODALS:
      return {
        ...state,
        createModalShow: false,
        editModalShow: false
      };
    case types.SHOW_CREATE_MODAL:
      return {
        ...state,
        createModalShow: true
      };
    case types.SHOW_EDIT_MODAL:
      return {
        ...state,
        editModalShow: true
      };
    // ADD EMPLOYEE TO PROJECT
    case types.ADD_EMPLOYEE_TO_PROJECT_PENDING:
      return {
        ...state
      };
    case types.ADD_EMPLOYEE_TO_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.map((project) =>
          project._id === action.payload._id ? action.payload : project
        )
      };
    case types.ADD_EMPLOYEE_TO_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload
      };
    // ADD TASK TO PROJECT
    case types.ADD_TASK_TO_PROJECT_PENDING:
      return {
        ...state
      };
    case types.ADD_TASK_TO_PROJECT_FULFILLED:
      return {
        ...state,
        list: state.list.map((project) =>
          project._id === action.payload._id ? action.payload : project
        )
      };
    case types.ADD_TASK_TO_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload
      };
    // DELETE TASK TO PROJECT
    case types.DELETE_TASK_TO_PROJECT_PENDING:
      return {
        ...state
      };
    case types.DELETE_TASK_TO_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.map((project) =>
          project._id === action.payload._id ? action.payload : project
        )
      };
    case types.DELETE_TASK_TO_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload
      };
    // DELETE EMPLOYEE TO PROJECTS
    case types.DELETE_EMPLOYEE_TO_PROJECT_PENDING:
      return {
        ...state
      };
    case types.DELETE_EMPLOYEE_TO_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.map((project) =>
          project._id === action.payload._id ? action.payload : project
        )
      };
    case types.DELETE_EMPLOYEE_TO_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload
      };
    // UPDATE EMPLOYEE IN PROJECT
    case types.UPDATE_EMPLOYEE_TO_PROJECT_PENDING:
      return {
        ...state
      };
    case types.UPDATE_EMPLOYEE_TO_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.map((project) =>
          project._id === action.payload._id ? action.payload : project
        )
      };
    case types.UPDATE_EMPLOYEE_TO_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload
      };
    // UPDATE TASK IN PROJECT
    case types.UPDATE_TASK_TO_PROJECT_PENDING:
      return {
        ...state
      };
    case types.UPDATE_TASK_TO_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.map((project) =>
          project._id === action.payload._id ? action.payload : project
        )
      };
    case types.UPDATE_TASK_TO_PROJECT_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
