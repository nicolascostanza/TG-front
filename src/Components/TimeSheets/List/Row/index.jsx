import React from 'react';

const params = new URLSearchParams(window.location.search);
const timeSheetId = params.get('id');

function Row(props) {
  const {
    _id: id,
    employeeId,
    description,
    project,
    date,
    task,
    hours,
    approved,
    role
  } = props.timeSheet;
  return (
    <tr id={id} className={StyleSheet.row}>
      <td>{id}</td>
      <td>{employeeId ? employeeId._id : 'No id'}</td>
      <td>{description}</td>
      <td>{project}</td>
      <td>{date}</td>
      <td>{task.taskName}</td>
      <td>{hours}</td>
      <td>{approved ? 'Approved' : 'No approved'}</td>
      <td>{role}</td>
      <td>
        <i
          className="fa-solid fa-xmark"
          onClick={() => {
            props.deleteTimeSheet(id);
          }}
        ></i>
      </td>
      <td>
        <a href={`http://localhost:8080/time-sheets/${timeSheetId}`}>
          <button>Edit</button>
        </a>
      </td>
    </tr>
  );
}

export default Row;
