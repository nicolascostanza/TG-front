import * as action from './actions';

export const getSuperadmins = (setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    dispatch(action.getSuperadminPending());
    try {
      const response = await fetch(`https://alfonso-trackgenix-server.vercel.app/super-admins`);
      const data = await response.json();
      data.data.map((superadmin) => {
        superadmin.active = superadmin.active ? 'true' : 'false';
      });
      dispatch(action.getSuperadminSuccess(data.data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(action.getSuperadminSuccess(error));
    }
  };
};
export const addSuperadmin = (
  { firstName, lastName, email, password, active },
  handleCloseAdd,
  setShowModalMessage,
  setIsLoading
) => {
  return async (dispatch) => {
    setIsLoading(true);
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
      setIsLoading(false);
      handleCloseAdd();
      setShowModalMessage(true);
    } catch (error) {
      setIsLoading(false);
      dispatch(action.addSuperadminError(error));
      setShowModalMessage(true);
    }
  };
};
export const editSuperadmins = (
  superadmin,
  superadminId,
  handleCloseAdd,
  setShowModalMessage,
  setIsLoading
) => {
  return async (dispatch) => {
    setIsLoading(true);
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
      setIsLoading(false);
      handleCloseAdd();
      setShowModalMessage(true);
    } catch (error) {
      setIsLoading(false);
      dispatch(action.editSuperadminError(error));
      setShowModalMessage(true);
    }
  };
};
export const deleteSuperadmin = (id, handleCloseAlert, setShowModalMessage, setIsLoading) => {
  return async (dispatch) => {
    setIsLoading(true);
    dispatch(action.deleteSuperadminPending());
    try {
      const res = await fetch(`https://alfonso-trackgenix-server.vercel.app/super-admins/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      dispatch(action.deleteSuperadminSuccess(id, data.message));
      setIsLoading(false);
      handleCloseAlert();
      setShowModalMessage(true);
    } catch (error) {
      setIsLoading(false);
      dispatch(action.deleteSuperadminError(error.message));
      setShowModalMessage(true);
    }
  };
};
