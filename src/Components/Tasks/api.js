export const getTasksApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const addTaskApi = async (task) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    if (response.status == 201) {
      const data = await response.json();
      return data;
    }
    alert('There has been an error creating the task');
  } catch (error) {
    return error;
  }
};

export const deleteTaskApi = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const editTaskApi = async (taskNewInfo, editedTaskId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${editedTaskId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(taskNewInfo)
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    return error;
  }
};
