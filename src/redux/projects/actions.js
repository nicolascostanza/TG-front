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
export const addNewProjectFulfilled = (projects) => ({
  type: types.ADD_NEW_PROJECT_FULFILLED,
  payload: projects
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

export const deleteProjectFulfilled = (project) => ({
  type: types.DELETE_PROJECT_FULFILLED,
  payload: project
});
