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
    const data = await response.json();
    return data;
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
    // console.log('data: ', data);
    return data;
  } catch (error) {
    return error;
  }
  // setTask(tasks.filter((task) => task._id !== id));
};
