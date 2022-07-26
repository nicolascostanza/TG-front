import * as types from './constants';

export const getEmployeesSuccess = (employees) => ({
  type: types.GET_EMPLOYEES_SUCCESS,
  payload: employees
});

export const getEmployeesPending = () => ({
  type: types.GET_EMPLOYEES_PENDING
});

export const getEmployeesError = (error) => ({
  type: types.GET_EMPLOYEES_ERROR,
  payload: error
});

export const deleteEmployeeSucces = (id, res) => ({
  type: types.DELETE_EMPLOYEE_SUCCESS,
  payload: { id, res }
});

export const deleteEmployeePending = () => ({
  type: types.DELETE_EMPLOYEE_PENDING
});

export const deleteEmployeeError = (error) => ({
  type: types.DELETE_EMPLOYEE_ERROR,
  payload: error
});
export const addEmployeeSucces = (employee, res) => ({
  type: types.ADD_EMPLOYEE_SUCCESS,
  payload: { employee, res }
});

export const addEmployeePending = () => ({
  type: types.ADD_EMPLOYEE_PENDING
});

export const addEmployeeError = (error) => ({
  type: types.ADD_EMPLOYEE_ERROR,
  payload: error
});
export const editEmployeeSucces = (employee, res) => ({
  type: types.EDIT_EMPLOYEE_SUCCESS,
  payload: { employee, res }
});

export const editEmployeePending = () => ({
  type: types.EDIT_EMPLOYEE_PENDING
});

export const editEmployeeError = (error) => ({
  type: types.EDIT_EMPLOYEE_ERROR,
  payload: error
});
// push associated projects
export const pushProjectAssociatedInEmployeeSuccess = (employee, res) => ({
  type: types.PUSH_PROJECTS_ASSOCIATED_IN_EMPLOYEE_SUCCESS,
  payload: { employee, res }
});

export const pushProjectAssociatedInEmployeePending = () => ({
  type: types.PUSH_PROJECTS_ASSOCIATED_IN_EMPLOYEE_PENDING
});

export const pushProjectAssociatedInEmployeeError = (error) => ({
  type: types.PUSH_PROJECTS_ASSOCIATED_IN_EMPLOYEE_ERROR,
  payload: error
});
// edit associated project
export const pushEditProjectAssociatedInEmployeeSuccess = (employee, res) => ({
  type: types.PUSH_EDIT_PROJECTS_ASSOCIATED_IN_EMPLOYEE_SUCCESS,
  payload: { employee, res }
});

export const pushEditProjectAssociatedInEmployeePending = () => ({
  type: types.PUSH_EDIT_PROJECTS_ASSOCIATED_IN_EMPLOYEE_PENDING
});

export const pushEditProjectAssociatedInEmployeeError = (error) => ({
  type: types.PUSH_EDIT_PROJECTS_ASSOCIATED_IN_EMPLOYEE_ERROR,
  payload: error
});
// delete associated projects
export const pullProjectAssociatedInEmployeeSuccess = (employee, res) => ({
  type: types.PULL_PROJECTS_ASSOCIATED_IN_EMPLOYEE_SUCCESS,
  payload: { employee, res }
});

export const pullProjectAssociatedInEmployeePending = () => ({
  type: types.PULL_PROJECTS_ASSOCIATED_IN_EMPLOYEE_PENDING
});

export const pullProjectAssociatedInEmployeeError = (error) => ({
  type: types.PULL_PROJECTS_ASSOCIATED_IN_EMPLOYEE_ERROR,
  payload: error
});
