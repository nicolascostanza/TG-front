import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';
import Dropdown from '../Dropdown/Dropdown';
import Slider from 'Components/Shared/Slider';

function Tablehome({
  title,
  headers,
  keys,
  data,
  role,
  onDelete,
  switcher,
  setId,
  openModal,
  activeChanger
}) {
  const [indexPage, setIndexPage] = useState(1);
  const show = data?.slice(10 * (indexPage - 1), 10 * indexPage);
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
  // FUNCION Q ABRE EL PROYECTO CLICKEADO EN LA TABLA
  const openRow = (role, id) => {
    setId(id);
    if (role === 'ADMIN' || role === 'PM' || role === 'EMPLOYEE') {
      switcher();
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
                            <Slider
                              idNameAndValue={'active'}
                              isChecked={row[key]}
                              onChangeFunction={activeChanger}
                              arg1={row}
                              arg2={row._id}
                            ></Slider>
                          </td>
                        );
                      }
                      if (key === 'tasks') {
                        // <div>ola</div>;
                        if (!row.tasks || row.tasks.length < 1) {
                          return <td>No tasks yet</td>;
                        } else {
                          return (
                            <Dropdown width={'150px'} placeholder="Tasks">
                              {row[key]?.map((element) => {
                                return <option key={Math.random()}>{element.taskName}</option>;
                              })}
                              ;
                            </Dropdown>
                          );
                        }
                      }
                      if (key === 'team') {
                        <div>ola</div>;
                        if (!row.team || row.team.length < 1) {
                          return <td>No members yet</td>;
                        } else {
                          return (
                            <td>
                              <Dropdown width={'150px'} placeholder={'Team'}>
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
                        }
                      } else if (key === 'endDate' || key === 'startDate') {
                        if (row[key] === undefined) {
                          return <td> - </td>;
                        } else {
                          let dateFormatted = new Date(row[key]).toISOString().split('T')[0];
                          return (
                            <td key={index} onClick={() => openRow(role, row._id)}>
                              {dateFormatted}
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
                              setId(row._id);
                              openModal('PUT', row._id);
                            }}
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </Button>
                        </td>
                        <td>
                          <Button
                            id="buttonDeleteHome"
                            onClick={() => {
                              onDelete(row._id);
                              setId(row._id);
                            }}
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
