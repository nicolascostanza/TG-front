import * as types from './constants';

// First, we fetch the data from our resource
export const getProjectsFulfilled = (projects) => ({
  type: types.GET_PROJECTS_FULFILLED,
  payload: projects
});

export const addNewProject = (project) => ({
  type: types.ADD_NEW_PROJECT,
  payload: project
});

export const updateProject = (project) => ({
  type: types.UPDATE_PROJECT,
  payload: project
});

export const deleteProject = (project) => ({
  type: types.DELETE_PROJECT,
  payload: project
});
