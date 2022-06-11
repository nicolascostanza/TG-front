import { getProjectsApi } from '../../Components/Projects/api';
import * as actions from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(actions.getProjectsPending());
    getProjectsApi()
      .then((response) => {
        dispatch(actions.getProjectsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.getProjectsFailed(error));
      });
  };
};
