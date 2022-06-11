export const getProjectsApi = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
