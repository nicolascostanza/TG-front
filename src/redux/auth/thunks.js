import * as actions from './actions';
import { getCurrentUserByEmail } from 'redux/currentUser/thunks';
import firebase from 'helper/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(actions.loginPending());
    return firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();
        sessionStorage.setItem('authenticated', JSON.stringify({ role, token }));
        dispatch(actions.loginSuccess({ role, token }));
        console.log('respuesta login credentials,', credentials);
        return dispatch(getCurrentUserByEmail(credentials.email, token, role));
      })
      .catch((error) => {
        return dispatch(actions.loginError(error.toString()));
      });
  };
};
