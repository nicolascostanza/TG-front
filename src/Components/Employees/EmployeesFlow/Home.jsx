import React from 'react';
import { useEffect } from 'react';
import * as thunks from '../../../redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Home() {
  const param = useParams();
  console.log(param);
  const dispatch = useDispatch();
  const timeSheets = useSelector((state) => state.timesheet.list);
  useEffect(() => {
    dispatch(thunks.getTimesheets());
  }, []);
  console.log(timeSheets);
  const data = timeSheets.map((timesheet) => {
    timesheet.employeeId._id === param.id;
  });
  console.log(data);
  return (
    <>
      <h1>My timesheets</h1>
    </>
  );
}

export default Home;
