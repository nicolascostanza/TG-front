import { useEffect, useState } from 'react';
import style from '../List/list.module.css';

function List() {
  const [TimeSheets, setTimeSheet] = useState([]);
  console.log('timesheets: ', TimeSheets);
  useEffect(() => {
    fetch('http://localhost:8080/time-sheets')
      .then((response) => response.json())
      .then((response) => {
        setTimeSheet(response.data);
      });
  }, []);
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>EmployeeId</th>
            <th>Description</th>
            <th>Project</th>
            <th>Date</th>
            <th>Task</th>
            <th>Hours</th>
            <th>Approved</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {TimeSheets.map((timeSheet) => {
            return (
              <ul key={timeSheet._id}>
                <li>{timeSheet.EmployeeId}</li>
                <li>{timeSheet.Description}</li>
                <li>{timeSheet.Project}</li>
                <li>{timeSheet.Date}</li>
                <li>{timeSheet.Task}</li>
                <li>{timeSheet.Hours}</li>
                <li>{timeSheet.Approved ? true : false}</li>
                <li>{timeSheet.Role}</li>
              </ul>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default List;
