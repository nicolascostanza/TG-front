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
export const addNewProjectFulfilled = (project) => ({
  type: types.ADD_NEW_PROJECT_FULFILLED,
  payload: project
});

export const addNewProjectPending = () => ({
  type: types.ADD_NEW_PROJECT_PENDING
});

export const addNewProjectFailed = (error) => ({
  type: types.ADD_NEW_PROJECT_FAILED,
  payload: error
});

// UPDATE PROJECT
export const updateProjectFulfilled = (project) => ({
  type: types.UPDATE_PROJECT_FULFILLED,
  payload: project
});
export const updateProjectPending = () => ({
  type: types.UPDATE_PROJECT_PENDING
});
export const updateProjectFailed = () => ({
  type: types.UPDATE_PROJECT_FAILED
});

// DELETE PROJECT
export const deleteProjectFulfilled = (project) => ({
  type: types.DELETE_PROJECT_FULFILLED,
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
