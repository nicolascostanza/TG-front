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

function AssignPm({ showModalPM, closeModalPM, employeesInProject, idProject }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(validationsAssignPm)
  });
  let currentPm = employeesInProject.filter((employ) => employ.isPM === true);
  const onSubmit = (data) => {
    if (currentPm.length != 0) {
      // ACA EN ROLE DEBERIA IR EL GUION
      let current = {
        employeeId: currentPm[0].employeeId._id,
        role: '-',
        rate: currentPm[0].rate,
        isPM: false
      };
      dispatch(thunksProjects.updateEmployeeToProject(idProject, current));
    }
    // el nuevo pm lo cambia biennn
    const newPm = {
      employeeId: data.employeeId,
      role: 'PM',
      rate: data.rate,
      isPM: true
    };
    dispatch(thunksProjects.updateEmployeeToProject(idProject, newPm));
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
