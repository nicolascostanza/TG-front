import { getTasksApi, addTaskApi } from '../../Components/Tasks/api';
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

export const addTaskThunk = (newTask) => {
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
