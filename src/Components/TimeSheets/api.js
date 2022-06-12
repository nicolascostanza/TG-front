export const getTimesheetApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/time-sheets`);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
