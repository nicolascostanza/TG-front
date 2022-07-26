import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';
import Modal from 'Components/Shared/Modal';
// import Dropdown from '../Dropdown/Dropdown';
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
// import { getCurrentUserByEmail } from 'redux/currentUser/thunks';

function Tableproject({ title, roleUser, switcher, idProject }) {
  const [tab, setTab] = useState('employees');
  const [idToDelete, setIdToDelete] = useState('');
  const [filterProject, setFilterProject] = useState(true);
  const [indexPage, setIndexPage] = useState(1);
  const [showModalPm, setShowModalPm] = useState(false);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  const [method, setMethod] = useState('');
  const [idToForm, setIdToForm] = useState('');
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalDeleteResponse, setshowModalDeleteResponse] = useState(false);
  const [showListEmployeesTask, setShowListEmployeesTask] = useState(false);
  const [listEmployeesTask, setListEmployeesTask] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [showModalResponse, setShowModalResponse] = useState(false);
  const [pm, setPm] = useState(false);
  const dispatch = useDispatch();
  const message = useSelector((state) => state.projects.message);
  const errorEmployeeOrTask = useSelector((state) => state.projects.error);
  const allTask = useSelector((state) => state.tasks.list);
  const allEmployees = useSelector((state) => state.employees.list);
  const allProjects = useSelector((state) => state.projects.list);
  let projectoElegido = allProjects.filter((project) => project?._id === idProject);
  let dataTeam = projectoElegido[0].team;
  let dataTasks = projectoElegido[0].tasks;
  let currentUser = useSelector((state) => state.currentUser.currentUser);
  // GIVE FUNCIONALITIES TO PM
  const verifiedPM = () => {
    const employeeOnProject = dataTeam.find(
      (employee) => employee.employeeId._id === currentUser._id
    );
    if (!employeeOnProject) {
      return null;
    } else {
      employeeOnProject?.isPM ? setPm(true) : setPm(false);
    }
  };

  let headers;
  let keys;
  let data;
  // TESTS
  console.log('all employees', allEmployees);
  // KEYS AND VALUES
  if (filterProject) {
    headers = ['Name', 'Last Name', 'Role', 'Rate'];
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
    dispatch(thunksTasks.getTasks());
    const maxIndexPage = data?.length > 10 ? Math.floor((data?.length - 0.01) / 10) + 1 : 1;
    if (indexPage < 1) {
      setIndexPage(1);
    }
    if (indexPage > maxIndexPage) {
      setIndexPage(maxIndexPage);
    }
    verifiedPM();
  }, [data, allProjects]);
  //  see this useEffect for update tableList in employee's home
  // useEffect(() => {
  //   if (roleUser === 'EMPLOYEE') {
  //     const email = JSON.parse(sessionStorage.getItem('currentUser')).email;
  //     const token = JSON.parse(sessionStorage.getItem('authenticated')).token;
  //     const role = JSON.parse(sessionStorage.getItem('authenticated')).role;
  //     dispatch(getCurrentUserByEmail(email, token, role));
  //   }
  // }, []);
  const show = data?.slice(10 * (indexPage - 1), 10 * indexPage);

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
  // REACT HOOK FORMS
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(tab === 'employees' ? validationsFormAddEmployee : validationsFormAddTask)
  });
  // CAMBIA LA TAB DEL FITLRADO
  const changeFilter = () => {
    setFilterProject(!filterProject);
  };
  // OPEN MODALS EN FUNCIONES ADD
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
  // SETEO DE VALORES EN EDIT
  const onEdit = (id) => {
    setIdToForm(id);
    if (tab === 'employees') {
      const valuesForm = dataTeam.filter((member) => member.employeeId._id === id);
      setCurrentEmployee(valuesForm[0]);
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
        assignedEmployee: valuesForm[0].assignedEmployee[0],
        startDate: valuesForm[0].startDate.substring(0, 10),
        status: valuesForm[0].status
      });
      setShowModalTask(true);
    }
  };
  // DELETE MODAL AND FUNCTIONS
  const onDeletePreviousFunction = (id) => {
    setIdToDelete(id);
    setShowModalDelete(true);
  };
  const onDelete = async () => {
    if (tab === 'tasks') {
      dispatch(thunksProjects.deleteTaskToProject(idProject, idToDelete));
    } else {
      dispatch(thunksProjects.deleteEmployeeToProject(idProject, idToDelete));
      dispatch(thunksEmployees.deleteProjectAssociated(idToDelete, idProject));
    }
    setShowModalDelete(false);
    setshowModalDeleteResponse(true);
  };
  // OPEN MODAL ASSIGN PM
  const openModalPm = () => {
    setShowModalPm(true);
  };

  const onSubmit = async (data) => {
    console.log('data', data);
    if (tab === 'employees') {
      console.log('data', data);
      if (method === 'POST') {
        if (pm) {
          const newEmployeeAssociated = {
            projectId: idProject,
            role: data.role,
            // rate: 0,
            rate: data.rate,
            isPM: false
          };
          // dispatch(
          //   thunksProjects.addEmployeeToProject({ ...data, rate: 0, isPM: false }, idProject)
          // );
          dispatch(thunksProjects.addEmployeeToProject({ ...data, isPM: false }, idProject));
          dispatch(
            thunksEmployees.pushProjectAssociatedInEmployee(newEmployeeAssociated, data.employeeId)
          );
          console.log('the new employee', newEmployeeAssociated);
        } else {
          const newEmployeeAssociated = {
            projectId: idProject,
            role: data.role,
            rate: data.rate,
            isPM: false
          };
          dispatch(thunksProjects.addEmployeeToProject(data, idProject));
          dispatch(
            thunksEmployees.pushProjectAssociatedInEmployee(newEmployeeAssociated, data.employeeId)
          );
        }
        setShowModalEmployee(false);
        setShowModalResponse(true);
      } else {
        let sendData = {
          employeeId: data.employeeId,
          role: data.role,
          rate: data.rate,
          isPM: data.role === 'PM' ? true : false
        };
        const editEmployeeAssociated = {
          projectId: idProject,
          role: data.role,
          rate: data.rate,
          isPM: data.role === 'PM' ? true : false
        };
        dispatch(thunksProjects.updateEmployeeToProject(idProject, sendData));
        dispatch(
          thunksEmployees.pushEditProjectAssociatedInEmployee(
            editEmployeeAssociated,
            data.employeeId
          )
        );
        setShowModalEmployee(false);
        setShowModalResponse(true);
        setIdToForm('');
      }
    } else {
      // const date = new Date();
      // let output =
      //   String(date.getFullYear()) +
      //   '/' +
      //   String(date.getMonth() + 1).padStart(2, '0') +
      //   '/' +
      //   String(date.getDate()).padStart(2, '0');
      let taskToAdd = {
        parentProject: idProject,
        taskName: data.taskName,
        taskDescription: data.taskDescription,
        assignedEmployee: [data.assignedEmployee],
        startDate: data.startDate,
        status: data.status
        // createdAt: method === 'POST' ? output : null
      };
      if (method === 'POST') {
        dispatch(thunksTasks.addTask(taskToAdd));
        setShowModalTask(false);
        setShowModalResponse(true);
      } else {
        dispatch(thunksProjects.updateTaskToProject(taskToAdd, idToForm, idProject));
        setShowModalTask(false);
        setShowModalResponse(true);
        setIdToForm('');
      }
    }
    setMethod('');
  };
  const listEmployeesTaskFunction = (id) => {
    let selectedTaskVar = allTask.filter((task) => task._id === id);
    setListEmployeesTask(selectedTaskVar[0].assignedEmployee);
    setShowListEmployeesTask(true);
  };
  const closeListEmployeesTask = () => {
    setListEmployeesTask([]);
    setShowListEmployeesTask(false);
  };
  // RETORNA DROPDOWN O ETIQUETA P , SI ES PM O NO
  const editOptions = (current) => {
    if (current.role === 'PM') {
      return <p>PM</p>;
    }
    return (
      <select id="roleEmployee" {...register('role')} name="role">
        <option>-</option>
        <option>DEV</option>
        <option>QA</option>
        <option>TL</option>
      </select>
    );
  };

  return (
    <div className={styles.container}>
      <AssignPm
        showModalPM={showModalPm}
        closeModalPM={() => setShowModalPm(false)}
        employeesInProject={data}
        idProject={idProject}
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
            </div>
            <div>
              <label htmlFor="Start date">Start Date</label>
              <input
                id="startDateTask"
                type="date"
                {...register('startDate')}
                error={appendErrors.startDate?.message}
              />
              {errors.startDate && <p className={styles.errorInput}>{errors.startDate?.message}</p>}
            </div>
            <div>
              <label htmlFor="Status">Status</label>
              <select id="status" {...register('status')} name="status">
                <option>Ready to deliver</option>
                <option>Paused</option>
                <option>Unassigned</option>
                <option>In progress</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              {errors.status && <p className={styles.errorInput}>{errors.status?.message}</p>}
            </div>
            <div className={styles.buttonsContainer}>
              <Button id="addModalTasks" width={'75px'} height={'30px'} type="submit" value="task">
                {method === 'POST' ? 'ADD' : 'EDIT'}
              </Button>
            </div>
            <div className={styles.buttonsContainer}>
              <Button
                onClick={() => setShowModalTask(false)}
                id="addModalTasksCancel"
                width={'75px'}
                height={'30px'}
                type="submit"
                value="cancelTask"
              >
                CANCEL
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
              {method === 'POST' ? (
                <select id="employees" {...register('employeeId')} name="employeeId">
                  {allEmployees.map((member) => (
                    <option
                      value={member._id}
                      key={member._id}
                    >{`${member.firstName} ${member.lastName}`}</option>
                  ))}
                </select>
              ) : (
                <p>{`${currentEmployee.employeeId.firstName} ${currentEmployee.employeeId.lastName}`}</p>
              )}
            </div>
            {
              <div>
                <label htmlFor="role">Role</label>
                {method === 'POST' ? (
                  <select id="roleEmployee" {...register('role')} name="role">
                    <option>-</option>
                    <option>DEV</option>
                    <option>QA</option>
                    <option>TL</option>
                  </select>
                ) : (
                  editOptions(currentEmployee)
                )}
              </div>
            }
            {/* {pm ? null : ( */}
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
            {/* )} */}
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
            <div>
              <Button
                onClick={() => setShowModalEmployee(false)}
                id="addModalEmployeeCancel"
                width={'75px'}
                height={'30px'}
                type="submit"
                value="cancelEmoployee"
              >
                CANCEL
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}
      <Modal
        showModal={showModalDelete}
        handleClose={() => setShowModalDelete(false)}
        modalTitle={'DELETE'}
      >
        {tab === 'employees'
          ? `are you sure you want to delete this employee?`
          : `are you sure you want to delete this task??`}
        <Button onClick={onDelete}>DELETE</Button>
        <Button onClick={() => setShowModalDelete(false)}>CANCEL</Button>
      </Modal>
      <Modal
        showModal={showModalDeleteResponse}
        handleClose={() => setshowModalDeleteResponse(false)}
        modalTitle={`DELETED`}
      >
        <Button onClick={() => setshowModalDeleteResponse(false)}>OK</Button>
      </Modal>

      <Modal
        showModal={showModalResponse}
        handleClose={() => setShowModalResponse(false)}
        modalTitle={errorEmployeeOrTask ? 'WARNING' : 'SUCCESS'}
      >
        {message}
      </Modal>
      <h2>{title} Name project</h2>
      {roleUser === `ADMIN` && tab === 'employees' ? (
        <Button
          disabled={dataTeam.length > 0 ? false : true}
          id="buttonAssignPm"
          width={'80px'}
          height={'40px'}
          onClick={() => {
            openModalPm();
          }}
        >
          Assign PM
        </Button>
      ) : null}
      {roleUser === 'ADMIN' || pm ? (
        <>
          {filterProject ? (
            <Button
              id="buttonAddEmployee"
              width={'80px'}
              height={'40px'}
              fontSize={'15px'}
              onClick={() => onAddEmployee()}
            >
              <i className="fa-solid fa-plus"></i>
              ADD EMPLOYEE
            </Button>
          ) : (
            <Button id="buttonAddTask" onClick={() => onAddTask()}>
              ADD TASK
            </Button>
          )}
        </>
      ) : null}
      {/* {roleUser === `ADMIN` && tab === 'employees' ? (
        <Button
          disabled={dataTeam.length > 0 ? false : true}
          id="buttonAssignPm"
          width={'80px'}
          height={'40px'}
          onClick={() => {
            openModalPm();
          }}
        >
          Assing PM
        </Button>
      ) : null}
      {roleUser === 'ADMIN' || pm ? (
        <>
          {filterProject ? (
            <Button
              id="buttonAddEmployee"
              width={'80px'}
              height={'40px'}
              fontSize={'15px'}
              onClick={() => onAddEmployee()}
            >
              <i className="fa-solid fa-plus"></i>
              ADD EMPLOYEE
            </Button>
          ) : (
            <Button id="buttonAddTask" onClick={() => onAddTask()}>
              ADD TASK
            </Button>
          )}
        </>
      ) : null}
      {roleUser === 'EMPLOYEE' && !pm && !filterProject ? (
        <Button id="buttonAddTask" onClick={() => onAddTask()}>
          ADD TASK
        </Button>
      ) : null} */}
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
                    if (roleUser === 'ADMIN' || pm) {
                      return <th key={`${index}${header}`}>{header}</th>;
                    }
                  } else {
                    return <th key={index}>{header}</th>;
                  }
                })}
                {roleUser === `ADMIN` || pm ? <th>Edit</th> : null}
                {roleUser === `ADMIN` || pm ? <th>Delete</th> : null}
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {show?.map((row) => {
                return (
                  <tr className={styles.row} key={row._id}>
                    {keys.map((key, index) => {
                      if (key === 'employeeId') {
                        return (
                          <>
                            <td key={index}>
                              {row.employeeId?.firstName ? row.employeeId?.firstName : '-'}
                            </td>
                            <td key={index}>
                              {row.employeeId?.lastName ? row.employeeId?.lastName : '-'}
                            </td>
                          </>
                        );
                      } else if (key === 'rate') {
                        if (roleUser === `ADMIN` || pm) {
                          return <td key={index}>{row[key]}</td>;
                        } else {
                          return null;
                        }
                      } else if (key === 'assignedEmployee') {
                        if (row[key].length >= 1) {
                          return (
                            <Button
                              id="buttonListEmploeesTask"
                              width={'100px'}
                              height={'30px'}
                              fontSize={'12px'}
                              onClick={() => listEmployeesTaskFunction(row._id)}
                            >
                              Employee List
                            </Button>
                          );
                          // let dati = nuevoArray[index];
                          // return (
                          //   <Dropdown width={'150px'} placeholder="Tasks">
                          //     {dati.map((element) => {
                          //       return (
                          //         <option key={Math.random()}>
                          //           {element.employeeId.firstName}
                          //         </option>
                          //       );
                          //     })}
                          //     ;
                          //   </Dropdown>
                          // } else if (row[key].length === 1) {
                          //   return <td>{nuevoArray[index]?.employeeId.firstName}</td>;
                          // return <td>{nuevoArray}</td>;
                        } else {
                          return <td> - </td>;
                        }
                      } else if (key === 'role') {
                        if (row.isPM) {
                          return <td>PM</td>;
                        } else {
                          return <td key={index}>{row[key]}</td>;
                        }
                      } else if (
                        key === 'createdAt' ||
                        key === 'startDate' ||
                        key === 'updatedAt'
                      ) {
                        if (row[key] === undefined) {
                          return <td> - </td>;
                        } else {
                          let dateFormatted = new Date(row[key]).toLocaleDateString('en-us', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          });
                          return <td key={index}>{dateFormatted}</td>;
                        }
                      } else {
                        return <td key={index}>{row[key]}</td>;
                      }
                    })}
                    {roleUser === `ADMIN` || pm ? (
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
                            onClick={() =>
                              onDeletePreviousFunction(
                                tab === 'tasks' ? row._id : row.employeeId._id
                              )
                            }
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
      <Modal
        showModal={showListEmployeesTask}
        handleClose={closeListEmployeesTask}
        modalTitle={`Employees:`}
      >
        <ol>
          {listEmployeesTask.map((employee) => (
            <li key={Math.random()}>{`${employee.firstName} ${employee.lastName}`}</li>
          ))}
        </ol>
        <Button onClick={closeListEmployeesTask}>OK</Button>
      </Modal>
    </div>
  );
}

export default Tableproject;
