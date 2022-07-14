import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../report.module.css';
import * as projectsThunks from 'redux/projects/thunks';
import * as employeesThunks from 'redux/employees/thunks';
import Loader from 'Components/Shared/Loader';

const ProjectReport = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const isProjectsFetching = useSelector((state) => state.projects.isFetching);
  // const employees = useSelector((state) => state.employees.list);
  useEffect(() => {
    dispatch(projectsThunks.getProjects());
    dispatch(employeesThunks.getEmployees());
  }, []);
  const projectId = '628d6ef63d96b4f9924cb08e';
  const project = projects.find((project) => project._id === projectId);
  const tasks = project.tasks;
  console.log('project', project);
  console.log('tasks', tasks);

  if (isProjectsFetching) {
    return <Loader />;
  }
  return (
    <div className={styles.reportContainer}>
      <h2>{`${project?.name}`}</h2>
      <table>
        <thead></thead>
      </table>
    </div>
  );
};

export default ProjectReport;
