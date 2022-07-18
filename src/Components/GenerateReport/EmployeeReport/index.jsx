import { employeeTimesheets } from '../mock'; // delete after database update
import { filterByDate } from '../auxFunctions';
import styles from '../report.module.css';

const EmployeeReport = () => {
  const employeeTimesheetsMap = employeeTimesheets.sort((prev, curr) => {
    return new Date(prev.date) - new Date(curr.date);
  });

  const totalHours = employeeTimesheets.reduce((prev, curr) => {
    return prev + curr.hours;
  }, 0);

  const totalApprovedhours = employeeTimesheets
    .filter((empTS) => empTS.approved)
    .reduce((prev, curr) => {
      return prev + curr.hours;
    }, 0);

  const percentageApproved = (
    (employeeTimesheets.filter((item) => item.approved).length / employeeTimesheets.length) *
    100
  ).toFixed(2);

  return (
    <div className={styles.reportContainer}>
      <table className={styles.condensedTable}>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Hours</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {filterByDate(employeeTimesheetsMap, { init: '2022-04-13' }).map((empTS) => {
            return (
              <tr key={`${empTS._id}`}>
                <td>{empTS.taskId.taskName}</td>
                <td>{new Date(empTS.date).toISOString().split('T')[0]}</td>
                <td>{empTS.hours}</td>
                <td>{empTS.approved ? 'Yes' : 'No'}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td>{totalHours}</td>
            <td>{percentageApproved}%</td>
          </tr>
        </tfoot>
      </table>
      <div className={styles.keyInfoContainer}>
        <div className={styles.keyInfo}>
          <h3>Total hours</h3>
          <p>{totalHours}</p>
        </div>
        <div className={styles.keyInfo}>
          <h3>Approved hours</h3>
          <p>{totalApprovedhours}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
