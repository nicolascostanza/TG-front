import React from 'react';
// import { useState } from 'react';
import styles from 'Components/Shared/Modal/modal.module.css';
import Button from '../Button/index.jsx';
// import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { appendErrors, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { validationsAssignPm } from 'Components/Home/validations';
import * as thunksProjects from 'redux/projects/thunks';
// import * as thunksTasks from 'redux/tasks/thunks';
// import * as thunksEmployees from 'redux/employees/thunks';
// import { useSelector } from 'react-redux';

function AssignPm({ showModalPM, closeModalPM, employeesInProject, idProject, projectAssociated }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors }
    // reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validationsAssignPm)
  });
  console.log('proy asociado:', projectAssociated);
  let currentPm = employeesInProject.filter((employ) => employ.isPM === true);
  const onSubmit = (data) => {
    // si hay current pm le cambio el role, sino solo edito el q pide a pm
    if (currentPm.length != 0) {
      const current = {
        employeeId: currentPm[0].employeeId._id,
        // a cambiar el role por -
        role: 'DEV',
        rate: currentPm[0].rate,
        isPM: false
      };
      fetch(`${process.env.REACT_APP_API_URL}/projects/${idProject}/edit/employee`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(current)
      });
    }
    const newPm = {
      employeeId: data.employeeId,
      role: 'PM',
      rate: data.rate,
      isPM: true
    };
    // fetch(`${process.env.REACT_APP_API_URL}/projects/${idProject}/edit/employee`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(newPm)
    // });
    // let respuestaProject = state.list.filter((project) => project._id === action.payload.idProject);
    // console.log('proyecto elegido:', respuestaProject[0]);
    let modifiedTeam = projectAssociated[0].team.map((employee) =>
      employee._id == newPm.employeeId ? newPm : employee
    );
    console.log('TEAM MODIFICADO:', modifiedTeam);
    const modifiedProject = {
      clientName: projectAssociated[0].clientName,
      description: projectAssociated[0].description,
      endDate: projectAssociated[0].endDate,
      isDeleted: projectAssociated[0].isDeleted,
      name: projectAssociated[0].name,
      projectManager: projectAssociated[0].projectManager,
      startDate: projectAssociated[0].startDate,
      tasks: projectAssociated[0].tasks,
      team: modifiedTeam,
      updatedAt: projectAssociated[0].updatedAt
    };
    console.log('project modificado ???', modifiedProject);
    dispatch(thunksProjects.updateEmployeeToProject(idProject, newPm, modifiedProject));
  };
  if (!showModalPM) {
    return null;
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <p>ASSIGN PM</p>
          <i className="fa-solid fa-xmark" onClick={() => closeModalPM()}></i>
        </div>
        <h2>
          Current PM:
          {currentPm[0]
            ? ` ${currentPm[0].employeeId.firstName} ${currentPm[0].employeeId.lastName}`
            : ' Empty'}
        </h2>
        <div className={styles.modalBody}>
          <form className={styles.formHome} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="employee id">Employee</label>
              <select id="employeeIdToPM" {...register('employeeId')} name="employeeId">
                {employeesInProject.map((member) => (
                  <option
                    value={member.employeeId._id}
                    key={member.employeeId._id}
                  >{`${member.employeeId.firstName} ${member.employeeId.lastName}`}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="Rate">Rate</label>
              <input
                id="ratePm"
                type="number"
                placeholder="500"
                {...register('rate')}
                error={appendErrors.rate?.message}
              />
              {errors.rate && <p className={styles.errorInput}>{errors.rate?.message}</p>}
            </div>
            <div className={styles.buttonsContainer}>
              <Button id="assingPmModal" width={'75px'} height={'30px'} type="submit" value="GO">
                ASSIGN PM
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AssignPm;
