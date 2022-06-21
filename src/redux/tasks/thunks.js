import { getTasksApi, addTaskApi, deleteTaskApi, editTaskApi } from '../../Components/Tasks/api';
import * as actions from './actions';

export const getTasks = () => {
  return (dispatch) => {
    dispatch(actions.getTasksPending());
    getTasksApi()
      .then((response) => {
        dispatch(actions.getTasksFullfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.getTasksFailed(error));
      });
  };
};

export const addTask = (newTask) => {
  return (dispatch) => {
    dispatch(actions.addTaskPending());
    addTaskApi(newTask)
      .then((response) => {
        dispatch(actions.addTaskFullfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.addTaskFailed(error));
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(actions.deleteTaskPending());
    deleteTaskApi(id)
      .then((response) => {
        dispatch(actions.deleteTaskFullfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.deleteTaskFailed(error));
      });
  };
};

export const editTask = (taskNewInfo, id) => {
  return async (dispatch) => {
    dispatch(actions.editTaskPending());
    await editTaskApi(taskNewInfo, id)
      .then((response) => {
        dispatch(actions.editTaskFullfilled(response));
      })
      .catch((error) => {
        dispatch(actions.editTaskFailed(error));
      });
  };
};
