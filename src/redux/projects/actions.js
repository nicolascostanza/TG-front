import * as types from './constants';

// GET INITIAL DATA
export const getProjectsFulfilled = (projects) => ({
  type: types.GET_PROJECTS_FULFILLED,
  payload: projects
});

export const getProjectsPending = () => ({
  type: types.GET_PROJECTS_PENDING
});

export const getProjectsFailed = (error) => ({
  type: types.GET_PROJECTS_FAILED,
  payload: error
});

// ADD NEW PROJECT
export const addNewProjectFulfilled = (project, message) => ({
  type: types.ADD_NEW_PROJECT_FULFILLED,
  payload: { project, message }
});

export const addNewProjectPending = () => ({
  type: types.ADD_NEW_PROJECT_PENDING
});

export const addNewProjectFailed = (error) => ({
  type: types.ADD_NEW_PROJECT_FAILED,
  payload: error
});

// UPDATE PROJECT
export const updateProjectFulfilled = (project, message) => ({
  type: types.UPDATE_PROJECT_FULFILLED,
  payload: { project, message }
});
export const updateProjectPending = () => ({
  type: types.UPDATE_PROJECT_PENDING
});
export const updateProjectFailed = (error) => ({
  type: types.UPDATE_PROJECT_FAILED,
  payload: error
});

// DELETE PROJECT
export const deleteProjectFulfilled = (project) => ({
  type: types.DELETE_PROJECT_FULFILLED,
  // ver pq no funciona el delete project, {project._id, message} en payload
  payload: project._id
});

export const deleteProjectPending = () => ({
  type: types.DELETE_PROJECT_PENDING
});

export const deleteProjectFailed = (error) => ({
  type: types.DELETE_PROJECT_FAILED,
  payload: error
});

// MODAL HANDLING FUNCTIONS
export const closeAllModals = () => ({
  type: types.CLOSE_ALL_MODALS
});

export const showCreateModal = () => ({
  type: types.SHOW_CREATE_MODAL
});

export const showEditModal = () => ({
  type: types.SHOW_EDIT_MODAL
});

// ADD EMPLOYEE TO PROJECT
export const addEmployeeToProjectSuccess = (project) => ({
  type: types.ADD_EMPLOYEE_TO_PROJECT_SUCCESS,
  payload: project
});

export const addEmployeeToProjectPending = () => ({
  type: types.ADD_EMPLOYEE_TO_PROJECT_PENDING
});

export const addEmployeeToProjectFailed = (error) => ({
  type: types.ADD_EMPLOYEE_TO_PROJECT_FAILED,
  payload: error
});

// ADD_TASK_TO_PROJECT
export const addTaskToProjectFulfilled = (project) => ({
  type: types.ADD_TASK_TO_PROJECT_FULFILLED,
  payload: project
});

export const addTaskToProjectPending = () => ({
  type: types.ADD_TASK_TO_PROJECT_PENDING
});

export const addTaskToProjectFailed = (error) => ({
  type: types.ADD_TASK_TO_PROJECT_FAILED,
  payload: error
});
// DELETE_TASK_TO_PROJECT
export const deleteTaskToProjectSuccess = (task) => ({
  type: types.DELETE_TASK_TO_PROJECT_SUCCESS,
  payload: task
});

export const deleteTaskToProjectPending = () => ({
  type: types.DELETE_TASK_TO_PROJECT_PENDING
});

export const deleteTaskToProjectFailed = (error) => ({
  type: types.DELETE_TASK_TO_PROJECT_FAILED,
  payload: error
});
// DELETE_EMPLOYEE_TO_PROJECT
export const deleteEmployeeToProjectSuccess = (project) => ({
  type: types.DELETE_EMPLOYEE_TO_PROJECT_SUCCESS,
  payload: project
});

export const deleteEmployeeToProjectPending = () => ({
  type: types.DELETE_EMPLOYEE_TO_PROJECT_PENDING
});

export const deleteEmployeeToProjectFailed = (error) => ({
  type: types.DELETE_EMPLOYEE_TO_PROJECT_FAILED,
  payload: error
});
// UPDATE EMPLOYEE IN PROJECT
export const updateEmployeeToProjectSuccess = (project) => ({
  type: types.UPDATE_EMPLOYEE_TO_PROJECT_SUCCESS,
  payload: project
});

export const updateEmployeeToProjectPending = () => ({
  type: types.UPDATE_EMPLOYEE_TO_PROJECT_PENDING
});

export const updateEmployeeToProjectFailed = (error) => ({
  type: types.UPDATE_EMPLOYEE_TO_PROJECT_FAILED,
  payload: error
});

// updateTaskToProject
// UPDATE TASK IN PROJECT
export const updateTaskToProjectPending = (project) => ({
  type: types.UPDATE_TASK_TO_PROJECT_PENDING,
  payload: project
});

export const updateTaskToProjectFulfilled = () => ({
  type: types.UPDATE_TASK_TO_PROJECT_SUCCESS
});

export const updateTaskToProjectFailed = (error) => ({
  type: types.UPDATE_TASK_TO_PROJECT_FAILED,
  payload: error
});
