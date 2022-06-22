import React from 'react';
import styles from './home.module.css';
import { useEffect } from 'react';
import * as Timesheetsthunks from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'Components/Shared/Table';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  // const param = useParams();
  const dispatch = useDispatch();
  const timeSheets = useSelector((state) => state.timesheet.list);
  useEffect(() => {
    dispatch(Timesheetsthunks.getTimesheets());
  }, []);
  // console.log(timeSheets);
  // const data = timeSheets.map((timesheet) => {
  //   timesheet.employeeId._id === param.id;
  // });
  // console.log(data);
  return (
    <>
      <div className={styles.divEditProfile}>
        <button
          onClick={() => history.push('/employees/profile/629d83d3d9d731ead71b218c')}
          className={styles.buttonProfile}
        >
          EDIT PROFILE
        </button>
      </div>
      <div className={styles.table}>
        <Table
          title="Timesheets"
          headers={[
            '_id',
            'employeeId',
            'description',
            'project',
            'date',
            'task_name',
            'hours',
            'approved',
            'role'
          ]}
          data={timeSheets}
        />
      </div>
    </>
  );
}

export default Home;
