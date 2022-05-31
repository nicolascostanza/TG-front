import React from 'react';
import { useState, useEffect } from 'react';

const params = new URLSearchParams(window.location.search);
const timeSheetId = params.get('id');

function EditTimeSheets() {
  useEffect(() => {
    fetch(`http://localhost:8080/time-sheets/${timeSheetId}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        setEmployeeId(response.data.employeeId);
        setDescription(response.data.description);
        setProject(response.data.project);
        setDate(response.data.date);
        setHours(response.data.hours);
        setTask(response.data.task);
        setApproved(response.data.approved);
        setRole(response.data.role);
      });
  }, []);
  const [employeeId, setEmployeeId] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [task, setTask] = useState([]);
  const [approved, setApproved] = useState(false);
  const [role, setRole] = useState('');

  const editTimeSheets = async (timeSheets) => {
    const res = await fetch(`http://localhost:8080/time-sheets/${timeSheetId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(timeSheets)
    });
    const data = await res.json();
    console.log('DATA', data);
    if (res.status === 200) {
      alert('Time-sheet updated successfully');
    } else if (res.status === 400) {
      alert('There was an error updating time-sheet');
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    editTimeSheets({
      employeeId,
      description,
      project,
      date,
      hours,
      task: [task],
      approved,
      role
    });

    setEmployeeId('');
    setDescription('');
    setProject('');
    setDate('');
    setHours('');
    setTask([]);
    setApproved(false);
    setRole('');
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2> Edit Time-Sheet </h2>
      </div>
      <div>
        <label> Employee ID </label>
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </div>
      <div>
        <label> Description </label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label> Project </label>
        <input
          type="text"
          placeholder="Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <div>
        <label> Date </label>
        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label> Hours </label>
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </div>
      <div>
        <label> Task </label>
        <input
          type="text"
          placeholder="Task"
          value={task._id}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div>
        <label> Approved </label>
        <input
          type="checkbox"
          // checked={approved}
          value={approved}
          onChange={(e) => setApproved(e.target.value)}
        />
      </div>
      <div>
        <label> Role </label>
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <input type="submit" value="Edit Time-Sheet" />
    </form>
  );
}

export default EditTimeSheets;
