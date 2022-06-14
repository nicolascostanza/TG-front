export const getProjectsApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addNewProjectApi = async (body) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    alert(data.message);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateProjectApi = async (body, id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    alert(data.message);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteProjectApi = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'delete'
    });
    const data = await response.json();
    alert(data.message);
    return data;
  } catch (error) {
    return error;
  }
};

export const getEmployeesApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getTasksApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
