import { useEffect, useState } from 'react';
import AddTimeSheets from '../Add';
// import Table from 'Components/Shared/Table';
import EditTimeSheets from '../Edit';
import Sidebar from 'Components/Shared/Sidebar';
import Loader from 'Components/Shared/Loader';
import * as thunks from 'redux/timesheets/thunks';
import * as actions from 'redux/timesheets/actions';
import * as tasksThunks from 'redux/tasks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeTimesheetTable from 'Components/Shared/EmployeeTimesheetTable';

function TimeSheet() {
  // Esto de aca es el filtro por rol, como no hay un pm
  // const role = useSelector((state) => state.auth.authenticated?.role);
  // role && console.log('role: ', role);
  // let role = 'PM';
  let role = 'EMPLOYEE';
  const dispatch = useDispatch();
  const timeSheets = useSelector((state) => state.timesheet.list);
  const isFetching = useSelector((state) => state.timesheet.isFetching);
  const [editId, setEditId] = useState('');
  const showCreateModal = useSelector((state) => state.timesheet.showCreateModal);
  const showEditModal = useSelector((state) => state.timesheet.showEditModal);

  // const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    dispatch(thunks.getTimesheets());
    dispatch(tasksThunks.getTasks());
  }, []);
  const allTasks = useSelector((state) => state.tasks.list);
  const deleteTimeSheet = (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      dispatch(thunks.deleteTimesheets(id));
    }
  };
  const openAddTimeSheet = () => {
    dispatch(actions.showCreateModal());
  };
  const openEditTimeSheet = (id) => {
    setEditId(id);
    dispatch(actions.showEditModal());
  };
  const handleClose = () => {
    dispatch(actions.closeModals());
  };
  // const formattedTimeSheets = timeSheets.map((timeSheet) => {
  console.log('esttt', timeSheets);
  const formattedTimeSheets = timeSheets.map((timeSheet) => {
    // console.log(timeSheet.task.length);
    return {
      ...timeSheet,
      _id: timeSheet._id,
      // employeeId: (timeSheet.employeeId.firstName, timeSheet.employeeId.lastName),
      employeeId: timeSheet.employeeId.firstName.concat(' ', timeSheet.employeeId.lastName),
      projectId: timeSheet.project,
      date: timeSheet.date ? new Date(timeSheet.date).toDateString() : '',
      // task_name: timeSheet.task.length
      //   ? timeSheet.task.map((task) => task.taskName).join(' - ')
      //   : '-',projectIdhours
      // task_name: timeSheet.task ? timeSheet.task.map((task) => task.taskName).join(' - ') : '-',
      task_name: timeSheet.task,
      hours: timeSheet.hours,
      approved: timeSheet.approved ? 'Approved' : 'Disapoproved'
      // role: timeSheet.role
    };
  });

  return (
    <>
      <Loader isLoading={isFetching} />
      <Sidebar />
      <EditTimeSheets
        showEditModal={showEditModal}
        handleClose={handleClose}
        editId={editId}
        allTasks={allTasks}
      />
      <AddTimeSheets
        showCreateModal={showCreateModal}
        handleClose={handleClose}
        allTasks={allTasks}
      ></AddTimeSheets>
      {/* <button onClick={setShowAddTaskModal(true)}>Add task</button> */}
      {/* {role === 'PM' ? (
        <Table
          title="Timesheets"
          headers={['employeeId', 'projectId', 'date', 'task_name', 'hours', 'approved']}
          // headers={['employeeId', 'projectId', 'date', 'task_name', 'approved']}
          data={formattedTimeSheets}
          onEdit={openEditTimeSheet}
          onDelete={deleteTimeSheet}
          onAdd={openAddTimeSheet}
        />
      ) : ( */}
      <EmployeeTimesheetTable
        title={role}
        // headers={['Name', 'Project', 'Date', 'Task', 'Hours', 'Approved', 'Role']}
        headers={['EMPLOYEE', 'Project', 'Start date', 'Task', 'Hours', 'Status', 'Edit', 'Delete']}
        keys={['employeeId', 'projectId', 'date', 'task_name', 'hours', 'approved']}
        data={formattedTimeSheets}
        role={role}
        onEdit={openEditTimeSheet}
        onAdd={openAddTimeSheet}
        onDelete={deleteTimeSheet}
        // switcher={}
        // selectedProject={}
      />
      {/* )} */}
    </>
  );
}
export default TimeSheet;
