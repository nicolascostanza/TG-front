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
      method: 'DELETE'
    });
    const data = await response.json();
    if (!data.error) {
      alert(data.message);
    }
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
