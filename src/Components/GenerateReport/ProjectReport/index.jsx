import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../report.module.css';
import * as projectsThunks from 'redux/projects/thunks';
import * as timesheetsThunks from 'redux/timesheets/thunks';
import * as employeesThunks from 'redux/employees/thunks';
import Loader from 'Components/Shared/Loader';

const ProjectReport = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const projectTimesheets = useSelector((state) => state.timesheet.listFromProject);
  const isProjectsFetching = useSelector((state) => state.projects.isFetching);
  const isTimesheetsFetching = useSelector((state) => state.timesheet.isFetching);
  const projectId = '62c377590aedc7c1fac7e897'; // DELETE THIS
  useEffect(() => {
    dispatch(projectsThunks.getProjects());
    dispatch(timesheetsThunks.getTimesheetsFromProject(projectId, null));
    dispatch(employeesThunks.getEmployees());
  }, []);

  const project = projects?.find((project) => project._id === projectId);
  // console.log('team:', project.team);

  const projectTimesheetsMap = projectTimesheets
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((ts) => {
      const id = ts.employeeId._id;
      const rate = ts.projectId.team.find((item) => item.employeeId === id).rate; // what a mess..
      return {
        ...ts,
        rate
      };
    });

  const totalHours = projectTimesheets.reduce((prev, curr) => {
    return prev + curr.hours;
  }, 0);

  const totalRate = projectTimesheetsMap.reduce((prev, curr) => {
    return prev + curr.rate * curr.hours;
  }, 0);

  if (isProjectsFetching || isTimesheetsFetching) {
    return <Loader />;
  }
  return (
    <div className={styles.reportContainer}>
      <h2>{`${project?.name}`}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours</th>
            <th>Employee</th>
            <th>Rate</th>
            <th>TS Cost</th>
          </tr>
        </thead>
        <tbody>
          {projectTimesheetsMap.map((timesheet) => {
            // const employeeId = timesheet.employeeId._id;
            return (
              <tr key={timesheet._id}>
                <td>{new Date(timesheet.date).toISOString().split('T')[0]}</td>
                <td>{timesheet.hours}</td>
                <td>{timesheet.employeeId.firstName}</td>
                <td>{timesheet.rate}</td>
                <td>{timesheet.hours * timesheet.rate}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total:</td>
            <td>{totalHours}</td>
            <td></td>
            <td></td>
            <td>{totalRate}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProjectReport;
