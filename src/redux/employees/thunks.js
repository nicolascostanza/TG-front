import { useSelector } from 'react-redux';
import * as actions from './actions';
import * as currentUserActions from 'redux/currentUser/actions';
import * as thunksAuth from 'redux/auth/thunks';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(actions.getEmployeesPending());
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    return fetch(`${process.env.REACT_APP_API_URL}/employees`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        response.data.map((employee) => {
          employee.active = employee.active ? 'true' : 'false';
        });
        dispatch(actions.getEmployeesSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(actions.getEmployeesError(error.toString()));
      });
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch(actions.deleteEmployeePending());
    try {
      const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: { token }
      });
      const res = await response.json();
      dispatch(actions.deleteEmployeeSucces(id, res));
    } catch (error) {
      dispatch(actions.deleteEmployeeError(error.toString()));
    }
  };
};

export const addEmployee = (newEmployee) => {
  return async (dispatch) => {
    dispatch(actions.addEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          email: newEmployee.email,
          password: newEmployee.password,
          active: true,
          associatedProjects: []
        })
      });
      const res = await response.json();
      const { firstName, lastName, email, password, active } = newEmployee;
      const credentials = {
        email,
        password
      };
      dispatch(
        actions.addEmployeeSucces(
          {
            _id: res.data._id,
            firstName,
            lastName,
            email,
            password,
            active: active ? 'true' : 'false',
            associatedProjects: []
          },
          res
        )
      );
      if (res.error) {
        throw res.error;
      }
      dispatch(thunksAuth.login(credentials));
    } catch (error) {
      dispatch(actions.addEmployeeError(error));
    }
  };
};

export const editEmployee = (newEmployee) => {
  return async (dispatch) => {
    dispatch(actions.editEmployeePending());
    try {
      const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees/${newEmployee._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            token
          },
          body: JSON.stringify({
            firstName: newEmployee.firstName,
            lastName: newEmployee.lastName,
            email: newEmployee.email,
            password: newEmployee.password
          })
        }
      );

      const res = await response.json();

      if (res.error) {
        throw res.message;
      }
      dispatch(actions.editEmployeeSucces(newEmployee, res));
      dispatch(currentUserActions.updateCurrentUser(res.data));
    } catch (error) {
      dispatch(actions.editEmployeeError(error));
    }
  };
};
// add project associated in employee
export const pushProjectAssociatedInEmployee = (newProjectAssociated, idEmployee) => {
  return async (dispatch) => {
    dispatch(actions.pushProjectAssociatedInEmployeePending());
    try {
      const currentUser = useSelector((state) => state.currentUser.currentUser);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees/${idEmployee}/project`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newProjectAssociated)
        }
      );
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(actions.pushProjectAssociatedInEmployeeSuccess(res.data, res.message));
      if (idEmployee === currentUser._id) {
        dispatch(currentUserActions.updateCurrentUser(res.data));
      }
    } catch (error) {
      dispatch(actions.pushProjectAssociatedInEmployeeError(error));
    }
  };
};
// edit project associated in employee
export const pushEditProjectAssociatedInEmployee = (editProjectAssociated, idEmployee) => {
  return async (dispatch) => {
    dispatch(actions.pushEditProjectAssociatedInEmployeePending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees/${idEmployee}/edit/project`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(editProjectAssociated)
        }
      );

      const res = await response.json();

      if (res.error) {
        throw res.message;
      }
      dispatch(actions.pushEditProjectAssociatedInEmployeeSuccess(res.data, res.message));
      dispatch(currentUserActions.updateCurrentUser(res.data));
    } catch (error) {
      dispatch(actions.pushEditProjectAssociatedInEmployeeError(error));
    }
  };
};
// delete associated project in employee
export const deleteProjectAssociated = (idEmployee, idProject) => {
  return async (dispatch) => {
    dispatch(actions.pullProjectAssociatedInEmployeePending());
    try {
      const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employees/${idEmployee}/project/${idProject}`,
        {
          method: 'PUT',
          headers: { token }
        }
      );
      const res = await response.json();
      dispatch(actions.pullProjectAssociatedInEmployeeSuccess(idEmployee, res));
    } catch (error) {
      dispatch(actions.pullProjectAssociatedInEmployeeError(error.toString()));
    }
  };
};
