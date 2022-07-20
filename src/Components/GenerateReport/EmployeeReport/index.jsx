/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as timesheetThunks from 'redux/timesheets/thunks';
import { filterByDate } from '../auxFunctions';
import MultiAxisChart from '../Charts/MultiAxis';
import styles from '../report.module.css';

const EmployeeReport = () => {
  const initDateFilters = { init: '', end: '' };
  const [orderField, setOrderField] = useState('date');
  const [ascendOrder, setAscendOrder] = useState(true);
  const [dateFilters, setDateFilters] = useState(initDateFilters);
  const [employee, setEmployee] = useState({});
  const laritaID = '62b89fb0dd9fb8d43161894c';
  const dispatch = useDispatch();
  const employeeFetch = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${laritaID}`);
    const data = await response.json();
    setEmployee(data.data);
  };

  useEffect(() => {
    dispatch(timesheetThunks.getEmployeeTimesheets(laritaID));
    employeeFetch();
  }, []);
  const employeeTimesheets = useSelector((state) => state.timesheet.listFromEmployee);
  const employeeTimesheetsMap = employeeTimesheets.sort((prev, curr) => {
    return new Date(prev.date) - new Date(curr.date);
  });

  const handleDateChanges = (e) => {
    const { name, value } = e.target;
    setDateFilters({
      ...dateFilters,
      [name]: value
    });
  };

  const toggleOrder = (bool) => {
    setAscendOrder(bool);
  };

  const handleOrderField = (name) => {
    setOrderField(name);
  };

  const strComparator = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
    for (let i = 0; i < Math.max(len1, len2); i++) {
      if (str1[i] > str2[i]) {
        return ascendOrder ? 1 : -1;
      }
      if (str1[i] < str2[i]) {
        return ascendOrder ? -1 : 1;
      }
    }
    return 0;
  };

  const orderByField = (ts) => {
    if (orderField === 'date') {
      return ascendOrder
        ? ts.sort((prev, curr) => new Date(prev.date) - new Date(curr.date))
        : ts.sort((prev, curr) => new Date(curr.date) - new Date(prev.date));
    }
    if (orderField !== 'taskName') {
      return ascendOrder
        ? ts.sort((prev, curr) => prev[orderField] - curr[orderField])
        : ts.sort((prev, curr) => curr[orderField] - prev[orderField]);
    }
    return ts.sort((prev, curr) => strComparator(prev.taskId.taskName, curr.taskId.taskName));
  };

  const filteredEmployeeTimesheets = orderByField(
    filterByDate(employeeTimesheetsMap, dateFilters),
    ascendOrder
  );

  const totalHours = filteredEmployeeTimesheets.reduce((prev, curr) => {
    return prev + curr.hours;
  }, 0);

  const totalApprovedhours = filteredEmployeeTimesheets
    .filter((empTS) => empTS.approved)
    .reduce((prev, curr) => {
      return prev + curr.hours;
    }, 0);

  const percentageApproved = (timesheets) => {
    if (timesheets.length > 0) {
      return (
        (filteredEmployeeTimesheets.filter((item) => item.approved).length /
          filteredEmployeeTimesheets.length) *
        100
      )
        .toFixed(2)
        .concat('%');
    }
    return '-';
  };

  const arrowDown = <i onClick={() => toggleOrder(true)} className={`fa-solid fa-arrow-up`}></i>;
  const arrowUp = <i onClick={() => toggleOrder(false)} className={`fa-solid fa-arrow-down`}></i>;

  const showArrow = (bool) => {
    if (bool) {
      return ascendOrder ? arrowUp : arrowDown;
    }
    return null;
  };

  return (
    <div className={styles.reportContainer}>
      <h2>{employee?.firstName}</h2>
      <button>Previous month</button>
      <button>Next month</button>
      {/* <form>
        <label htmlFor="init">
          Since
          <input type="date" name="init" id="initDate" onChange={handleDateChanges} />
        </label>
        <label htmlFor="end">
          To
          <input type="date" name="end" id="endDate" onChange={handleDateChanges} />
        </label>
      </form> */}
      <table className={styles.condensedTable}>
        <thead>
          <tr>
            <th onClick={() => handleOrderField('date')}>
              Date
              {showArrow(orderField === 'date')}
            </th>
            <th onClick={() => handleOrderField('taskName')}>
              Task{showArrow(orderField === 'taskName')}
            </th>
            <th onClick={() => handleOrderField('hours')}>
              Hours{showArrow(orderField === 'hours')}
            </th>
            <th onClick={() => handleOrderField('approved')}>
              Approved{showArrow(orderField === 'approved')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployeeTimesheets.map((empTS) => {
            return (
              <tr key={`${empTS._id}`}>
                <td>{new Date(empTS.date).toISOString().split('T')[0]}</td>
                <td>{empTS.taskId.taskName}</td>
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
            <td>{percentageApproved(filteredEmployeeTimesheets)}</td>
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
