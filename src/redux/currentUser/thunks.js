import * as actions from './actions';

export const getCurrentUserByEmail = (email, token, role) => {
  if (role === 'EMPLOYEE') {
    return (dispatch) => {
      dispatch(actions.getCurrentUserByEmailPending());
      return fetch(`${process.env.REACT_APP_API_URL}/employees?email=${email}`, {
        headers: { token }
      })
        .then((response) => response.json())
        .then((json) => {
          return dispatch(actions.getCurrentUserByEmailSuccess(json.data[0]));
        })
        .catch((error) => {
          return dispatch(actions.getCurrentUserByEmailError(error));
        });
    };
  } else if (role === 'ADMIN') {
    return (dispatch) => {
      dispatch(actions.getCurrentUserByEmailPending());
      return fetch(`${process.env.REACT_APP_API_URL}/admins?email=${email}`, {
        headers: { token }
      })
        .then((response) => response.json())
        .then((json) => {
          return dispatch(actions.getCurrentUserByEmailSuccess(json.data[0]));
        })
        .catch((error) => {
          return dispatch(actions.getCurrentUserByEmailError(error));
        });
    };
  }
};
