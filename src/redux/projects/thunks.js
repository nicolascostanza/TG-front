import * as api from '../../Components/Projects/api';
import * as actions from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(actions.getProjectsPending());
    api
      .getProjectsApi()
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
    api
      .addNewProjectApi(body)
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

export const updateProject = (body, id) => {
  return (dispatch) => {
    dispatch(actions.updateProjectPending());
    api
      .updateProjectApi(body, id)
      .then((response) => {
        dispatch(actions.updateProjectFulfilled(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.updateProjectFailed(error));
      });
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    dispatch(actions.deleteProjectPending());
    api
      .deleteProjectApi(id)
      .then((response) => {
        dispatch(actions.deleteProjectFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.deleteProjectFailed(error));
      });
  };
};

export const addEmployeeToProject = (body, id) => {
  return (dispatch) => {
    dispatch(actions.addEmployeeToProjectPending());
    api
      .addEmployeeToProjectaApi(body, id)
      .then((response) => {
        console.log('response:', response);
        console.log('aca el dispatch', response.data, id);
        dispatch(actions.addEmployeeToProject(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.addEmployeeToProjectFailed(error));
      });
  };
};

export const addTaskToProject = (body, id) => {
  return (dispatch) => {
    dispatch(actions.addTaskToProjectPending());
    api
      .addTaskToProjectApi(body, id)
      .then((response) => {
        dispatch(actions.addTaskToProject(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.addTaskToProjectFailed(error));
      });
  };
};
export const deleteTaskToProject = (idProject, idTask) => {
  return (dispatch) => {
    dispatch(actions.deleteTaskToProjectPending());
    api
      .deleteTaskToProjectApi(idProject, idTask)
      .then((response) => {
        dispatch(actions.deleteTaskToProject(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.deleteTaskToProjectFailed(error));
      });
  };
};

export const deleteEmployeeToProject = (idProject, idEmployee) => {
  return (dispatch) => {
    dispatch(actions.deleteEmployeeToProjectPending());
    api
      .deleteEmployeeToProjectApi(idProject, idEmployee)
      .then((response) => {
        dispatch(actions.deleteEmployeeToProject(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.deleteEmployeeToProjectFailed(error));
      });
  };
};
