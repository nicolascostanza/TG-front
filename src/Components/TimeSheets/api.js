export const getTimesheetApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const deleteTimesheetApi = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'PATCH'
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const addTimesheetApi = async (timeSheet) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(timeSheet)
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const editTimesheetApi = async (newBody, id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newBody)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const getEmployeeTimesheetApi = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/employee?id=${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const getTimesheetFromProjectApi = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/project?id=${id}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
