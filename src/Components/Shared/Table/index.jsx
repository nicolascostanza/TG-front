import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';
import Dropdown from '../Dropdown';

function Table({ title, headers, data, onEdit, onAdd, onDelete }) {
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
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Button width={'100px'} height={'40px'} fontSize={'15px'} onClick={() => onAdd()}>
        <i className="fa-solid fa-plus"></i>
        ADD
      </Button>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {show.map((row) => {
            return (
              <tr className={styles.row} key={row._id}>
                {headers.map((header, index) => {
                  if (Array.isArray(row[header])) {
                    if (header === 'tasks' || header === 'task') {
                      return (
                        <td>
                          <Dropdown width={'150px'} placeholder={'Tasks'}>
                            {row[header].map((e) => {
                              return <option key={Math.random()}>{e.taskName}</option>;
                            })}
                            ;
                          </Dropdown>
                        </td>
                      );
                    }
                    if (header === 'team') {
                      return (
                        <td>
                          <Dropdown width={'150px'} placeholder={'Team'}>
                            {row[header].map((element) => {
                              return <option key={Math.random()}>{element.firstName}</option>;
                            })}
                            ;
                          </Dropdown>
                        </td>
                      );
                    }
                    if (header === 'assignedEmployee') {
                      return (
                        <td>
                          <Dropdown width={'150px'} placeholder={'Employees'}>
                            {row[header].map((element) => {
                              return <option key={Math.random()}>{element.lastName}</option>;
                            })}
                            ;
                          </Dropdown>
                        </td>
                      );
                    }
                  } else if (typeof row[header] === 'object' && header === 'parentProject') {
                    return (
                      <td key={Math.random()}>
                        {row[header] !== null ? row[header].name : 'none'}
                      </td>
                    );
                  } else if (typeof row[header] === 'object' && header === 'employeeId') {
                    return (
                      <td key={Math.random()}>
                        {row[header].employeeId !== null
                          ? `${row[header].firstName} ${row[header].lastName}`
                          : 'none'}
                      </td>
                    );
                  } else if (
                    header === 'createdAt' ||
                    header === 'updatedAt' ||
                    header === 'startDate' ||
                    header === 'endDate' ||
                    header === 'date' ||
                    header === 'dob'
                  ) {
                    return (
                      <td>
                        {row[header]?.length >= 10
                          ? new Date(row[header]).toISOString().split('T')[0]
                          : '-'}
                      </td>
                    );
                  } else {
                    return <td key={index}>{row[header]}</td>;
                  }
                })}
                <td>
                  <Button
                    className={styles.buttonsRows}
                    width={'50px'}
                    height={'25px'}
                    fontSize={'13px'}
                    onClick={() => onEdit(row._id)}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </Button>
                </td>
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

export default Table;
