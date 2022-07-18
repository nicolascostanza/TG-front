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

function AssignPm({ showModalPM, closeModalPM, allEmployees, idProject }) {
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
  const onSubmit = (data) => {
    const employeePm = {
      employeeId: data.employeeId,
      role: 'PM',
      rate: data.rate,
      isPM: true
    };
    dispatch(thunksProjects.addEmployeeToProject(employeePm, idProject));
  };
  if (!showModalPM) {
    return null;
  }
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <p>Add PM</p>
          <i className="fa-solid fa-xmark" onClick={() => closeModalPM()}></i>
        </div>
        <div className={styles.modalBody}>
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
            <div className={styles.buttonsContainer}>
              <Button width={'75px'} height={'30px'} type="submit" value="GO">
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
