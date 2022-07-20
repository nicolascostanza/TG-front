import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';
import Modal from 'Components/Shared/Modal';
import Dropdown from '../Dropdown/Dropdown';
// import AssignPm from 'Components/Shared/assingPm';
import { useDispatch } from 'react-redux';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { validationsFormAddEmployee, validationsFormAddTask } from 'Components/Home/validations';
import * as thunksProjects from 'redux/projects/thunks';
import * as thunksTasks from 'redux/tasks/thunks';
import * as thunksEmployees from 'redux/employees/thunks';
import { useSelector } from 'react-redux';
import AssignPm from '../assingPm';

function Tableproject({ title, roleUser, switcher, idProject, setRequest }) {
  const [tab, setTab] = useState('employees');
  const [filterProject, setFilterProject] = useState(true);
  const [indexPage, setIndexPage] = useState(1);
  const [showModalPm, setShowModalPm] = useState(false);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  const [method, setMethod] = useState('');
  const [idToForm, setIdToForm] = useState('');
  const [assignPM, setAssignPM] = useState(false);
  // const [componente, setComponente] = useState(false);
  // const [assignedEmployee, setAssignedEmployees] = useState([]);
  // const [task, setTask] = useState({});
  const dispatch = useDispatch();
  const allEmployees = useSelector((state) => state.employees.list);
  const allProjects = useSelector((state) => state.projects.list);
  let projectoElegido = allProjects.filter((project) => project?._id === idProject);
  console.log('proyectoelegido:', projectoElegido[0]);
  let dataTeam = projectoElegido[0].team;
  let dataTasks = projectoElegido[0].tasks;
  console.log('EQUIPITO:', dataTeam);
  console.log('CAMPOS PARA TASKS', dataTasks);
  let headers;
  let keys;
  let data;
  // tabla para mostrar la tabla vacia
  // function EmptyTable() {
  //   if (tab === 'employees') {
  //     return <td>There is no employee yet</td>;
  //   }
  //   return <td>There is no task yet</td>;
  // }

  if (filterProject) {
    headers = ['ID', 'Name', 'Last Name', 'Role', 'Rate'];
    keys = ['employeeId', 'role', 'rate'];
    data = dataTeam;
  } else {
    headers = [
      'Task Name',
      'Description',
      'Assigned',
      'Status',
      'Created',
      'Start Date',
      'Updated'
    ];
    keys = [
      // '_id',
      'taskName',
      'taskDescription',
      'assignedEmployee',
      'status',
      'createdAt',
      'startDate',
      'updatedAt'
    ];
    data = dataTasks;
  }
  useEffect(() => {
    dispatch(thunksEmployees.getEmployees());
    // dispatch(thunksTasks.getTasks());
    // dispatch(thunksProjects.getProjects());
    const maxIndexPage = data?.length > 10 ? Math.floor((data?.length - 0.01) / 10) + 1 : 1;
    if (indexPage < 1) {
      setIndexPage(1);
    }
    if (indexPage > maxIndexPage) {
      setIndexPage(maxIndexPage);
    }
  }, [data, allProjects]);

  const show = data?.slice(10 * (indexPage - 1), 10 * indexPage);
  console.log('muestro esto PERREKE:', show);
  console.log('TAMAÑO A MOSTRAR:', show.length);

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

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(tab === 'employees' ? validationsFormAddEmployee : validationsFormAddTask)
  });
  // cambia de tab entre task y employee
  const changeFilter = () => {
    setFilterProject(!filterProject);
  };

  const onAddEmployee = () => {
    reset({});
    setMethod('POST');
    setShowModalEmployee(true);
  };

  const onAddTask = () => {
    reset({});
    setMethod('POST');
    setShowModalTask(true);
  };
  // seteo de valores en el edit de employees y de tasks
  const onEdit = (id) => {
    setIdToForm(id);
    if (tab === 'employees') {
      const valuesForm = dataTeam.filter((member) => member.employeeId._id === id);
      reset({
        employeeId: valuesForm[0].employeeId._id,
        role: valuesForm[0].role,
        rate: valuesForm[0].rate
      });
      setShowModalEmployee(true);
    } else {
      const valuesForm = dataTasks.filter((task) => task._id === id);
      reset({
        taskName: valuesForm[0].taskName,
        taskDescription: valuesForm[0].taskDescription,
        assignedEmployee: valuesForm[0].assignedEmployee,
        startDate: valuesForm[0].startDate,
        status: valuesForm[0].status
      });
      setShowModalTask(true);
    }
  };

  const onDelete = (id) => {
    if (confirm('are you sure?')) {
      dispatch(
        tab === 'tasks'
          ? thunksProjects.deleteTaskToProject(idProject, id)
          : thunksProjects.deleteEmployeeToProject(idProject, id)
      );
    }
  };
  const openModalPm = () => {
    setShowModalPm(true);
  };
  let currentPm = dataTeam.filter((employ) => employ.isPM === true);

  const onSubmit = (data) => {
    // employees, post y put en el if, en el else post y put de tasks
    if (tab === 'employees') {
      if (method === 'POST') {
        dispatch(thunksProjects.addEmployeeToProject(data, idProject));
      } else {
        if (data.role === 'PM') {
          const current = {
            employeeId: currentPm[0].employeeId._id,
            role: '-',
            rate: currentPm[0].rate,
            isPM: false
          };
          // fetch(`${process.env.REACT_APP_API_URL}/projects/${idProject}/edit/employee`, {
          //   method: 'PUT',
          //   headers: {
          //     'Content-type': 'application/json'
          //   },
          //   body: JSON.stringify(current)
          // });
          dispatch(thunksProjects.updateEmployeeToProject(current, idToForm, idProject));
        }
        // if (idToForm === currentPm[0].employeeId._id) {
        //   const current = {
        //     employeeId: currentPm[0].employeeId._id,
        //     role: 'QA',
        //     // a cambiar el role por -
        //     rate: currentPm[0].rate,
        //     isPM: false
        //   };
        //   fetch(`${process.env.REACT_APP_API_URL}/projects/${idProject}/edit/employee`, {
        //     method: 'PUT',
        //     headers: {
        //       'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(current)
        //   });
        // }
        // dispatch(thunksProjects.deleteEmployeeToProject(idProject, idToForm));
        // dispatch(thunksProjects.addEmployeeToProject(data, idProject));
        // body, id, idProject
        dispatch(thunksProjects.updateEmployeeToProject(data, idToForm, idProject));
        setIdToForm('');
      }
    } else {
      let taskToAdd = {
        parentProject: idProject,
        taskName: data.taskName,
        taskDescription: data.taskDescription,
        assignedEmployee: [data.assignedEmployee],
        startDate: data.startDate,
        status: data.status
      };
      if (method === 'POST') {
        dispatch(thunksTasks.addTask(taskToAdd));
      } else {
        // dispatch(thunksProjects.deleteTaskToProject(idProject, idToForm));
        // dispatch(thunksTasks.addTask(taskToAdd));
        // (body, id, idProject)
        dispatch(thunksProjects.updateTaskToProject(taskToAdd, idToForm, idProject));
        setIdToForm('');
      }
    }

    setAssignPM(false);
    setMethod('');
    setRequest(!setRequest);
  };

  // const valuesForm = dataTeam.filter((member) => member.employeeId._id === id);

  console.log(errors);
  console.log('todos los employees_:', allEmployees);

  return (
    <div className={styles.container}>
      <AssignPm
        showModalPM={showModalPm}
        closeModalPM={() => setShowModalPm(false)}
        employeesInProject={data}
        idProject={idProject}
        projectAssociated={projectoElegido}
      ></AssignPm>
      {showModalTask ? (
        <Modal
          showModal={showModalTask}
          handleClose={() => setShowModalTask(false)}
          modalTitle={method === 'POST' ? 'ADD TASK' : 'EDIT TASK'}
        >
          <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="Task Name">Task Name</label>
              <input
                id="taskname"
                type="text"
                placeholder="Task Name"
                {...register('taskName')}
                error={appendErrors.taskName?.message}
              />
              {errors.taskName && <p className={styles.errorInput}>{errors.taskName?.message}</p>}
            </div>
            <div>
              <label htmlFor="Task Description">Task Description</label>
              <input
                id="taskDescription"
                type="text"
                placeholder="Description"
                {...register('taskDescription')}
                error={appendErrors.taskDescription?.message}
              />
              {errors.taskDescription && (
                <p className={styles.errorInput}>{errors.taskDescription?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="Assigned Employee">Assigned Employee</label>
              <select
                id="assignedEmployee"
                {...register('assignedEmployee')}
                name="assignedEmployee"
              >
                {dataTeam.map((member) => (
                  <option
                    value={member.employeeId._id}
                    key={member._id}
                  >{`${member.employeeId.firstName} ${member.employeeId.lastName}`}</option>
                ))}
              </select>
              {/* <input
                // value={assignedEmployee}
                // onChange={handleInputChanges}
                name="assignedEmployees"
                type="text"
                // placeholder="Search an employee"
                {...register('assignedEmployee')}
                error={appendErrors.assignedEmployee?.message}
              />
              {errors.assignedEmployee && (
                <p className={styles.errorInput}>{errors.assignedEmployee?.message}</p>
              )} */}
              {/* <div className={styles.optionContainer}>
                {assignedEmployee.length > 0
                  ? dataTeam
                      .filter(
                        (employee) =>
                          employee.employeeId.firstName.match(new RegExp(assignedEmployee, 'i')) ||
                          employee.employeeId.lastName.match(new RegExp(assignedEmployee, 'i'))
                      )
                      .map((member) => {
                        return (
                          <p
                            key={member._id}
                            onClick={() =>
                              assignedEmployee.find((emp) => emp === member._id)
                                ? deleteFromSelectedEmployees(member._id)
                                : appendToSelectedEmployees(member._id)
                            }
                            className={
                              assignedEmployee.find((emp) => emp === member._id)
                                ? styles.selectedItem
                                : styles.notSelectedItem
                            }
                          >
                            {member.firstName}: {member.email}
                          </p>
                        );
                      })
                  : assignedEmployee.map((member) => {
                      return (
                        <p
                          key={member}
                          className={styles.chip}
                          onClick={() => deleteFromSelectedEmployees(member)}
                        >
                          {dataTeam.find((emp) => emp._id === member).firstName} (
                          {dataTeam.find((emp) => emp._id === member).lastName})
                        </p>
                      );
                    })}
              </div> */}
            </div>
            <div>
              <label htmlFor="Start date">Start Date</label>
              <input
                id="startDateTask"
                type="date"
                {...register('startDate')}
                error={appendErrors.startDate?.message}
              />
              {errors.status && <p className={styles.errorInput}>{errors.startDate?.message}</p>}
            </div>
            <div>
              <label htmlFor="Status">Status</label>
              <input
                id="statusTask"
                type="text"
                placeholder="Status"
                {...register('status')}
                error={appendErrors.status?.message}
              />
              {errors.status && <p className={styles.errorInput}>{errors.status?.message}</p>}
            </div>
            <div className={styles.buttonsContainer}>
              <Button id="addModalTasks" width={'75px'} height={'30px'} type="submit" value="task">
                {method === 'POST' ? 'ADD' : 'EDIT'}
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}
      {/* modal add employee */}
      {showModalEmployee ? (
        <Modal
          showModal={showModalEmployee}
          handleClose={() => setShowModalEmployee(false)}
          modalTitle={method === 'POST' ? 'ADD EMPLOYEE' : 'EDIT EMPLOYEE'}
        >
          <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="employee id">Employee</label>
              <select id="employees" {...register('employeeId')} name="employeeId">
                {allEmployees.map((member) => (
                  <option
                    value={member._id}
                    key={member._id}
                  >{`${member.firstName} ${member.lastName}`}</option>
                ))}
              </select>
              {/* <input
                type="text"
                placeholder="Employee Id"
                {...register('employeeId')}
                error={appendErrors.employeeId?.message}
              /> */}
              {errors.employeeId && (
                <p className={styles.errorInput}>{errors.employeeId?.message}</p>
              )}
            </div>
            {!assignPM ? (
              <div>
                <label htmlFor="role">Role</label>
                {idToForm === currentPm[0]?.employeeId._id ? (
                  <p>PM</p>
                ) : (
                  <select id="roleEmployee" {...register('role')} name="role">
                    <option>-</option>
                    <option>DEV</option>
                    <option>QA</option>
                    <option>TL</option>
                  </select>
                )}
              </div>
            ) : null}

            <div>
              <label htmlFor="Rate">Rate</label>
              <input
                id="rateEmployee"
                type="number"
                placeholder="500"
                {...register('rate')}
                error={appendErrors.rate?.message}
              />
              {errors.rate && <p className={styles.errorInput}>{errors.rate?.message}</p>}
            </div>
            {/* <div className={styles.checkbox}>
              <label htmlFor="isPm">Is PM ?</label>
              <input
                className={styles.inputsProfile}
                type="checkbox"
                name="isPm"
                {...register('isPm')}
              />
            </div> */}
            <div className={styles.buttonsContainer}>
              <Button
                id="addModalEmployees"
                width={'75px'}
                height={'30px'}
                type="submit"
                value="GO"
              >
                {method === 'POST' ? 'ADD' : 'EDIT'}
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}
      <h2>{title}</h2>
      {roleUser === `ADMIN` ? (
        <button
          disabled={dataTeam.length > 0 ? false : true}
          id="buttonAssignPm"
          width={'80px'}
          height={'40px'}
          onClick={() => {
            openModalPm();
          }}
        >
          Asignar PM
        </button>
      ) : null}
      {roleUser === `ADMIN` || roleUser === `PM` ? (
        <>
          {filterProject ? (
            <button
              id="buttonAddEmployee"
              width={'80px'}
              height={'40px'}
              fontSize={'15px'}
              onClick={() => onAddEmployee()}
            >
              <i className="fa-solid fa-plus"></i>
              ADD EMPLOYEE
            </button>
          ) : (
            <Button id="buttonAddTask" onClick={() => onAddTask()}>
              ADD TASK
            </Button>
          )}
        </>
      ) : null}
      <Button id="buttonBack" onClick={() => switcher()}>
        BACK
      </Button>
      <button
        id="buttonTabEmployees"
        disabled={filterProject ? true : false}
        onClick={() => {
          setTab('employees');
          changeFilter();
        }}
      >
        Employees
      </button>
      <button
        id="buttonTabTask"
        disabled={!filterProject ? true : false}
        onClick={() => {
          setTab('tasks');
          changeFilter();
        }}
      >
        Tasks
      </button>
      {show.length === 0 ? (
        <>
          <h1>No information to display</h1>
          <h2>To start add an {tab === 'employees' ? 'Employee' : 'Task'}</h2>
        </>
      ) : (
        <>
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
                    <th>Edit</th>
                    <th>Delete</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {/* {show.length === 0 ? return <EmptyTable/> : } */}
              {show?.map((row) => {
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
                      } else if (key === 'assignedEmployee') {
                        if (row[key].length > 1) {
                          return (
                            <Dropdown width={'150px'} placeholder="Tasks">
                              {row[key].map((element) => {
                                return <option key={Math.random()}>{element}</option>;
                              })}
                              ;
                            </Dropdown>
                          );
                        } else if (row[key].length === 1) {
                          return <td>{row[key]}</td>;
                        } else {
                          return <td> - </td>;
                        }
                      } else if (key === 'role') {
                        if (row.isPM) {
                          return <td>PM</td>;
                        } else {
                          return <td key={index}>{row[key]}</td>;
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
                            id="buttonEditInProject"
                            onClick={() => {
                              setIdToForm(tab === 'tasks' ? row._id : row.employeeId._id);
                              onEdit(tab === 'tasks' ? row._id : row.employeeId._id);
                              setMethod('PUT');
                            }}
                            width={'50px'}
                            height={'25px'}
                            fontSize={'13px'}
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </Button>
                        </td>
                        <td>
                          <Button
                            id="buttonDeleteInProject"
                            onClick={() => onDelete(tab === 'tasks' ? row._id : row.employeeId._id)}
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
                id="previouspage"
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
                id="nextpage"
                width={'50px'}
                height={'40px'}
                fontSize={'15px'}
                disabled={indexPage >= data?.length / 10}
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

export default Tableproject;
