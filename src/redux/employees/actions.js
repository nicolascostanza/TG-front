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
export const showAddEdit = (show) => ({
  type: types.SHOW_MODAL_EDIT,
  payload: show
});
