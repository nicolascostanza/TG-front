import React from 'react';
import { useState } from 'react';
import styles from './table.module.css';
import Button from '../Button/Button.jsx';
import Dropdown from '../Dropdown/Dropdown';

function Table({ title, headers, data, onEdit, onAdd, onDelete }) {
  const [indexPage, setIndexPage] = useState(1);
  const show = data.slice(10 * (indexPage - 1), 10 * indexPage);
  const nextPage = () => {
    if (data.length / 10 >= indexPage) {
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
        <tbody>
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
                              return <option key={Math.random()}>{element.surname}</option>;
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
                          ? `${row[header].firstName} ${row[header].surname}`
                          : 'none'}
                      </td>
                    );
                  } else if (
                    header === 'createdAt' ||
                    header === 'updatedAt' ||
                    header === 'startDate' ||
                    header === 'endDate' ||
                    header === 'date'
                  ) {
                    return <td>{new Date(row[header]).toLocaleDateString()}</td>;
                  } else {
                    return <td key={index}>{row[header]}</td>;
                  }
                })}
                <td>
                  <Button
                    width={'50px'}
                    height={'25px'}
                    fontSize={'15px'}
                    onClick={() => onEdit(row._id)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => onDelete(row._id)}
                    width={'50px'}
                    height={'25px'}
                    fontSize={'15px'}
                  >
                    Delete
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
            width={'100px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage <= 1}
            onClick={() => previousPage()}
          >
            Previous
          </Button>
        </div>
        <div>
          <Button
            width={'100px'}
            height={'40px'}
            fontSize={'15px'}
            disabled={indexPage >= data.length / 10}
            onClick={() => nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Table;
