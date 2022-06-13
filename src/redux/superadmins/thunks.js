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
// add
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
      dispatch(action.addSuperadminSuccess({ firstName, lastName, email, password, active }));
    } catch (error) {
      dispatch(action.addSuperadminError(error));
    }
  };
};
// edit
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
      if (res.error) {
        throw res.message;
      }
      superadmin.active = superadmin.active ? 'true' : 'false';
      dispatch(action.editSuperadminSuccess(superadmin, superadminId));
    } catch (error) {
      dispatch(action.editSuperadminError(error));
    }
  };
};

// delete
export const deleteSuperadmin = (id) => {
  return async (dispatch) => {
    dispatch(action.deleteSuperadminPending());
    try {
      await fetch(`https://alfonso-trackgenix-server.vercel.app/super-admins/${id}`, {
        method: 'DELETE'
      });
      dispatch(action.deleteSuperadminSuccess(id));
    } catch (error) {
      dispatch(action.deleteSuperadminError(error));
    }
  };
};
