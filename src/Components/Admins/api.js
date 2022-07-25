export const getAdminsApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const addAdminApi = async (admin) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(admin)
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const updateAdminApi = async (body, id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteAdminApi = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'PATCH'
    });
    if (data.error) {
      throw data.error;
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
