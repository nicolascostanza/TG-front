import { employeeTimesheets } from '../mock'; // delete after database update
import styles from '../report.module.css';

const EmployeeReport = () => {
  const filterByDate = (data, init, end) => {
    const initDate = new Date(init);
    const endDate = new Date(end);
    const filteredData = data.filter((item) => {
      return new Date(item.date) >= initDate && new Date(item.date) <= endDate;
    });

    return filteredData;
  };
  console.log('filter: ', filterByDate(employeeTimesheets, '2022-04-11', '2022-04-12'));

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
          {employeeTimesheetsMap.map((empTS) => {
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
      <div className={styles.keyInfo}>
        <h3>Total hours</h3>
        <p>{totalHours}</p>
      </div>
      <div className={styles.keyInfo}>
        <h3>Approved hours</h3>
        <p>{totalApprovedhours}</p>
      </div>
    </div>
  );
};

export default EmployeeReport;
