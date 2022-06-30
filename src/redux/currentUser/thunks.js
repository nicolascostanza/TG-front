import * as actions from './actions';

export const getCurrentUserByEmail = (email) => {
  return (dispatch) => {
    dispatch(actions.getCurrentUserByEmailPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees?email=${email}`)
      .then((response) => response.json())
      .then((json) => {
        return dispatch(actions.getCurrentUserByEmailSuccess(json.data[0]));
      })
      .catch((error) => {
        return dispatch(actions.getCurrentUserByEmailError(error));
      });
  };
};
