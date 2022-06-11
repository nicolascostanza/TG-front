import * as types from './constants';

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

export const addNewProjectFulfilled = (project) => ({
  type: types.ADD_NEW_PROJECT,
  payload: project
});

export const updateProjectFulfilled = (project) => ({
  type: types.UPDATE_PROJECT,
  payload: project
});

export const deleteProjectFulfilled = (project) => ({
  type: types.DELETE_PROJECT,
  payload: project
});
