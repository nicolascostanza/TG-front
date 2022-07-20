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
import { Button, Box, ButtonGroup, Modal, Typography } from '@mui/material';
// import { useForm } from 'react-hook-form';

function TimeSheet() {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  // const { register, reset } = useForm({
  // const { register } = useForm({
  //   mode: 'onChange'
  // });

  // const role = 'PM';
  const role = 'EMPLOYEE';

  const dispatch = useDispatch();
  const [showAllTimesheets, setShowAllTimesheets] = useState(false);
  const [showPendingTS, setShowPendingTS] = useState(false);
  const [editId, setEditId] = useState('');
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [showDeletedModalMessage, setShowDeletedModalMessage] = useState('');
  const [selectedTS, setSelectedTS] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const timeSheets = useSelector((state) => state.timesheet.list);
  const isFetching = useSelector((state) => state.timesheet.isFetching);
  const isError = useSelector((state) => state.timesheet.error);
  const showCreateModal = useSelector((state) => state.timesheet.showCreateModal);
  const showEditModal = useSelector((state) => state.timesheet.showEditModal);
  // let role = useSelector((state) => state.auth.authenticated.role);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  // const [tableHeaders, setTableHeaders] = useState([]);
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

  const deleteMoreThan1TS = (id) => {
    dispatch(thunks.deleteTimesheets(id));
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
          status: timeSheet.approved ? 'Approved' : 'Disapproved',
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
        projectId: timeSheet.projectId?.name,
        date: timeSheet.date ? new Date(timeSheet.date).toISOString().split('T')[0] : '',
        taskId: timeSheet.taskId?.taskName,
        hours: timeSheet.hours,
        status: timeSheet.approved ? 'Approved' : 'Disapproved',
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
    const selectedAux = selectedTS.includes(id)
      ? selectedTS.filter((item) => item != id)
      : [...selectedTS, id];
    setSelectedTS(selectedAux);
    console.log('selectedTS ', selectedTS);
  };

  const deleteSelectedTSAction = () => {
    console.log('delete ', selectedTS);
    const resp = confirm(`Are you sure you want to delete ${selectedTS.length} timsheets?`);
    if (resp) {
      for (let i = 0; i < selectedTS.length; i++) {
        deleteMoreThan1TS(selectedTS[i]);
      }
      if (!isError) {
        setShowDeletedModal(true);
        setShowDeletedModalMessage(`${selectedTS.length} timesheets has been deleted!`);
        setSelectedTS([]);
      }
    } else {
      // setSelectedTS([]);
    }
  };

  const handleCloseMessage = () => {
    setShowDeletedModal(false);
    setShowDeletedModalMessage('');
  };

  return (
    <>
      <Loader isLoading={isFetching} />
      <Sidebar />
      <Modal
        open={showDeletedModal}
        onClose={handleCloseMessage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" id="modal-modal-title">
            Success!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {showDeletedModalMessage}
          </Typography>
        </Box>
      </Modal>
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
          <ButtonGroup>
            <Box>
              <Button
                id="showMyTimesheetsButton"
                variant={selectedButton === 1 ? 'contained' : 'outlined'}
                onClick={() => showMyTS()}
              >
                My timesheets
              </Button>
              <Button
                id="showTimesheetsToApproveButton"
                variant={selectedButton === 2 ? 'contained' : 'outlined'}
                onClick={() => showTSToApprove()}
              >
                Timesheets to approve
              </Button>
              <Button
                id="showAllTimesheetsButton"
                variant={selectedButton === 3 ? 'contained' : 'outlined'}
                onClick={() => showAllTS()}
              >
                All timesheets
              </Button>
              <Button
                id="deleteSelectedTimesheetsButton"
                disabled={selectedTS.length ? false : true}
                onClick={() => deleteSelectedTSAction()}
              >
                Delete selected ts
              </Button>
            </Box>
          </ButtonGroup>
        </Box>
      )}
      <EmployeeTimesheetTable
        title={role}
        headers={['EMPLOYEE', 'Project', 'Start date', 'Task', 'Hours', 'Status', 'Edit', 'Delete']}
        // headers={tableHeaders}
        keys={['employeeId', 'projectId', 'date', 'taskId', 'hours', 'status']}
        data={formattedTimeSheets}
        role={role}
        onEdit={openEditTimeSheet}
        onAdd={openAddTimeSheet}
        onDelete={deleteTimeSheet}
        onApprove={statusChanger}
        onSelect={selectTS}
      />
    </>
  );
}
export default TimeSheet;
