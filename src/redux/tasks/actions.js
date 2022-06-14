import * as types from './constants';

export const getTasksFullfilled = (tasks) => ({
  type: types.GET_TASKS_FULLFILLED,
  payload: tasks
});

export const getTasksPending = () => ({
  type: types.GET_TASKS_PENDING
});

export const getTasksFailed = (error) => ({
  type: types.GET_TASKS_FAILED,
  payload: error
});

export const addTaskFullfilled = (task) => ({
  type: types.ADD_TASK_FULLFILLED,
  payload: task
});

export const addTaskPending = () => ({
  type: types.ADD_TASK_PENDING
});

export const addTaskFailed = (error) => ({
  type: types.ADD_TASK_FAILED,
  payload: error
});

export const deleteTaskFullfilled = (task) => ({
  type: types.DELETE_TASK_FULLFILLED,
  payload: task._id
});

export const deleteTaskPending = () => ({
  type: types.DELETE_TASK_PENDING
});

export const deleteTaskFailed = (error) => ({
  type: types.DELETE_TASK_FAILED,
  payload: error
});

export const editTaskFullfilled = (task) => ({
  type: types.EDIT_TASK_FULLFILLED,
  payload: task
});

export const editTaskPending = () => ({
  type: types.EDIT_TASK_PENDING
});

export const editTaskFailed = (error) => ({
  type: types.EDIT_TASK_FAILED,
  payload: error
});
