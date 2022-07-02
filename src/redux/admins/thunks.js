import {
  getAdminsApi,
  addAdminApi,
  updateAdminApi,
  deleteAdminApi
} from '../../Components/Admins/api';
import * as actions from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(actions.getAdminsPending());
    const token = sessionStorage.getItem('token'); // review later
    getAdminsApi(token)
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

export const updateAdmin = (body, id) => {
  return (dispatch) => {
    dispatch(actions.updateAdminPending());
    updateAdminApi(body, id)
      .then((response) => {
        dispatch(actions.updateAdminFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.updateAdminFailed(error));
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
