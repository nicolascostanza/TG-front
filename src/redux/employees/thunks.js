import * as actions from './actions';
import * as currentUserActions from 'redux/currentUser/actions';

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
      const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          token
        },
        body: JSON.stringify({
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          email: newEmployee.email,
          gender: newEmployee.gender,
          address: newEmployee.address,
          dob: newEmployee.dob,
          password: newEmployee.password,
          phone: newEmployee.phone,
          active: newEmployee.active
        })
      });
      const res = await response.json();
      const { firstName, lastName, email, gender, address, dob, password, phone, active } =
        newEmployee;
      if (res.error) {
        throw res.error;
      }
      dispatch(
        actions.addEmployeeSucces(
          {
            _id: res.data._id,
            firstName,
            lastName,
            email,
            gender,
            address,
            dob,
            password,
            phone,
            active: active ? 'true' : 'false'
          },
          res
        )
      );
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
