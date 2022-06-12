import { getTasksApi } from '../../Components/Tasks/api';
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
