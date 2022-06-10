import styles from './tasks.module.css';
import Sidebar from '../Shared/Sidebar';
import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import Form from '../Shared/Form';
import AddTask from './AddTask';

const URL = `${process.env.REACT_APP_API_URL}/tasks`;

function Tasks() {
  const [showModal, setShowModal] = useState(false);
  const [parentProject, setParentProject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [status, setStatus] = useState('');
  const [tasks, setTask] = useState([]);
  const [editedId, setEditedId] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const openAddTask = () => {
    setShowAddModal(true);
  };
  const handleClose = () => {
    setShowAddModal(false);
    setShowModal(false);
  };

  const headers = [
    '_id',
    'parentProject',
    'taskCreatorId',
    'taskName',
    'taskDescription',
    'assignedEmployee',
    'startDate',
    'status',
    'createdAt',
    'updatedAt'
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((response) => {
        setTask(response.data);
        console.log(response.data);
      })
      .catch((err) => console.err(err));
  }, []);

  const onEdit = (id) => {
    setShowModal(true);
    fetch(`${URL}/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setEditedId(id);
        setParentProject(response.data.parentProject._id);
        setTaskName(response.data.taskName);
        setTaskDescription(response.data.taskDescription);
        setAssignedEmployee(response.data.assignedEmployee);
        setStartDate(response.data.startDate);
        setStatus(response.data.status);
        console.log('data:', response.data);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTask({
      parentProject: parentProject,
      taskName,
      taskDescription,
      assignedEmployee: assignedEmployee,
      startDate,
      status
    });

    setParentProject('');
    setTaskName('');
    setTaskDescription('');
    setAssignedEmployee([]);
    setStartDate('');
    setStatus('');

    console.log(tasks);
  };

  const editTask = async (task) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${editedId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    console.log(editedId);
    await res.json();

    if (res.status === 200) {
      alert('Task updated successfully');
      handleClose();
    } else if (res.status === 400) {
      alert('Something went wrong');
    }
  };

  const deleteTask = async (id) => {
    const resp = confirm('Are you sure you want to delete this task?');
    if (resp) {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      setTask(tasks.filter((task) => task._id !== id));
    }
  };

  return (
    <section className={styles.container}>
      <section className={styles.sidebar}>
        <Sidebar>
          <h2>What to do</h2>
          <ul>
            <li>Side Tasks</li>
            <li>Schedule</li>
            <li>Monthly report</li>
          </ul>
        </Sidebar>
      </section>
      <section className={styles.container}>
        <Table
          title={'Tasks'}
          data={tasks}
          headers={headers}
          onDelete={deleteTask}
          onEdit={onEdit}
          onAdd={openAddTask}
        />
      </section>
      <AddTask showAddModal={showAddModal} handleClose={handleClose} handleSubmit={onSubmit} />
      <Form showModal={showModal} handleClose={handleClose} handleSubmit={onSubmit}>
        <div>
          <h2>Edit Task</h2>
        </div>
        <div className={styles.form}>
          <div>
            <label>Parent Project:</label>
            <input
              type="text"
              placeholder="Parent Project ID"
              value={parentProject}
              onChange={(e) => setParentProject(e.target.value)}
            />
          </div>
          <div>
            <label>Task Name:</label>
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div>
            <label>Task Description:</label>
            <input
              type="text"
              placeholder="Task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Assigned Employee:</label>
            <input
              type="text"
              placeholder="Assigned Employee ID"
              value={assignedEmployee && assignedEmployee[0] ? assignedEmployee[0]._id : ''}
              onChange={(e) => setAssignedEmployee(e.target.value)}
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={styles.dropdown}>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Ready to deliver">Ready to deliver</option>
              <option value="Paused">Paused</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Form>
    </section>
  );
}

export default Tasks;
