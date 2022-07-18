import { useEffect, useState } from 'react';
import AddTimeSheets from '../Add';
import EditTimeSheets from '../Edit';
import Sidebar from 'Components/Shared/Sidebar';
import Loader from 'Components/Shared/Loader';
import * as thunks from 'redux/timesheets/thunks';
import * as actions from 'redux/timesheets/actions';
import * as tasksThunks from 'redux/tasks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeTimesheetTable from 'Components/Shared/EmployeeTimesheetTable';
import { Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

function TimeSheet() {
  // const { register, reset } = useForm({
  const { register } = useForm({
    mode: 'onChange'
  });
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  // let role = useSelector((state) => state.auth.authenticated.role);
  let role = 'PM';
  // let role = 'EMPLOYEE';
  const [showAllTimesheets, setShowAllTimesheets] = useState(true);
  const dispatch = useDispatch();
  const timeSheets = useSelector((state) => state.timesheet.list);
  const isFetching = useSelector((state) => state.timesheet.isFetching);
  const [editId, setEditId] = useState('');
  const showCreateModal = useSelector((state) => state.timesheet.showCreateModal);
  const showEditModal = useSelector((state) => state.timesheet.showEditModal);
  // const authRole = () => {
  //   role = useSelector((state) => state.auth.authenticated.role);
  // }
  useEffect(() => {
    if (showAllTimesheets === true) {
      dispatch(thunks.getEmployeeTimesheets(currentUser._id));
    } else {
      dispatch(thunks.getTimesheets());
    }
    dispatch(tasksThunks.getTasks());
    // reset({
    //   approved: timeSheets.approved
    // });
  }, [timeSheets.length, showAllTimesheets]);
  console.log('esteeee ', timeSheets);
  const allTasks = useSelector((state) => state.tasks.list);
  const deleteTimeSheet = (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    console.log(id);
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
  const formattedTimeSheets = timeSheets.map((timeSheet) => {
    return {
      _id: timeSheet._id,
      employeeId: `${timeSheet.employeeId.firstName} ${timeSheet.employeeId.lastName}`,
      projectId: timeSheet.projectId.name,
      date: timeSheet.date ? new Date(timeSheet.date).toISOString().split('T')[0] : '',
      taskId: timeSheet.taskId?.taskName,
      hours: timeSheet.hours,
      status: timeSheet.approved ? 'Approved' : 'Disapoproved',
      isDeleted: false,
      approveSlider: timeSheet.approved ? true : false
    };
  });
  formattedTimeSheets.reverse();
  const approveTimesheet = (id) => {
    console.log('slider ', id);
    console.log('sliderrrr ', timeSheets);
    console.log('value ', timeSheets.id.value);
    // dispatch(thunks.editTimesheet(newBody, id));
    // setEditId(id);
    // console.log(editId);
  };

  return (
    <>
      <Loader isLoading={isFetching} />
      <Sidebar />
      <EditTimeSheets
        showEditModal={showEditModal}
        handleClose={handleClose}
        editId={editId}
        allTasks={allTasks}
        role={role}
        currentUser={currentUser}
      />
      <AddTimeSheets
        showCreateModal={showCreateModal}
        handleClose={handleClose}
        allTasks={allTasks}
        role={role}
        currentUser={currentUser}
      ></AddTimeSheets>
      {role === 'PM' && (
        <Box>
          <Button onClick={() => setShowAllTimesheets(true)}>My timesheets</Button>
          {/* <Button>Timesheets to approve</Button> */}
          <Button onClick={() => setShowAllTimesheets(false)}>All timesheets</Button>
        </Box>
      )}
      <EmployeeTimesheetTable
        title={role}
        headers={['EMPLOYEE', 'Project', 'Start date', 'Task', 'Hours', 'Status', 'Edit', 'Delete']}
        keys={['employeeId', 'projectId', 'date', 'taskId', 'hours', 'status']}
        data={formattedTimeSheets}
        role={role}
        onEdit={openEditTimeSheet}
        onAdd={openAddTimeSheet}
        onDelete={deleteTimeSheet}
        onApprove={approveTimesheet}
        register={register}
        registerValue={'approved'}
        // isChecked={}
      />
    </>
  );
}
export default TimeSheet;
