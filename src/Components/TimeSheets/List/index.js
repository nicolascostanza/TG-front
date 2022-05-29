import { useEffect, useState } from 'react';
import styles from '../List/list.module.css';

function TimeSheets() {
  const [timesheets, saveTimeSheets] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        saveTimeSheets(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            {/* <th>EmployeeId</th> */}
            <th>Description</th>
            <th>Project</th>
            <th>Date</th>
            {/* <th>Task</th> */}
            <th>Hours</th>
            <th>Approved</th>
            <th>Role</th>
          </tr>
        </thead>
        <div>
          {timesheets.map((timesheet) => {
            return (
              <a key={timesheet._id}>
                {timesheet._id}
                {/* {timesheet.employeeId} */}
                {timesheet.description}
                {timesheet.project}
                {timesheet.date}
                {/* {timesheet.task} */}
                {timesheet.hours}
                {timesheet.approved}
                {timesheet.role}
              </a>
            );
          })}
        </div>
      </table>
    </section>
  );
}

export default TimeSheets;
