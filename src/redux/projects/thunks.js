import * as api from '../../Components/Projects/api';
import * as actions from './actions';
import * as thunksTasks from 'redux/tasks/thunks';
import { postMessageOnSlack } from 'slackIntegration';

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
          postMessageOnSlack('New project Added!');
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
        dispatch(actions.addEmployeeToProjectSuccess(response.data, response.message));
        if (!response.error) {
          dispatch(actions.closeAllModals());
          const employeeName = response.data.team.find(
            (item) => item.employeeId._id === body.employeeId
          ).employeeId.firstName;
          console.log('data: ', response.data);
          postMessageOnSlack(`Added ${employeeName} to ${response.data.name} as ${body.role}`);
        }
      })
      .catch((error) => {
        dispatch(actions.addEmployeeToProjectFailed(error));
      });
  };
};

export const deleteEmployeeToProject = (idProject, idEmployee) => {
  return (dispatch) => {
    dispatch(actions.deleteEmployeeToProjectPending());
    api
      .deleteEmployeeToProjectApi(idProject, idEmployee)
      .then((response) => {
        dispatch(actions.deleteEmployeeToProjectSuccess(response.data, response.message));
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
        dispatch(actions.addTaskToProjectFulfilled(response.data, response.message));
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
    api
      .deleteTaskToProjectApi(idProject, id)
      .then((response) => {
        dispatch(thunksTasks.addTask(body));
        dispatch(actions.updateTaskToProjectFulfilled(response.data, response.message));
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
        dispatch(actions.deleteTaskToProjectSuccess(response.data, response.message));
        if (!response.error) {
          dispatch(actions.closeAllModals());
        }
      })
      .catch((error) => {
        dispatch(actions.deleteTaskToProjectFailed(error));
      });
  };
};
// dispatch(thunksProjects.updateEmployeeToProject(idProject, sendData));
export const updateEmployeeToProject = (idProject, body) => {
  return (dispatch) => {
    dispatch(actions.updateEmployeeToProjectPending());
    api
      .updateEmployeeInProject(idProject, body)
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        api
          .getProjectByIdApi(idProject)
          .then((response) => {
            if (response.error) {
              throw response.error;
            }
            dispatch(
              actions.updateEmployeeToProjectSuccess(response.data, 'Employee Updated successfully')
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        dispatch(actions.updateEmployeeToProjectFailed(error));
      });
  };
};
