import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';

function Tableproject({ title, headers, keys, data, role, onAdd, onDelete, switcher }) {
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
  console.log(keys);
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
  const assignPm = () => {
    console.log('asigno el pm');
  };
  const openTimesheet = () => {
    console.log('abro la timesheet');
  };
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Button onClick={() => switcher()}>BACK</Button>
      {role === `ADMIN` ? (
        <Button width={'80px'} height={'40px'} onClick={() => assignPm()}>
          Asignar PM
        </Button>
      ) : null}
      {role === `ADMIN` || role === `PM` ? (
        <Button width={'80px'} height={'40px'} fontSize={'15px'} onClick={() => onAdd()}>
          <i className="fa-solid fa-plus"></i>
          ADD
        </Button>
      ) : null}
      <button>Employees</button>
      <button>Tasks</button>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            {role === `ADMIN` || role === `PM` ? (
              <>
                <th>Rate</th>
                <th>Result</th>
                <th>Timesheet</th>
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
                  if (keys === 'rate') {
                    if (role === `ADMIN` || role === `PM`) {
                      return <td key={index}>{row[key]}</td>;
                    }
                  } else if (keys === 'roll') {
                    if (role === `ADMIN` || role === `PM`) {
                      // hago dropdown con las opciones para cambiarlo
                      return <td key={index}>{row[key]}</td>;
                    } else {
                      return <td key={index}>{row[key]}</td>;
                    }
                  } else {
                    return <td key={index}>{row[key]}</td>;
                  }
                })}
                {role === `ADMIN` || role === `PM` ? (
                  <>
                    {/* cambio icono de tick o x segun estado de aprovaciond e timesheet */}
                    <td>rejected/aprovve</td>
                    <td onClick={() => openTimesheet()}>Timesheet Icon</td>
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
