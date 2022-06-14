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

export const editTaskApi = async (taskNewInfo, editedTaskId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${editedTaskId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(taskNewInfo)
    });
    console.log('response', response);
    // console.log('que es esto', editedTaskId);
    // console.log('que es esto otro', taskNewInfo);
    const data = await response.json();
    // if (response.status === 200) {
    //   alert('Task updated successfully');
    //   // handleClose();
    // } else if (response.status === 400) {
    //   alert('Something went wrong');
    // }
    // console.log('dataa ', data);
    return data.data;
  } catch (error) {
    return error;
  }
};
