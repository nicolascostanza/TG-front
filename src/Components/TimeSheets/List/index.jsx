import { useEffect, useState } from 'react';
import styles from '../List/list.module.css';
import Btn from './Button';
import Row from './Row';

function TimeSheet() {
  const [timeSheets, setTimeSheet] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        setTimeSheet(response.data);
      });
  }, []);
  const deleteTimeSheet = async (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      await fetch(`http://localhost:8080/time-sheets/${id}`, {
        method: 'DELETE'
      });
      setTimeSheet(timeSheets.filter((timeSheet) => timeSheet._id !== id));
    }
  };
  return (
    <div className={styles.container}>
      <a href="http://localhost:8080/time-sheets-add">
        <Btn color="green" text="Add" />
      </a>
      <table>
        <thead>
          <tr>
            <th>Id</th>
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
          {timeSheets.map((timeSheet) => (
            <Row key={timeSheet._id} timeSheet={timeSheet} deleteTimeSheet={deleteTimeSheet} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TimeSheet;
