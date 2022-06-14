import { getTasksApi, addTaskApi, deleteTaskApi } from '../../Components/Tasks/api';
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
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(actions.addTaskFailed(error));
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    console.log('id para borrar1 ', id);
    dispatch(actions.deleteTaskPending());
    deleteTaskApi(id)
      .then((response) => {
        dispatch(actions.deleteTaskFullfilled(response.data));
        // console.log('id para borrar', response.data);
      })
      .catch((error) => {
        dispatch(actions.deleteTaskFailed(error));
        // console.log('error: ', error);
      });
  };
};
