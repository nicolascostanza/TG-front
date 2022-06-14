import { getAdminsApi, addAdminApi, deleteAdminApi } from '../../Components/Admins/api';
import * as actions from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(actions.getAdminsPending());
    getAdminsApi()
      .then((response) => {
        dispatch(actions.getAdminsFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.getAdminsFailed(error));
      });
  };
};

export const addAdmin = (admin) => {
  return (dispatch) => {
    dispatch(actions.addAdminPending());
    addAdminApi(admin)
      .then((response) => {
        dispatch(actions.addAdminFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.addAdminFailed(error));
      });
  };
};

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(actions.deleteAdminPending());
    deleteAdminApi(id)
      .then((response) => {
        dispatch(actions.deleteAdminFulfilled(response.data._id));
      })
      .catch((error) => {
        dispatch(actions.deleteAdminFailed(error));
      });
  };
};
