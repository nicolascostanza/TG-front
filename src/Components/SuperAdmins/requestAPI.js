export const getAllSuperadmins = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addSuperadmin = async (newSuperadmin) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSuperadmin)
    });
    const data = await response.json();
    alert(data.message);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateSuperadmin = async (superadmin, id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(superadmin)
    });
    const data = await response.json();
    alert(data.message);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteSuperadmin = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
      method: 'delete'
    });
    const data = await response.json();
    alert(data.message);
    return data;
  } catch (error) {
    return error;
  }
};
