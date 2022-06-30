import React from 'react';
import styles from './home.module.css';
import { useEffect } from 'react';
import * as Timesheetsthunks from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'Components/Shared/Table';
import { useHistory } from 'react-router-dom';
import Sidebar from 'Components/Shared/Sidebar';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const timeSheets = useSelector((state) => state.timesheet.list);
  useEffect(() => {
    dispatch(Timesheetsthunks.getTimesheets());
  }, []);
  return (
    <>
      <Sidebar />
      <div className={styles.divEditProfile}>
        <button
          onClick={() => history.push(`/employees/profile/${currentUser._id}`)}
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
