import { getProjectsApi, addNewProjectApi, deleteProjectApi } from '../../Components/Projects/api';
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

export const addNewProject = (body) => {
  return (dispatch) => {
    dispatch(actions.addNewProjectPending());
    addNewProjectApi(body)
      .then((response) => {
        dispatch(actions.addNewProjectFulfilled(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.addNewProjectFailed(error));
      });
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    dispatch(actions.deleteProjectPending());
    deleteProjectApi(id)
      .then((response) => {
        dispatch(actions.deleteProjectFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.deleteProjectFailed(error));
      });
  };
};
