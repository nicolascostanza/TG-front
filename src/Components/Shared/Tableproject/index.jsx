import React from 'react';
import { useState, useEffect } from 'react';
import styles from './table.module.css';
import Button from '../Button/index.jsx';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { validationsFormAddEmployee, validationsFormAddTask } from 'Components/Home/validations';
import * as thunksProjects from 'redux/projects/thunks';

// BORRAR EL OPENTIMESHEET NO SIRVE MAS
function Tableproject({ title, dataTeam, dataTasks, roleUser, onDelete, switcher, idProject }) {
  const [tab, setTab] = useState('employees');
  const [filterProject, setFilterProject] = useState(true);
  const [indexPage, setIndexPage] = useState(1);
  const [showModalEmployee, setShowModalEmployee] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  // const [assignedEmployee, setAssignedEmployees] = useState([]);
  // const [task, setTask] = useState({});
  const dispatch = useDispatch();
  // const allEmployees = useSelector((state) => state.employees.list);
  // let isLoading = useSelector((state) => state.projects.isFetching);
  let projectsList = useSelector((state) => state.projects.list);
  // let projectsError = useSelector((state) => state.projects.error);
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
  // const addTask = () => {
  //   console.log('aca agrego la tasks si es employee o admin');
  // };
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(tab === 'employees' ? validationsFormAddEmployee : validationsFormAddTask)
  });
  const onSubmit = (data) => {
    if (tab === 'employees') {
      const selectedProject = projectsList.filter((project) => project._id === idProject);
      selectedProject[0].team.push(data);
      console.log('para enviar: ', selectedProject[0]);
      console.log('employee en cero:', selectedProject[0].team[0].employeeId);
      dispatch(thunksProjects.updateProject(selectedProject[0], idProject));
    } else {
      console.log('data tasks: ', data);
    }
  };
  // const handleInputChanges = (e) => {
  //   const { name, value } = e.target;
  //   setTask({
  //     ...assignedEmployee,
  //     [name]: value
  //   });
  // };
  // const deleteFromSelectedEmployees = (id) => {
  //   setAssignedEmployees(assignedEmployee.filter((emp) => emp !== id));
  // };
  // const appendToSelectedEmployees = (id) => {
  //   const previousState = assignedEmployee;
  //   setAssignedEmployees([...previousState, id]);
  //   setTask({ ...task, assignedEmployee: '' });
  // };
  return (
    <div className={styles.container}>
      <Modal
        showModal={showModalTask}
        handleClose={() => setShowModalTask(false)}
        modalTitle={'ADD TASK'}
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
            <input
              // value={assignedEmployee}
              // onChange={handleInputChanges}
              name="employees"
              type="text"
              placeholder="Search an employee"
              className={styles.input}
            />
          </div>
          {/* <input
              value={assignedEmployee}
              onChange={handleInputChanges}
              name="employees"
              type="text"
              placeholder="Search an employee"
              className={styles.input}
            />
            <div className={styles.optionContainer}>
              {assignedEmployee.length > 0
                ? dataTeam
                    .filter(
                      (employee) =>
                        employee.firstName.match(new RegExp(assignedEmployee, 'i')) ||
                        employee.lastName.match(new RegExp(assignedEmployee, 'i'))
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
                        {allEmployees.find((emp) => emp._id === member).firstName} (
                        {allEmployees.find((emp) => emp._id === member).email})
                      </p>
                    );
                  })}
            </div>
          </div> */}
          <div>
            <label htmlFor="Status">Status</label>
            <input type="text" placeholder="Status" />
          </div>
          <div className={styles.buttonsContainer}>
            <Button width={'75px'} height={'30px'} type="submit" value="task">
              ADD TASK
            </Button>
          </div>
        </form>
      </Modal>
      {/* modal add employee */}
      <Modal
        showModal={showModalEmployee}
        handleClose={() => setShowModalEmployee(false)}
        modalTitle={'ADD EMPLOYEE'}
      >
        <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="employee id">Employee Id</label>
            <input
              type="text"
              placeholder="Employee Id"
              {...register('employeeId')}
              error={appendErrors.employeeId?.message}
            />
            {errors.employeeId && <p className={styles.errorInput}>{errors.employeeId?.message}</p>}
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <input
              type="text"
              placeholder="DEV"
              {...register('role')}
              error={appendErrors.role?.message}
            />
            {errors.role && <p className={styles.errorInput}>{errors.role?.message}</p>}
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
          <div className={styles.checkbox}>
            <label htmlFor="isPm">Is PM ?</label>
            <input
              className={styles.inputsProfile}
              type="checkbox"
              name="isPm"
              {...register('isPm')}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button width={'75px'} height={'30px'} type="submit" value="GO">
              ADD EMPLOYEE
            </Button>
          </div>
        </form>
      </Modal>
      <h2>{title}</h2>
      {roleUser === `ADMIN` ? (
        <Button width={'80px'} height={'40px'} onClick={() => assignPm()}>
          Asignar PM
        </Button>
      ) : null}
      {roleUser === `ADMIN` || roleUser === `PM` ? (
        <>
          {filterProject ? (
            <Button
              width={'80px'}
              height={'40px'}
              fontSize={'15px'}
              onClick={() => setShowModalEmployee(true)}
            >
              <i className="fa-solid fa-plus"></i>
              ADD EMPLOYEE
            </Button>
          ) : (
            <Button onClick={() => setShowModalTask(true)}>ADD TASK</Button>
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
                        onClick={() => onDelete(row._id)}
                        width={'50px'}
                        height={'25px'}
                        fontSize={'13px'}
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
