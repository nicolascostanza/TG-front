import { useEffect, useState } from 'react';
import AddTimeSheets from '../Add';
import EditTimeSheets from '../Edit';
import Sidebar from 'Components/Shared/Sidebar';
import Loader from 'Components/Shared/Loader';
import * as timesheetsThunks from 'redux/timesheets/thunks';
import * as actions from 'redux/timesheets/actions';
import * as tasksThunks from 'redux/tasks/thunks';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeTimesheetTable from 'Components/Shared/EmployeeTimesheetTable';
import { Button, Box, ButtonGroup, Modal, Typography } from '@mui/material';

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

  // JUST TO MAKE IT FASTER TO TRY THINGS (AND LESS SURPRISES)
  // const [role, setRole] = useState('PM');
  // DELETE AFTER MERGING TO PROD, PLEASE...

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
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  console.log('currentUser: ', currentUser);
  let role = useSelector((state) => state.auth.authenticated.role);
  const rateList = currentUser.associatedProjects.map((item) => {
    return { id: item.projectId?._id, rate: item.rate };
  });
  useEffect(() => {
    if (showAllTimesheets === true) {
      dispatch(timesheetsThunks.getTimesheets());
    }
  }, [timeSheets.length, showAllTimesheets]);

  useEffect(() => {
    dispatch(timesheetsThunks.getEmployeeTimesheets(currentUser._id));
    dispatch(tasksThunks.getTasks());
  }, []);

  const allTasks = useSelector((state) => state.tasks.list);

  const deleteTimeSheet = (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      dispatch(timesheetsThunks.deleteTimesheets(id));
    }
  };

  const deleteMoreThan1TS = (id) => {
    dispatch(timesheetsThunks.deleteTimesheets(id));
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

  let formattedTimeSheets = [];

  if (showPendingTS) {
    formattedTimeSheets = timeSheets
      .map((timeSheet) => {
        return {
          _id: timeSheet._id,
          employeeId: `${timeSheet.employeeId.firstName} ${timeSheet.employeeId.lastName}`,
          projectId: timeSheet.projectId?.name,
          date: timeSheet.date ? new Date(timeSheet.date).toISOString().split('T')[0] : '',
          taskId: timeSheet.taskId?.taskName,
          hours: timeSheet.hours,
          status: timeSheet.approved ? 'Approved' : 'Disapproved',
          isDeleted: false,
          approveSlider: timeSheet.approved ? true : false,
          rate: rateList.find((item) => item.id === timeSheet.projectId._id).rate ?? 0
          // approved: timeSheet.approved
        };
      })
      .filter((item) => !item.approveSlider);
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
        approveSlider: timeSheet.approved ? true : false,
        rate: rateList.find((item) => item.id === timeSheet.projectId._id).rate ?? 0
      };
    });
  }

  formattedTimeSheets.reverse();
  const statusChanger = async (status, id) => {
    dispatch(
      timesheetsThunks.editTimesheet(
        {
          approved: status.status === 'Approved' ? false : true
        },
        id
      )
    );
  };

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
  };

  const deleteSelectedTSAction = () => {
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
    }
    setSelectedTS([]);
  };

  const handleCloseMessage = () => {
    setShowDeletedModal(false);
    setShowDeletedModalMessage('');
  };

  return (
    <>
      {/* --------------- JUST FOR DEBUG START --------------- */}
      {/* <button onClick={() => setRole('EMPLOYEE')}>SET ROLE TO EMPLOYEE</button>
      <button onClick={() => setRole('PM')}>SET ROLE TO PM</button> */}
      {/* --------------- JUST FOR DEBUG FINISH --------------- */}
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
      {showEditModal ? (
        <EditTimeSheets
          showEditModal={showEditModal}
          handleClose={handleClose}
          editId={editId}
          allTasks={allTasks}
          role={role}
          currentUser={currentUser}
        />
      ) : null}
      {showCreateModal ? (
        <AddTimeSheets
          showCreateModal={showCreateModal}
          handleClose={handleClose}
          allTasks={allTasks}
          role={role}
          currentUser={currentUser}
        />
      ) : null}
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
