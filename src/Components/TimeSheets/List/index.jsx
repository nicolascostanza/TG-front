import { useEffect, useState } from 'react';
import styles from '../List/list.module.css';
import Btn from './Button';
import Row from './Row';
import AddTimeSheets from '../Add';

function TimeSheet() {
  const [timeSheets, setTimeSheets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/`)
      .then((response) => response.json())
      .then((response) => {
        setTimeSheets(response.data);
      })
      .catch((err) => console.err(err));
  }, []);
  const deleteTimeSheet = async (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      await fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'DELETE'
      }).then(() => {
        alert('Succesfully deleted');
      });
      setTimeSheets(timeSheets.filter((timeSheet) => timeSheet._id !== id));
    }
  };
  return (
    <div className={styles.container}>
      <a className={styles.Btn}>
        <Btn onClick={() => setShowModal(true)} color="green" text="Add" />
      </a>
      <AddTimeSheets showModal={showModal} handleClose={handleClose}></AddTimeSheets>
      <table className={styles.row}>
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
