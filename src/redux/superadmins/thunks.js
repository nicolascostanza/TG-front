import * as action from './actions';

export const getSuperadmins = () => {
  return async (dispatch) => {
    dispatch(action.getSuperadminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
      const data = await response.json();
      data.data.map((superadmin) => {
        superadmin.active = superadmin.active ? 'true' : 'false';
      });
      dispatch(action.getSuperadminSuccess(data.data));
    } catch (error) {
      dispatch(action.getSuperadminSuccess(error));
    }
  };
};
export const addSuperadmin = (superadminNew) => {
  return async (dispatch) => {
    dispatch(action.addSuperadminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(superadminNew)
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      superadminNew.active = superadminNew.active ? 'true' : 'false';
      dispatch(
        action.addSuperadminSuccess(
          {
            ...superadminNew,
            _id: res.data._id,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt
          },
          res.message
        )
      );
      dispatch(action.closeModals());
      dispatch(action.showModalMessage());
    } catch (error) {
      dispatch(action.addSuperadminError(error));
      dispatch(action.showModalMessage());
    }
  };
};
export const editSuperadmins = (superadminEdited, superadminId) => {
  return async (dispatch) => {
    dispatch(action.editSuperadminPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/super-admins/${superadminId}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(superadminEdited)
        }
      );
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      superadminEdited.active = superadminEdited.active ? 'true' : 'false';
      dispatch(
        action.editSuperadminSuccess(
          {
            ...superadminEdited,
            _id: res.data._id,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt
          },
          superadminId,
          res.message
        )
      );
      dispatch(action.closeModals());
      dispatch(action.showModalMessage());
    } catch (error) {
      dispatch(action.editSuperadminError(error));
      dispatch(action.showModalMessage());
    }
  };
};
export const deleteSuperadmin = (id) => {
  return async (dispatch) => {
    dispatch(action.deleteSuperadminPending());
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      dispatch(action.deleteSuperadminSuccess(id, data.message));
      dispatch(action.closeModals());
      dispatch(action.showModalMessage());
    } catch (error) {
      dispatch(action.deleteSuperadminError(error.message));
      dispatch(action.showModalMessage());
    }
  };
};
