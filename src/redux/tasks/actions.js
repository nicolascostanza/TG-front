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

export const editTaskFullfilled = (task) => ({
  type: types.EDIT_TASK_FULLFILLED,
  payload: task
});

export const deleteTaskFulllfilled = (task) => ({
  type: types.DELETE_TASK_FULLFILLED,
  payload: task
});
