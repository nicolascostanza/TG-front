import * as action from './actions';

export const getSuperadmins = () => {
  return async (dispatch) => {
    dispatch(action.getSuperadminPending());
    try {
      const response = await fetch(`https://alfonso-trackgenix-server.vercel.app/super-admins`);
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
export const addSuperadmin = ({ firstName, lastName, email, password, active }) => {
  return async (dispatch) => {
    dispatch(action.addSuperadminPending());
    try {
      const response = await fetch(`https://alfonso-trackgenix-server.vercel.app/super-admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password, active })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      active = active ? 'true' : 'false';
      dispatch(
        action.addSuperadminSuccess(
          {
            _id: res.data._id,
            firstName,
            lastName,
            email,
            password,
            active,
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
export const editSuperadmins = (superadmin, superadminId) => {
  return async (dispatch) => {
    dispatch(action.editSuperadminPending());
    try {
      const response = await fetch(
        `https://alfonso-trackgenix-server.vercel.app/super-admins/${superadminId}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(superadmin)
        }
      );
      const res = await response.json();
      const { firstName, lastName, email, password, active } = superadmin;
      if (res.error) {
        throw res.message;
      }
      superadmin.active = superadmin.active ? 'true' : 'false';
      dispatch(
        action.editSuperadminSuccess(
          {
            _id: res.data._id,
            firstName,
            lastName,
            email,
            password,
            active: active ? 'true' : 'false',
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
      const res = await fetch(`https://alfonso-trackgenix-server.vercel.app/super-admins/${id}`, {
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
