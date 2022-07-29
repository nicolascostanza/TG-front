/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import Button from 'Components/Shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import * as projectsThunks from 'redux/projects/thunks';
import * as timesheetsThunks from 'redux/timesheets/thunks';
import * as employeesThunks from 'redux/employees/thunks';
import Loader from 'Components/Shared/Loader';
import PieChart from '../Charts/Pie';
import BarChart from '../Charts/Bars';
import LineChart from '../Charts/Line';
import styles from '../report.module.css';
import { projectDataFormatter } from '../auxFunctions';
import { useHistory, useParams } from 'react-router-dom';
// for pdf generator import
import jsPDF from 'jspdf';

const ProjectReport = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.projects.list);
  const projectTimesheets = useSelector((state) => state.timesheet.listFromProject);
  const isProjectsFetching = useSelector((state) => state.projects.isFetching);
  const isTimesheetsFetching = useSelector((state) => state.timesheet.isFetching);
  const projectId = useParams().id;
  useEffect(() => {
    dispatch(projectsThunks.getProjects());
    dispatch(timesheetsThunks.getTimesheetsFromProject(projectId));
    dispatch(employeesThunks.getEmployees());
  }, []);

  const project = projects?.find((project) => project._id === projectId);

  // Basic table formatter
  const projectTimesheetsMap = projectTimesheets
    .sort((a, b) => new Date(a?.date) - new Date(b?.date))
    .map((ts) => {
      const id = ts.employeeId._id;
      const rate = ts.projectId.team.find((item) => item?.employeeId === id).rate;
      // what a mess.. but it works yay! :D
      return {
        ...ts,
        date: new Date(ts?.date).toISOString().split('T')[0],
        rate
      };
    });
  // for pdf generator
  let selectedTag = document.getElementById('selectedTag');
  const pdfGenerator = () => {
    let doc = new jsPDF('p', 'pt', 'letter');
    let margin = 2;
    let scale = (doc.internal.pageSize.width - margin * 2) / selectedTag.scrollWidth;
    doc.html(selectedTag, {
      x: margin,
      y: margin,
      html2canvas: { scale: scale },
      callback: function (doc) {
        doc.output('dataurlnewwindow'), { filename: 'fichero-pdf.pdf' };
      }
    });
  };

  // Project contributions by employees (hours and rate)
  const projectContr = projectTimesheetsMap
    .map((item) => {
      const { date, employeeId, hours, rate } = item;
      const { _id, firstName, lastName } = employeeId;
      return {
        date,
        hours,
        rate,
        _id,
        firstName,
        lastName
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Segmented by employee (_id, firstName, lastName, rate, hours, totalRate)
  const segmentedByEmployee = project?.team.map((member) => {
    const hours = projectTimesheets
      .filter((ts) => {
        return ts.employeeId._id === member.employeeId._id;
      })
      .reduce((prev, curr) => {
        return prev + curr.hours;
      }, 0);
    return {
      ...member.employeeId,
      rate: member.rate,
      hours,
      totalRate: hours * member.rate
    };
  });

  const totalHours = projectTimesheets.reduce((prev, curr) => {
    return prev + curr.hours;
  }, 0);

  const totalRate = projectTimesheetsMap.reduce((prev, curr) => {
    return prev + curr.rate * curr.hours;
  }, 0);

  if (isProjectsFetching || isTimesheetsFetching) {
    return <Loader isLoading={true} />;
  }
  return (
    <div className={styles.reportContainer}>
      <h2>{`${project?.name}`}</h2>
      <Button id="buttonBack" onClick={() => history.goBack()}>
        <i className="fa-solid fa-arrow-left fa-2x"></i>
      </Button>
      <p>
        From{' '}
        {`${projectTimesheetsMap[0]?.date} to ${
          projectTimesheetsMap[projectTimesheetsMap.length - 1]?.date
        }`}
      </p>
      <button id="btnpdf" onClick={pdfGenerator}>
        Generate PDF
      </button>
      <div id="selectedTag">
        <div className={styles.tablesContainer}>
          <table className={styles.extendedTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours</th>
                <th>Task</th>
                <th>Employee</th>
                <th>Rate</th>
                <th>TS Cost</th>
              </tr>
            </thead>
            <tbody>
              {projectTimesheetsMap.map((timesheet) => {
                return (
                  <tr key={timesheet._id}>
                    <td>{timesheet?.date}</td>
                    <td>{timesheet.hours}</td>
                    <td>{timesheet.taskId?.taskName}</td>
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
          <div className={styles.graphContainer}>
            <PieChart
              title="Hours"
              data={segmentedByEmployee ?? []}
              label="firstName"
              value="hours"
            />
          </div>
          <div className={styles.graphContainer}>
            <PieChart
              title="Total Rate"
              data={segmentedByEmployee ?? []}
              label="firstName"
              value="totalRate"
            />
          </div>
          {/* <table className={styles.condensedTable}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Total Hours</th>
                <th>Hourly Rate</th>
                <th>Total Rate</th>
              </tr>
            </thead>
            <tbody>
              {segmentedByEmployee?.map((employee) => {
                return (
                  <tr key={`${employee._id}segemp`}>
                    <td>{employee.firstName}</td>
                    <td>{employee.hours}</td>
                    <td>{employee.rate}</td>
                    <td>{employee.rate * employee.hours}</td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
          <div className={styles.barsContainer}>
            <BarChart
              title="Historic rate"
              data={projectDataFormatter(projectContr, project, {
                fillZero: true,
                accumulate: false,
                rated: false
              })}
              label="date"
              colorScheme="niceScheme"
            />
          </div>
          <div className={styles.barsContainer}>
            <LineChart
              title="Historic rate"
              data={projectDataFormatter(projectContr, project, {
                fillZero: true,
                accumulate: true,
                rated: false
              })}
              label="date"
              colorScheme="niceScheme"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectReport;
