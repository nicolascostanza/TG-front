export const getAdminsApi = async () => {
  try {
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, { headers: { token } });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const addAdminApi = async (admin) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        token
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
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
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
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'PATCH',
      headers: { token }
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
