import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';
import Modal from 'Components/Shared/Modal';
import { useDispatch } from 'react-redux';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { validationsFormAddEmployee, validationsFormAddTask } from 'Components/Home/validations';
import * as thunksProjects from 'redux/projects/thunks';
import * as thunksTasks from 'redux/tasks/thunks';
import * as thunksEmployees from 'redux/employees/thunks';
import { useSelector } from 'react-redux';

// BORRAR EL OPENTIMESHEET NO SIRVE MAS
function Tableproject({ title, roleUser, switcher, idProject, setRequest }) {
  const [tab, setTab] = useState('employees');
  const [filterProject, setFilterProject] = useState(true);
  const [indexPage, setIndexPage] = useState(1);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  const [showModalPM, setShowModalPM] = useState(false);
  const [method, setMethod] = useState('');
  const [idToForm, setIdToForm] = useState('');
  // const [assignedEmployee, setAssignedEmployees] = useState([]);
  // const [task, setTask] = useState({});
  const dispatch = useDispatch();
  const allEmployees = useSelector((state) => state.employees.list);
  const allProjects = useSelector((state) => state.projects.list);
  console.log('proyectos:', allProjects);
  let projectoElegido = allProjects.filter((project) => project?._id === idProject);
  console.log('proyectoelegido:', projectoElegido[0]);
  let dataTeam = projectoElegido[0].team;
  let dataTasks = projectoElegido[0].tasks;
  console.log('team:', dataTeam);
  console.log('tasks:', dataTasks);
  let headers;
  let keys;
  let data;

  if (filterProject) {
    headers = ['ID', 'Name', 'Last Name', 'Role', 'Rate'];
    keys = ['employeeId', 'role', 'rate'];
    data = dataTeam;
  } else {
    headers = ['ID', 'Task Name', 'Description'];
    keys = ['_id', 'taskName', 'taskDescription'];
    data = dataTasks;
  }
  const show = data?.slice(10 * (indexPage - 1), 10 * indexPage);
  console.log('muestro est:', show);

  useEffect(() => {
    dispatch(thunksEmployees.getEmployees());
    // dispatch(thunksProjects.getProjects());
    const maxIndexPage = data?.length > 10 ? Math.floor((data?.length - 0.01) / 10) + 1 : 1;
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

  const assignPm = () => {
    console.log('asigno el pm');
    setShowModalPM(true);
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

  const onEdit = (id) => {
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
    setIdToForm(id);
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

  const onSubmit = (data) => {
    console.log('data enviada:', data);
    if (tab === 'employees') {
      if (method === 'POST') {
        dispatch(thunksProjects.addEmployeeToProject(data, idProject));
      } else {
        dispatch(thunksProjects.deleteEmployeeToProject(idProject, idToForm));
        dispatch(thunksProjects.addEmployeeToProject(data, idProject));
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
        dispatch(thunksProjects.deleteTaskToProject(idProject, idToForm));
        dispatch(thunksTasks.addTask(taskToAdd));
      }
    }
    setMethod('');
    setRequest(!setRequest);
  };
  // const handleInputChanges = (e) => {
  //   const { name, value } = e.target;
  //   setAssignedEmployees({
  //     ...assignedEmployee,
  //     [name]: value
  //   });
  //   console.log('data team:', dataTeam);
  // };
  // const deleteFromSelectedEmployees = (id) => {
  //   setAssignedEmployees(assignedEmployee.filter((emp) => emp !== id));
  // };
  // const appendToSelectedEmployees = (id) => {
  //   const previousState = assignedEmployee;
  //   setAssignedEmployees([...previousState, id]);
  // };

  return (
    <div className={styles.container}>
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
              <select {...register('assignedEmployees')} name="assignedEmployees" id="">
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
                type="date"
                {...register('startDate')}
                error={appendErrors.startDate?.message}
              />
              {errors.status && <p className={styles.errorInput}>{errors.startDate?.message}</p>}
            </div>
            <div>
              <label htmlFor="Status">Status</label>
              <input
                type="text"
                placeholder="Status"
                {...register('status')}
                error={appendErrors.status?.message}
              />
              {errors.status && <p className={styles.errorInput}>{errors.status?.message}</p>}
            </div>
            <div className={styles.buttonsContainer}>
              <Button width={'75px'} height={'30px'} type="submit" value="task">
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
              <label htmlFor="employee id">Employee Id</label>
              <select {...register('employeeId')} name="employeeId" id="">
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
            <div>
              <label htmlFor="role">Role</label>
              <select {...register('role')} name="role" id="">
                <option>DEV</option>
                <option>QA</option>
              </select>
              {/* <input
                type="text"
                placeholder="DEV"
                {...register('role')}
                error={appendErrors.role?.message}
              />
              {errors.role && <p className={styles.errorInput}>{errors.role?.message}</p>} */}
            </div>
            <div>
              <label htmlFor="Rate">Rate</label>
              <input
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
              <Button width={'75px'} height={'30px'} type="submit" value="GO">
                {method === 'POST' ? 'ADD' : 'EDIT'}
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}
      <h2>{title}</h2>
      <Modal
        showModal={showModalPM}
        handleClose={() => setShowModalPM(false)}
        modalTitle={'SET PM '}
      >
        <h3>Employees:</h3>
        {dataTeam.map((emp) => (
          <li key={Math.random()}>{emp.employeeId.firstName}</li>
        ))}
      </Modal>
      {roleUser === `ADMIN` ? (
        <button
          disabled={dataTeam.length > 0 ? false : true}
          width={'80px'}
          height={'40px'}
          onClick={() => assignPm()}
        >
          Asignar PM
        </button>
      ) : null}
      {roleUser === `ADMIN` || roleUser === `PM` ? (
        <>
          {filterProject ? (
            <Button
              width={'80px'}
              height={'40px'}
              fontSize={'15px'}
              onClick={() => onAddEmployee()}
            >
              <i className="fa-solid fa-plus"></i>
              ADD EMPLOYEE
            </Button>
          ) : (
            <Button onClick={() => onAddTask()}>ADD TASK</Button>
          )}
        </>
      ) : null}
      <Button onClick={() => switcher()}>BACK</Button>
      <button
        disabled={filterProject ? true : false}
        onClick={() => {
          setTab('employees');
          changeFilter();
        }}
      >
        Employees
      </button>
      <button
        disabled={!filterProject ? true : false}
        onClick={() => {
          setTab('tasks');
          changeFilter();
        }}
      >
        Tasks
      </button>
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
                        onClick={() => {
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
            disabled={indexPage >= data?.length / 10}
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
