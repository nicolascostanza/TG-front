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
import { Button, Box, ButtonGroup } from '@mui/material';
// import { useForm } from 'react-hook-form';

function TimeSheet() {
  // const { register, reset } = useForm({
  // const { register } = useForm({
  //   mode: 'onChange'
  // });
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  // let role = useSelector((state) => state.auth.authenticated.role);
  let role = 'PM';
  // let role = 'EMPLOYEE';
  const [showAllTimesheets, setShowAllTimesheets] = useState(true);
  const [showPendingTS, setShowPendingTS] = useState(false);
  const dispatch = useDispatch();
  const timeSheets = useSelector((state) => state.timesheet.list);
  const isFetching = useSelector((state) => state.timesheet.isFetching);
  const [editId, setEditId] = useState('');
  const showCreateModal = useSelector((state) => state.timesheet.showCreateModal);
  const showEditModal = useSelector((state) => state.timesheet.showEditModal);
  const [selectedTS, setSelectedTS] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  // const authRole = () => {
  //   role = useSelector((state) => state.auth.authenticated.role);
  // }
  useEffect(() => {
    if (showAllTimesheets === true) {
      dispatch(thunks.getTimesheets());
    } else {
      dispatch(thunks.getEmployeeTimesheets(currentUser._id));
    }
    dispatch(tasksThunks.getTasks());
    // reset({
    //   approved: timeSheets.approved
    // });
  }, [timeSheets.length, showAllTimesheets]);
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
    console.log('openEditTimeSheet ', id);
    setEditId(id);
    dispatch(actions.showEditModal());
  };
  const handleClose = () => {
    dispatch(actions.closeModals());
  };
  let formattedTimeSheets = [];
  if (showPendingTS) {
    formattedTimeSheets = timeSheets
      .map((timeSheet) => {
        return {
          _id: timeSheet._id,
          employeeId: `${timeSheet.employeeId.firstName} ${timeSheet.employeeId.lastName}`,
          projectId: timeSheet.projectId.name,
          date: timeSheet.date ? new Date(timeSheet.date).toISOString().split('T')[0] : '',
          taskId: timeSheet.taskId?.taskName,
          hours: timeSheet.hours,
          status: timeSheet.approved ? 'Approved' : 'Disapoproved',
          isDeleted: false,
          approveSlider: timeSheet.approved ? true : false,
          approved: timeSheet.approved
        };
      })
      .filter((item) => !item.approved);
  } else {
    formattedTimeSheets = timeSheets.map((timeSheet) => {
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
  }
  formattedTimeSheets.reverse();
  const statusChanger = async (status, id) => {
    dispatch(
      thunks.editTimesheet(
        {
          approved: status.status === 'Approved' ? false : true
        },
        id
      )
    );
  };
  // const approveTimesheet = (data, id) => {
  //   statusChanger();
  //   // console.log('slider ', id);
  //   // console.log('sliderrrr ', timeSheets);
  //   // console.log('value ', timeSheets.id.value);
  //   // dispatch(thunks.editTimesheet(newBody, id));
  //   // setEditId(id);
  //   // console.log(editId);
  //   console.log('data slider', data);
  //   console.log('id sliderrr', id);
  // };
  // console.log(approveTimesheet);
  const showMyTS = () => {
    setShowAllTimesheets(false);
    setShowPendingTS(false);
    setSelectedButton(1);
  };
  const showTSToApprove = () => {
    setShowAllTimesheets(true);
    setShowPendingTS(true);
    setSelectedButton(2);
  };
  const showAllTS = () => {
    setShowAllTimesheets(true);
    setShowPendingTS(false);
    setSelectedButton(3);
  };
  const selectTS = (id) => {
    setSelectedTS([...selectedTS, id]);
    console.log('selectedTS ', selectedTS);
  };
  console.log(selectedButton);
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
        <ButtonGroup>
          <Box>
            <Button
              variant={selectedButton === 1 ? 'contained' : 'outlined'}
              onClick={() => showMyTS()}
            >
              My timesheets
            </Button>
            <Button
              variant={selectedButton === 2 ? 'contained' : 'outlined'}
              onClick={() => showTSToApprove()}
            >
              Timesheets to approve
            </Button>
            <Button
              variant={selectedButton === 3 ? 'contained' : 'outlined'}
              onClick={() => showAllTS()}
            >
              All timesheets
            </Button>
          </Box>
        </ButtonGroup>
      )}
      <EmployeeTimesheetTable
        title={role}
        headers={[
          '',
          'EMPLOYEE',
          'Project',
          'Start date',
          'Task',
          'Hours',
          'Status',
          'Edit',
          'Delete'
        ]}
        keys={['employeeId', 'projectId', 'date', 'taskId', 'hours', 'status']}
        data={formattedTimeSheets}
        role={role}
        onEdit={openEditTimeSheet}
        onAdd={openAddTimeSheet}
        onDelete={deleteTimeSheet}
        onApprove={statusChanger}
        onSelect={selectTS}
        // register={register}
        // registerValue={'approved'}
        // isChecked={}
      />
    </>
  );
}
export default TimeSheet;
