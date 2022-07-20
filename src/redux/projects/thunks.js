import * as api from '../../Components/Projects/api';
import * as actions from './actions';
import * as thunksTasks from 'redux/tasks/thunks';

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
        dispatch(actions.addNewProjectFulfilled(response.data, response.message));
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
        if (response.error) {
          throw response.error;
        }
        dispatch(actions.updateProjectFulfilled(response.data, response.message));
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
        dispatch(actions.deleteProjectFulfilled(response.data, response.message));
      })
      .catch((error) => {
        dispatch(actions.deleteProjectFailed(error));
      });
  };
};
// functions of employee in projects
export const addEmployeeToProject = (body, id) => {
  return (dispatch) => {
    dispatch(actions.addEmployeeToProjectPending());
    api
      .addEmployeeToProjectaApi(body, id)
      .then((response) => {
        console.log('response.datA del employee:', response.data);
        dispatch(actions.addEmployeeToProjectSuccess(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.addEmployeeToProjectFailed(error));
      });
  };
};
// export const updateEmployeeToProject = (body, id, idProject) => {
//   return (dispatch) => {
//     dispatch(actions.updateEmployeeToProjectPending());
//     api.deleteEmployeeToProjectApi(idProject, id);
//     api
//       .addEmployeeToProjectaApi(body, idProject)
//       .then((response) => {
//         dispatch(actions.updateEmployeeToProjectSuccess(response.data));
//         if (!response.error) {
//           dispatch(actions.closeAllModals());
//         }
//       })
//       .catch((error) => {
//         dispatch(actions.updateEmployeeToProjectFailed(error));
//       });
//   };
// };

export const deleteEmployeeToProject = (idProject, idEmployee) => {
  return (dispatch) => {
    dispatch(actions.deleteEmployeeToProjectPending());
    api
      .deleteEmployeeToProjectApi(idProject, idEmployee)
      .then((response) => {
        dispatch(actions.deleteEmployeeToProjectSuccess(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.deleteEmployeeToProjectFailed(error));
      });
  };
};
// functions of tasks in projects
export const addTaskToProject = (id, parentProjectId) => {
  return (dispatch) => {
    dispatch(actions.addTaskToProjectPending());
    api
      .addTaskToProjectApi(id, parentProjectId)
      .then((response) => {
        dispatch(actions.addTaskToProjectFulfilled(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.addTaskToProjectFailed(error));
      });
  };
};

// dispatch(thunksProjects.deleteTaskToProject(idProject, idToForm));
// dispatch(thunksTasks.addTask(taskToAdd));
export const updateTaskToProject = (body, id, idProject) => {
  return (dispatch) => {
    dispatch(actions.updateTaskToProjectPending());
    api.deleteTaskToProjectApi(idProject, id);
    dispatch(thunksTasks.addTask(body))
      .then((response) => {
        dispatch(actions.updateTaskToProjectFulfilled(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.updateTaskToProjectFailed(error));
      });
  };
};

export const deleteTaskToProject = (idProject, idTask) => {
  return (dispatch) => {
    dispatch(actions.deleteTaskToProjectPending());
    api
      .deleteTaskToProjectApi(idProject, idTask)
      .then((response) => {
        dispatch(actions.deleteTaskToProjectSuccess(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.deleteTaskToProjectFailed(error));
      });
  };
};
// updateEmployeeInProject
export const updateEmployeeToProject = (idProject, body) => {
  return (dispatch) => {
    dispatch(actions.updateEmployeeToProjectPending());
    api
      .updateEmployeeInProject(idProject, body)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        console.log('response de el update employee:', response);
      })
      .catch((error) => {
        console.log('error del update employee:', error);
      });
    api
      .getProjectByIdApi(idProject)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        dispatch(actions.updateEmployeeToProjectSuccess(response.data));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.updateEmployeeToProjectFailed(error));
      });
  };
};
