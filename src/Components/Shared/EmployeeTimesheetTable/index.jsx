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
  // register,
  // registerValue
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
  const show = data.slice(10 * (indexPage - 1), 10 * indexPage);

  useEffect(() => {
    const maxIndexPage = data.length > 10 ? Math.floor((data.length - 0.01) / 10) + 1 : 1;
    if (indexPage < 1) {
      setIndexPage(1);
    }
    if (indexPage > maxIndexPage) {
      setIndexPage(maxIndexPage);
    }
  }, [data]);

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

  const filterByDate = (data) => {
    const initDate = new Date(year, month, day);
    const endDate = calculateEndDate(initDate, period);
    return data.filter((item) => {
      return new Date(item.date) > initDate && new Date(item.date) < endDate;
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
    setPeriod('day');
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
    setPeriod('day');
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
    setPeriod('week');
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
    setPeriod('week');
  };

  const previousMonth = () => {
    setDay(1);
    if (month < 1) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setPeriod('month');
  };

  const nextMonth = () => {
    setDay(1);
    if (month > 10) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setPeriod('month');
  };

  const previousYear = () => {
    setDay(1);
    setMonth(0);
    setYear(year - 1);
    setPeriod('year');
  };

  const nextYear = () => {
    setDay(1);
    setMonth(0);
    setYear(year + 1);
    setPeriod('year');
  };

  const openRow = (role, id) => {
    selectedTimesheet(id);
    if (role === 'ADMIN' || role === 'PM' || role === 'EMPLOYEE') {
      switcher();
    }
  };

  const nextPage = () => {
    if (data.length / 10 > indexPage) {
      setIndexPage(indexPage + 1);
    }
  };

  const previousPage = () => {
    if (indexPage > 1) {
      setIndexPage(indexPage - 1);
    }
  };

  const filtershow = filterByDate(show);

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Button width={'100px'} height={'40px'} fontSize={'15px'} onClick={() => onAdd()}>
        <i className="fa-solid fa-plus"></i>
        ADD
      </Button>
      <div className={styles.buttonControllercontainer}>
        <button onClick={() => previousYear()}>{'<Y'}</button>
        <button onClick={() => previousMonth()}>{'<M'}</button>
        <button onClick={() => previousWeek()}>{'<W'}</button>
        <button onClick={() => previousDay()}>{'<D'}</button>
        <p>
          Year: {year} || Month: {month + 1} || Day: {day}
        </p>
        <button onClick={() => nextDay()}>{'D>'}</button>
        <button onClick={() => nextWeek()}>{'W>'}</button>
        <button onClick={() => nextMonth()}>{'M>'}</button>
        <button onClick={() => nextYear()}>{'Y>'}</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
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
                        {/* {console.log('row ', row.status)} */}
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
                  {/* AGREGAR LOGICA AL SLIDER */}
                  {role === 'PM' && (
                    <td>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          id="approved"
                          name="approved"
                          value="approved"
                          checked={row.approveSlider === true ? true : false}
                          // checked={false}
                          // {...(register ? register(registerValue) : registerValue)}
                          onChange={() => onApprove(row, row._id)}
                        />
                        <span className={styles.slider} />
                      </label>
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
              // )}
            );
          })}
        </tbody>
      </table>
      <div className={styles.buttons}>
        <div>
          <p>Page {indexPage}</p>
        </div>
        <div>
          <Button
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
            width={'50px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage >= data.length / 10}
            onClick={() => nextPage()}
          >
            <i className="fa-solid fa-angle-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTimesheetTable;
