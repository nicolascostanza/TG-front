import { useEffect, useState } from 'react';
import styles from '../List/list.module.css';
import AddTimeSheets from '../Add';
import Table from '../../Shared/Table';
import EditTimeSheets from '../Edit';
import Sidebar from '../../Shared/Sidebar';
import * as thunks from '../../../redux/timesheets/thunks';
import * as actions from '../../../redux/timesheets/actions';
import { useDispatch, useSelector } from 'react-redux';

function TimeSheet() {
  const dispatch = useDispatch();
  const timeSheets = useSelector((state) => state.timesheet.list);
  const isFetching = useSelector((state) => state.timesheet.isFetching);
  const showCreateModal = useSelector((state) => state.timesheet.showCreateModal);
  const showEditModal = useSelector((state) => state.timesheet.showEditModal);
  const openEditTimeSheet = (id) => {
    setEditId(id);
    dispatch(actions.showEditModal());
  };
  // const [timeSheets, setTimeSheets] = useState([]);
  // const [tasks, setTasks] = useState([]);
  // const [employees, setEmployees] = useState([]);
  const openAddTimeSheet = () => {
    dispatch(actions.showCreateModal());
  };
  const [editId, setEditId] = useState('');
  const handleClose = () => {
    dispatch(actions.closeModals());
  };
  // const [newTimeSheets, setNewTimeSheets] = useState('');
  // if (editId !== '') {
  //   const newTimesheets = timeSheets.filter((item) => item._id === editId);
  // }
  useEffect(() => {
    dispatch(thunks.getTimesheets());
    // fetchTasks();
    // fetchEmployees();
  }, []);
  // const fetchTasks = () => {
  //   fetch(`${process.env.REACT_APP_API_URL}/tasks`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setTasks(response.data);
  //     })
  //     .catch((err) => console.err(err));
  // };
  // const fetchEmployees = () => {
  //   fetch(`${process.env.REACT_APP_API_URL}/employees`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       response.data.map((employee) => {
  //         employee.active = employee.active ? 'true' : 'false';
  //       });
  //       setEmployees(response.data);
  //     });
  // };
  const deleteTimeSheet = (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      dispatch(thunks.deleteTimesheets(id));
    }
  };
  if (isFetching) {
    return <h2>Fetching</h2>;
  }
  const formattedTimeSheets = timeSheets.map((timeSheet) => {
    return {
      ...timeSheet,
      _id: timeSheet._id,
      employeeId: timeSheet.employeeId._id,
      description: timeSheet.description,
      project: timeSheet.project,
      date: timeSheet.date ? new Date(timeSheet.date).toDateString() : '',
      task_name: timeSheet.task.length
        ? timeSheet.task.map((task) => task.taskName).join(' - ')
        : '-',
      hours: timeSheet.hours,
      approved: timeSheet.approved ? 'Approved' : 'Disapoproved',
      role: timeSheet.role
    };
  });
  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
      <EditTimeSheets
        showEditModal={showEditModal}
        handleClose={handleClose}
        editId={editId}
        // newTimesheets={newTimesheets}
      />
      <AddTimeSheets showCreateModal={showCreateModal} handleClose={handleClose}></AddTimeSheets>
      <Table
        title="Timesheets"
        headers={[
          '_id',
          'employeeId',
          'description',
          'project',
          'date',
          'task_name',
          'hours',
          'approved',
          'role'
        ]}
        data={formattedTimeSheets}
        onEdit={openEditTimeSheet}
        onDelete={deleteTimeSheet}
        onAdd={openAddTimeSheet}
      />
    </div>
  );
}
export default TimeSheet;
