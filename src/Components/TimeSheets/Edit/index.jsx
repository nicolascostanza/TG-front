import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../Add/Form.module.css';
import Form from 'Components/Shared/Form';
import * as thunks from 'redux/timesheets/thunks';
import { useDispatch, useSelector } from 'react-redux';

function EditTimeSheets(props) {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${props.editId}`)
      .then((response) => response.json())
      .then((response) => {
        setEmployeeId(response.data.employeeId ? response.data.employeeId._id : '');
        setDescription(response.data.description);
        setProject(response.data.project);
        setDate(new Date(response.data.date).toISOString().split('T')[0] || '');
        setHours(response.data.hours);
        setSelectedTasks(response.data.task.map((item) => item._id));
        setApproved(response.data.approved);
        setRole(response.data.role);
      });
  }, [props.editId]);
  const allTasks = useSelector((state) => state.tasks.list);
  const [employeeId, setEmployeeId] = useState({});
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [tasks, setTasks] = useState('');
  const [approved, setApproved] = useState(false);
  const [role, setRole] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const dispatch = useDispatch();
  const { showEditModal, handleClose } = props;

  // useEffect(() => {
  //   setSelectedTasks([...tasks.map((task) => task._id)]);
  // }, []);

  const appendToSelectedTasks = (id) => {
    const previousState = selectedTasks;
    setSelectedTasks([...previousState, id]);
    setTasks('');
  };

  const deleteFromSelectedTasks = (id) => {
    setSelectedTasks(selectedTasks.filter((task) => task !== id));
  };

  const editTimeSheets = async (newBody, id) => {
    dispatch(thunks.editTimesheet(newBody, id));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    editTimeSheets(
      {
        employeeId,
        description,
        project,
        date: new Date(date).toISOString().split('T')[0] || '',
        // date,
        hours,
        task: selectedTasks,
        approved,
        role
      },
      props.editId
    );
  };

  return (
    <section>
      <Form showModal={showEditModal} handleClose={handleClose} handleSubmit={onSubmit}>
        <div className={styles.tittle}>
          <h2> Edit Time-Sheet </h2>
        </div>
        <div className={styles.container}>
          <div>
            <label> Employee ID </label>
            <input
              type="text"
              placeholder="employeeId"
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
              type="date"
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
            <label> Tasks </label>
            <input
              type="text"
              placeholder="Task"
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
            />
            <div>
              {tasks.length > 0
                ? allTasks
                    .filter(
                      (task) =>
                        task.taskName.match(new RegExp(tasks, 'i')) ||
                        task.taskDescription.match(new RegExp(tasks, 'i'))
                    )
                    .map((task) => {
                      return (
                        <p
                          key={task._id}
                          onClick={() =>
                            selectedTasks.find((item) => item === task._id)
                              ? deleteFromSelectedTasks(task._id)
                              : appendToSelectedTasks(task._id)
                          }
                          className={
                            selectedTasks.find((item) => item === task._id)
                              ? styles.selectedItem
                              : styles.notSelectedItem
                          }
                        >
                          {task.taskName}: {task.taskDescription}
                        </p>
                      );
                    })
                : selectedTasks.map((task) => {
                    return (
                      <p
                        key={task}
                        className={styles.chip}
                        onClick={() => deleteFromSelectedTasks(task)}
                      >
                        {allTasks.find((item) => item._id === task).taskName}:{' '}
                        {allTasks.find((item) => item._id === task).taskDescription}
                      </p>
                    );
                  })}
            </div>
          </div>
          <div>
            <label> Approved </label>
            <input
              type="checkbox"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
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
        </div>
      </Form>
    </section>
  );
}

export default EditTimeSheets;
