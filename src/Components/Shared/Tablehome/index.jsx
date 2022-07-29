import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';
//import Dropdown from '../Dropdown/Dropdown';
import Slider from 'Components/Shared/Slider';
import Modal from '../Modal';

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
  const [showListEmployeesProject, setShowListEmployeesProject] = useState(false);
  const [listEmployeesProject, setListEmployeesProject] = useState([]);
  const [listTasksProjects, setListTasksProjects] = useState([]);
  const [showListTasksProjects, setShowListTasksProjects] = useState(false);

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
  const messageWithOutInformation = (role) => {
    if (role === 'SUPERADMIN') {
      return `To start add a admin`;
    } else if (role === `ADMIN`) {
      return `To start add a project`;
    } else {
      return `No projects Assigned`;
    }
  };
  const listEmployeesProjectFunction = (team) => {
    setListEmployeesProject(team);
    setShowListEmployeesProject(true);
  };
  const closeListEmployeesProject = () => {
    setListEmployeesProject([]);
    setShowListEmployeesProject(false);
  };

  const listTasksProjectFunction = (tasks) => {
    console.log(tasks);
    setListTasksProjects(tasks);
    setShowListTasksProjects(true);
  };
  const closeListTasksProject = () => {
    setListTasksProjects([]);
    setShowListTasksProjects(false);
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {show.length === 0 ? (
        <>
          <h2>{messageWithOutInformation(role)}</h2>
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
                        if (!row.tasks || row.tasks.length < 1) {
                          return <td>No tasks yet</td>;
                        } else {
                          return (
                            <div className={styles.dropdownTd}>
                              {/* <Dropdown
                                className={styles.dropdownTd}
                                width={'150px'}
                                placeholder="Tasks"
                              >
                                {row[key]?.map((element) => {
                                  return <option key={Math.random()}>{element.taskName}</option>;
                                })}
                                ;
                              </Dropdown> */}
                              <button
                                className={styles.empButton}
                                id="buttonListEmployeesTask"
                                fontSize={'12px'}
                                onClick={() => listTasksProjectFunction(row.tasks)}
                              >
                                <i className="fa-solid fa-list"></i>
                              </button>
                            </div>
                          );
                        }
                      }
                      if (key === 'team') {
                        if (!row.team || row.team.length < 1) {
                          return <td>No members yet</td>;
                        } else {
                          return (
                            <td>
                              <div className="empList">
                                <button
                                  className={styles.empButton}
                                  id="buttonListEmployeesTask"
                                  fontSize={'12px'}
                                  onClick={() => listEmployeesProjectFunction(row.team)}
                                >
                                  <i className="fa-solid fa-users"></i>
                                </button>
                              </div>
                            </td>
                          );
                        }
                      } else if (key === 'endDate' || key === 'startDate') {
                        if (!row[key]) {
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
                            width={'40px'}
                            height={'40px'}
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
                            width={'40px'}
                            height={'40px'}
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
            <div className={styles.navButtons}>
              <div>
                <Button
                  id="buttonPreviosPageHome"
                  width={'40px'}
                  height={'40px'}
                  fontSize={'15px'}
                  disabled={indexPage <= 1}
                  onClick={() => previousPage()}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </Button>
              </div>
              <div>
                <p>Page {indexPage}</p>
              </div>
              <div>
                <Button
                  id="buttonNextPageHome"
                  width={'40px'}
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
          {role === `ADMIN` || role === `SUPERADMIN` ? (
            <div className={styles.buttonBox}>
              {role === 'SUPERADMIN' ? <p>Add admin</p> : <p>Add project</p>}
              <button
                id={styles['buttonAddHome']}
                fontSize={'15px'}
                onClick={() => {
                  openModal('POST');
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
      <Modal
        showModal={showListEmployeesProject}
        handleClose={closeListEmployeesProject}
        modalTitle={`Employees:`}
      >
        <ol>
          {listEmployeesProject.map((employee, index) => (
            <li
              key={`${index}${employee.employeeId._id}`}
            >{`${employee.employeeId.firstName} ${employee.employeeId.lastName}`}</li>
          ))}
        </ol>
      </Modal>
      <Modal
        showModal={showListTasksProjects}
        handleClose={closeListTasksProject}
        modalTitle={`Tasks:`}
      >
        <ol>
          {listTasksProjects.map((task, index) => (
            <li key={`${index}${task._id}`}>{`${task.taskName}`}</li>
          ))}
        </ol>
      </Modal>
    </div>
  );
}

export default Tablehome;
