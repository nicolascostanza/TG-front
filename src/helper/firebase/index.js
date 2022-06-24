import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { store } from 'redux/store';
import { setAuthentication } from 'redux/auth/actions';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // apiKey: proccess.env.REACT_APP_API_KEY,
  // authDomain: proccess.env.REACT_APP_AUTH_DOMAIN,
  // projectId: proccess.env.REACT_APP_PROJECT_ID,
  // storageBucket: proccess.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: proccess.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: proccess.env.REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export const tokenListener = () => {
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { role }
      } = await user.getIdTokenResult();
      store.dispatch(setAuthentication({ token, role }));
    }
  });
};

export default firebaseApp;
