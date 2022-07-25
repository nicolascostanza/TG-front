import React from 'react';
import { useState, useEffect } from 'react';
import styles from './employeeTimesheetTable.module.css';
import Button from '../Button/index.jsx';
import Slider from '../Slider';

function EmployeeTimesheetTable({
  title,
  headers,
  keys,
  data,
  role,
  onEdit,
  onAdd,
  onDelete,
  switcher,
  selectedTimesheet,
  onApprove,
  onSelect
}) {
  const MILIS_IN_A_DAY = 86400000;
  const currentDay = new Date(Date.now()).getDay();
  const currentMonth = new Date(Date.now()).getMonth();
  const currentYear = new Date(Date.now()).getFullYear();
  const [day, setDay] = useState(currentDay);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [period, setPeriod] = useState('year');
  const [indexPage, setIndexPage] = useState(1);
  const [orderField, setOrderField] = useState('');
  const [ascendOrder, setAscendOrder] = useState(true);

  // const show = data.slice(10 * (indexPage - 1), 10 * indexPage);

  const toggleOrder = (bool) => {
    setAscendOrder(bool);
  };

  const handleOrderField = (name) => {
    setOrderField(name);
  };

  const strComparator = (str1 = 'a', str2 = 'a') => {
    try {
      let auxstr1 = str1;
      let auxstr2 = str2;
      if (!str1 || !str2) {
        auxstr1 = 'a';
        auxstr2 = 'a';
      }
      const len1 = auxstr1.length;
      const len2 = auxstr2.length;
      for (let i = 0; i < Math.max(len1, len2); i++) {
        if (auxstr1[i].toUpperCase() > auxstr2[i].toUpperCase()) {
          return ascendOrder ? 1 : -1;
        }
        if (auxstr1[i].toUpperCase() < auxstr2[i].toUpperCase()) {
          return ascendOrder ? -1 : 1;
        }
      }
      return 0;
    } catch (error) {
      return 0;
    }
  };

  const orderByField = (ts) => {
    if (orderField === 'date') {
      return ascendOrder
        ? ts.sort((prev, curr) => new Date(prev.date) - new Date(curr.date))
        : ts.sort((prev, curr) => new Date(curr.date) - new Date(prev.date));
    }

    if (orderField !== 'hours') {
      return ts.sort((prev, curr) => strComparator(prev[orderField], curr[orderField]));
    }

    return ascendOrder
      ? ts.sort((prev, curr) => prev[orderField] - curr[orderField])
      : ts.sort((prev, curr) => curr[orderField] - prev[orderField]);
  };

  const calculateInitDate = (period) => {
    switch (period) {
      case 'year':
        return new Date(year, 0);
      case 'month':
        return new Date(year, month);
      default:
        return new Date(year, month, day);
    }
  };

  const calculateEndDate = (initDate, period) => {
    const initYear = initDate.getFullYear();
    const initMonth = initDate.getMonth();
    const initDateMilis = Number(initDate);
    switch (period) {
      case 'year':
        return new Date(initYear + 1, 0);
      case 'month':
        return new Date(initYear, initMonth + 1);
      case 'week':
        return new Date(MILIS_IN_A_DAY * 7 + initDateMilis);
      case 'day':
        return new Date(MILIS_IN_A_DAY + initDateMilis);
      default:
        return new Date('2100-01-01');
    }
  };

  const setPeriodYear = () => {
    setPeriod('year');
  };

  const setPeriodMonth = () => {
    setPeriod('month');
  };

  const setPeriodWeek = () => {
    setPeriod('week');
  };

  const setPeriodDay = () => {
    setPeriod('day');
  };

  const filterByDate = (data) => {
    const initDate = calculateInitDate(period);
    const endDate = calculateEndDate(initDate, period);
    return data.filter((item) => {
      return new Date(item.date) >= initDate && new Date(item.date) < endDate;
    });
  };

  const previousDay = () => {
    const auxDate = new Date(year, month, day);
    const auxDateMilis = Number(auxDate) - MILIS_IN_A_DAY;
    const newDate = new Date(auxDateMilis);
    const newDateDay = newDate.getDate();
    const newDateMonth = newDate.getMonth();
    const newDateYear = newDate.getFullYear();
    setDay(newDateDay);
    setMonth(newDateMonth);
    setYear(newDateYear);
  };

  const nextDay = () => {
    const auxDate = new Date(year, month, day);
    const auxDateMilis = Number(auxDate) + MILIS_IN_A_DAY;
    const newDate = new Date(auxDateMilis);
    const newDateDay = newDate.getDate();
    const newDateMonth = newDate.getMonth();
    const newDateYear = newDate.getFullYear();
    setDay(newDateDay);
    setMonth(newDateMonth);
    setYear(newDateYear);
  };

  const previousWeek = () => {
    const auxDate = new Date(year, month, day);
    const auxDateMilis = Number(auxDate) - 7 * MILIS_IN_A_DAY;
    const newDate = new Date(auxDateMilis);
    const newDateDay = newDate.getDate();
    const newDateMonth = newDate.getMonth();
    const newDateYear = newDate.getFullYear();
    setDay(newDateDay);
    setMonth(newDateMonth);
    setYear(newDateYear);
  };

  const nextWeek = () => {
    const auxDate = new Date(year, month, day);
    const auxDateMilis = Number(auxDate) + 7 * MILIS_IN_A_DAY;
    const newDate = new Date(auxDateMilis);
    const newDateDay = newDate.getDate();
    const newDateMonth = newDate.getMonth();
    const newDateYear = newDate.getFullYear();
    setDay(newDateDay);
    setMonth(newDateMonth);
    setYear(newDateYear);
  };

  const previousMonth = () => {
    setDay(1);
    if (month < 1) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    setDay(1);
    if (month > 10) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const previousYear = () => {
    setDay(1);
    setYear(year - 1);
  };

  const nextYear = () => {
    setDay(1);
    setMonth(0);
    setYear(year + 1);
  };

  const openRow = (role, id) => {
    selectedTimesheet(id);
    if (role === 'ADMIN' || role === 'PM' || role === 'EMPLOYEE') {
      switcher();
    }
  };

  const show = filterByDate(data);
  const filtershow = orderByField(show).slice(10 * (indexPage - 1), 10 * indexPage);

  const nextPage = () => {
    if (show.length / 10 > indexPage) {
      setIndexPage(indexPage + 1);
    }
  };

  const previousPage = () => {
    if (indexPage > 1) {
      setIndexPage(indexPage - 1);
    }
  };
  // const show = data.slice(10 * (indexPage - 1), 10 * indexPage);

  const totalHours = show.reduce((prev, curr) => prev + curr?.hours, 0);
  const totalRate = show.reduce((prev, curr) => prev + curr?.hours * curr?.rate, 0);

  const arrowDown = <i onClick={() => toggleOrder(true)} className={`fa-solid fa-arrow-up`}></i>;
  const arrowUp = <i onClick={() => toggleOrder(false)} className={`fa-solid fa-arrow-down`}></i>;

  const showArrow = (bool) => {
    if (bool) {
      return ascendOrder ? arrowUp : arrowDown;
    }
    return null;
  };

  useEffect(() => {
    const maxIndexPage = show.length > 10 ? Math.floor((show.length - 0.01) / 10) + 1 : 1;
    if (indexPage < 1) {
      setIndexPage(1);
    }
    if (indexPage > maxIndexPage) {
      setIndexPage(maxIndexPage);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Button width={'100px'} height={'40px'} fontSize={'15px'} onClick={() => onAdd()}>
        <i className="fa-solid fa-plus"></i>
        ADD
      </Button>
      {data.length > 0 ? (
        <div className={styles.filterContainer}>
          <div className={styles.buttonControllercontainer}>
            <button onClick={() => setPeriodYear()}>Filter by year</button>
            <button onClick={() => setPeriodMonth()}>Filter by month</button>
            <button onClick={() => setPeriodWeek()}>Filter by week</button>
            <button onClick={() => setPeriodDay()}>Filter by day</button>
          </div>
          <div className={styles.buttonControllercontainer}>
            {/* SORRY IN ADVANCE... */}
            <button onClick={() => previousYear()}>{'<YEAR'}</button>
            {period !== 'year' ? <button onClick={() => previousMonth()}>{'<MONTH'}</button> : null}
            {period !== 'year' && period !== 'month' ? (
              <button onClick={() => previousWeek()}>{'<WEEK'}</button>
            ) : null}
            {period === 'day' ? <button onClick={() => previousDay()}>{'<DAY'}</button> : null}
            <p>
              Year: {year}
              {period !== 'year' ? `  ||  Month: ${month + 1}` : null}
              {period !== 'year' && period !== 'month' ? `  ||  Day: ${day}` : null}
            </p>
            {period === 'day' ? <button onClick={() => nextDay()}>{'DAY>'}</button> : null}
            {period !== 'year' && period !== 'month' ? (
              <button onClick={() => nextWeek()}>{'WEEK>'}</button>
            ) : null}
            {period !== 'year' ? <button onClick={() => nextMonth()}>{'MONTH>'}</button> : null}
            <button onClick={() => nextYear()}>{'YEAR>'}</button>
            {/* I AM SURE THERE IS A CLEANER WAY TO DO THIS BUT I AM LAZY, SORRY NOT SORRY */}
            {/* BTW, STYLES SHOULD BE MODIFIED, SO WHY SHOULD I BOTHER? */}
          </div>
        </div>
      ) : null}
      {data.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              {role !== 'EMPLOYEE' ? <th /> : null}
              {headers.map((header, index) => {
                return header === 'Edit' || header === 'Delete' ? (
                  <th key={index}>{header}</th>
                ) : (
                  <th key={index} onClick={() => handleOrderField(keys[index])}>
                    {header}
                    {showArrow(orderField === keys[index])}
                  </th>
                );
              })}
              {role === `PM` && (
                <>
                  <th>Approve</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {filtershow.map((row) => {
              return (
                <tr className={styles.row} key={row._id}>
                  {role === 'PM' && (
                    <td>
                      <input type="checkbox" onChange={() => onSelect(row._id)} />
                    </td>
                  )}
                  {keys.map((key, index) => {
                    if (key === 'active') {
                      return (
                        <td>
                          <button>{row[key]}boolean</button>
                        </td>
                      );
                    }
                    return (
                      <td key={index} onClick={() => openRow(role, row._id)}>
                        {row[key]}
                      </td>
                    );
                  })}
                  <>
                    <td>
                      {row.status !== 'Approved' && (
                        <Button
                          className={styles.buttonsRows}
                          width={'50px'}
                          height={'25px'}
                          fontSize={'13px'}
                          disabled={row.status === 'Approved' && true}
                          onClick={() => onEdit(row._id)}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </Button>
                      )}
                    </td>
                    <td>
                      {row.status !== 'Approved' && (
                        <Button
                          onClick={() => onDelete(row._id)}
                          width={'50px'}
                          height={'25px'}
                          fontSize={'13px'}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </Button>
                      )}
                    </td>
                    {role === 'PM' && (
                      <td>
                        <Slider
                          idNameAndValue={'approved'}
                          isChecked={row.approveSlider}
                          onChangeFunction={onApprove}
                          arg1={row}
                          arg2={row._id}
                        />
                      </td>
                    )}
                  </>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h3>No timesheets yet</h3>
      )}
      <div className={styles.buttons}>
        <div>
          <p>Page {indexPage}</p>
        </div>
        <div>
          <Button
            id="prevPageButton"
            width={'50px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage <= 1}
            onClick={() => previousPage()}
          >
            <i className="fa-solid fa-angle-left"></i>
          </Button>
        </div>
        <div>
          <Button
            id="nextPageButton"
            width={'50px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage >= data.length / 10}
            onClick={() => nextPage()}
          >
            <i className="fa-solid fa-angle-right"></i>
          </Button>
        </div>
        <div>
          <h3>{`Total hours: ${totalHours}`}</h3>
          <h3>{`Total rate: ${totalRate}`}</h3>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTimesheetTable;
