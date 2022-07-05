import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';

// BORRAR EL OPENTIMESHEET NO SIRVE MAS
function Tableproject({ title, keys, dataTeam, dataTasks, roleUser, onAdd, onDelete, switcher }) {
  const [filterProject, setFilterProject] = useState(true);
  const [indexPage, setIndexPage] = useState(1);
  let data;
  let headers;
  if (filterProject) {
    headers = ['ID', 'Name', 'Last Name', 'Role', 'Rate'];
    data = dataTeam;
  } else {
    headers = ['ID', 'Task Name', 'Description'];
    data = dataTasks;
  }
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
  const changeFilter = () => {
    setFilterProject(!filterProject);
  };
  const assignPm = () => {
    console.log('asigno el pm');
  };
  const addTask = () => {
    console.log('aca agrego la tasks si es employee o admin');
  };
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {roleUser === `ADMIN` ? (
        <Button width={'80px'} height={'40px'} onClick={() => assignPm()}>
          Asignar PM
        </Button>
      ) : null}
      {roleUser === `ADMIN` || roleUser === `PM` ? (
        <>
          <Button width={'80px'} height={'40px'} fontSize={'15px'} onClick={() => onAdd()}>
            <i className="fa-solid fa-plus"></i>
            ADD
          </Button>
          <button onClick={() => addTask()}>Add Tasks</button>
        </>
      ) : null}
      <Button onClick={() => switcher()}>BACK</Button>
      <button onClick={() => changeFilter()}>Employees</button>
      <button onClick={() => changeFilter()}>Tasks</button>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              if (header === 'Rate') {
                if (roleUser === 'ADMIN' || roleUser === 'PM') {
                  return <th key={index}>{header}</th>;
                }
              } else {
                return <th key={index}>{header}</th>;
              }
            })}
            {roleUser === `ADMIN` || roleUser === `PM` ? (
              <>
                <th>Delete</th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {show.map((row) => {
            return (
              <tr className={styles.row} key={row._id}>
                {keys.map((key, index) => {
                  if (key === 'employeeId') {
                    return (
                      <>
                        <td key={index}>{row.employeeId?._id ? row.employeeId?._id : '-'}</td>
                        <td key={index}>
                          {row.employeeId?.firstName ? row.employeeId?.firstName : '-'}
                        </td>
                        <td key={index}>
                          {row.employeeId?.lastName ? row.employeeId?.lastName : '-'}
                        </td>
                      </>
                    );
                  } else if (key === 'rate') {
                    if (roleUser === `ADMIN` || roleUser === `PM`) {
                      return <td key={index}>{row[key]}</td>;
                    } else {
                      return null;
                    }
                  } else {
                    return <td key={index}>{row[key]}</td>;
                  }
                })}
                {roleUser === `ADMIN` || roleUser === `PM` ? (
                  <>
                    {/* cambio icono de tick o x segun estado de aprovaciond e timesheet */}
                    <td>
                      <Button
                        onClick={() => onDelete(row._id)}
                        width={'50px'}
                        height={'25px'}
                        fontSize={'13px'}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </Button>
                    </td>
                  </>
                ) : null}
              </tr>
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

export default Tableproject;
