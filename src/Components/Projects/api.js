export const getProjectsApi = async () => {
  try {
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      headers: { token }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getProjectByIdApi = async (idProject) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${idProject}`, {
      headers: { token }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addNewProjectApi = async (body) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
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

export const updateProjectApi = async (body, id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
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

export const deleteProjectApi = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'PATCH',
      headers: {
        token
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addEmployeeToProjectaApi = async (body, id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}/employee`, {
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

export const addTaskToProjectApi = async (body, id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}/task`, {
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

export const deleteTaskToProjectApi = async (idProject, idTask) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/projects/${idProject}/task/${idTask}`,
      {
        method: 'PUT'
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
export const deleteEmployeeToProjectApi = async (idProject, idEmployee) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/projects/${idProject}/employee/${idEmployee}`,
      {
        method: 'PUT'
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const updateEmployeeInProject = async (idProject, body) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/projects/${idProject}/edit/employee`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getProjectApi = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/project?id=${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
