import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';
import Dropdown from '../Dropdown/Dropdown';

// ver el employeeid.name pq no popula bien
function Tablehome({
  title,
  headers,
  keys,
  data,
  role,
  onDelete,
  switcher,
  selected,
  openModal
  // userId
}) {
  const [indexPage, setIndexPage] = useState(1);
  // // const resp = data.filter((data) => data.isDeleted === false);
  // console.log('respuesta:', resp);
  // const prueba = data.map((a) => a.team.employeeId.includes(userId));
  // console.log('data:', data);
  // console.log('prueba:', prueba);
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
  const openRow = (role, id) => {
    selected(id);
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
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {role === `ADMIN` || role === `SUPERADMIN` ? (
        <Button
          id="buttonAddHome"
          width={'100px'}
          height={'40px'}
          fontSize={'15px'}
          onClick={() => {
            openModal('POST');
            // setShowModal(true);
          }}
        >
          <i className="fa-solid fa-plus"></i>
          ADD
        </Button>
      ) : (
        <></>
      )}
      {show.length === 0 ? (
        <>
          <h1>No information to display</h1>
          <h2>To start add an {role === 'SUPERADMIN' ? 'Admin' : 'Projects'}</h2>
        </>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                {headers.map((header, index) => {
                  return <th key={index}>{header}</th>;
                })}
                {role === `ADMIN` || role === `SUPERADMIN` ? (
                  <>
                    <th>Edit</th>
                    <th>Delete</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {show?.map((row) => {
                return (
                  <tr className={styles.row} key={row._id}>
                    {keys?.map((key, index) => {
                      if (key === 'active') {
                        return (
                          <td>
                            <button id="buttonIsActive">{row[key]}no funciona</button>
                          </td>
                        );
                      }
                      if (key === 'tasks') {
                        return (
                          <Dropdown width={'150px'} placeholder="Tasks">
                            {row[key].map((element) => {
                              return <option key={Math.random()}>{element.taskName}</option>;
                            })}
                            ;
                          </Dropdown>
                        );
                      }
                      if (key === 'team') {
                        return (
                          <td>
                            <Dropdown width={'150px'} placeholder={'Team'}>
                              {/* aca iria .employeeId.firstName */}
                              {row[key]?.map((element) => {
                                return (
                                  <option
                                    key={Math.random()}
                                  >{`${element.employeeId.firstName} ${element.employeeId.lastName}`}</option>
                                );
                              })}
                              ;
                            </Dropdown>
                          </td>
                        );
                      } else if (key === 'endDate') {
                        if (row[key] === undefined) {
                          return <td> - </td>;
                        } else {
                          return (
                            <td key={index} onClick={() => openRow(role, row._id)}>
                              {row[key]}
                            </td>
                          );
                        }
                      } else {
                        return (
                          <td key={index} onClick={() => openRow(role, row._id)}>
                            {row[key]}
                          </td>
                        );
                      }
                    })}
                    {role === `ADMIN` || role === `SUPERADMIN` ? (
                      <>
                        <td>
                          <Button
                            id="buttonEditHome"
                            className={styles.buttonsRows}
                            width={'50px'}
                            height={'25px'}
                            fontSize={'13px'}
                            onClick={() => {
                              openModal('PUT', row._id);
                              // setShowModal(true);
                              // onEdit(row._id);
                            }}
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </Button>
                        </td>
                        <td>
                          <Button
                            id="buttonDeleteHome"
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
                id="buttonPreviosPageHome"
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
                id="buttonNextPageHome"
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
        </>
      )}
    </div>
  );
}

export default Tablehome;
