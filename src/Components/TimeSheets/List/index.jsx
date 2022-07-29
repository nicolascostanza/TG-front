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
import Modal from 'Components/Shared/Modal';
import styles from './list.module.css';
import Button from 'Components/Shared/Button';

function TimeSheet() {
  const dispatch = useDispatch();
  let initRole = useSelector((state) => state.auth.authenticated.role);
  const [showAllTimesheets, setShowAllTimesheets] = useState(false);
  const [showPendingTS, setShowPendingTS] = useState(false);
  const [editId, setEditId] = useState('');
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [showDeletedModalMessage, setShowDeletedModalMessage] = useState('');
  const [selectedTS, setSelectedTS] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [role, setRole] = useState(initRole);
  const [isPmIn, setIsPmIn] = useState([]);
  const timeSheets = useSelector((state) => state.timesheet.list);
  const isFetching = useSelector((state) => state.timesheet.isFetching);
  const isError = useSelector((state) => state.timesheet.error);
  const showCreateModal = useSelector((state) => state.timesheet.showCreateModal);
  const showEditModal = useSelector((state) => state.timesheet.showEditModal);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [rowToDelete, setRowToDelete] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalDeleteMoreThanOne, setShowModalDeleteMoreThanOne] = useState(false);
  const rateList = currentUser.associatedProjects.map((item) => {
    return { id: item.projectId?._id, rate: item.rate };
  });
  useEffect(() => {
    const isPmList = currentUser.associatedProjects
      .filter((item) => item.isPM)
      .map((item) => item.projectId._id);
    setIsPmIn(isPmList);
    if (isPmList.length > 0) {
      setRole('PM');
    }
  }, []);

  useEffect(() => {
    if (showAllTimesheets === true) {
      dispatch(timesheetsThunks.getTimesheets());
    }
    dispatch(timesheetsThunks.getEmployeeTimesheets(currentUser._id));
    dispatch(tasksThunks.getTasks());
  }, [showAllTimesheets, showPendingTS]);

  useEffect(() => {
    if (!showAllTimesheets) {
      dispatch(timesheetsThunks.getEmployeeTimesheets(currentUser._id));
    }
  }, [timeSheets.length]);

  const allTasks = useSelector((state) => state.tasks.list);

  const deleteTimeSheetModal = (row) => {
    setRowToDelete(row);
    setShowModalDelete(true);
  };

  const deleteTimeSheet = () => {
    dispatch(timesheetsThunks.deleteTimesheets(rowToDelete._id));
    setShowModalDelete(false);
  };

  const cancelDelete = () => {
    setShowModalDelete(false);
    setRowToDelete({});
  };

  const cancelDeleteMoreThan1 = () => {
    setShowModalDeleteMoreThanOne(false);
  };

  const deleteMoreThan1TS = () => {
    for (let i = 0; i < selectedTS.length; i++) {
      dispatch(timesheetsThunks.deleteTimesheets(selectedTS[i]));
    }
    if (!isError) {
      setShowDeletedModal(true);
      setShowDeletedModalMessage(`${selectedTS.length} timesheets has been deleted!`);
      setSelectedTS([]);
    }
    setShowModalDeleteMoreThanOne(false);
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
      .filter((item) => {
        return isPmIn.includes(item.projectId?._id);
      })
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
          approveSlider: timeSheet.approved ? true : false
        };
      })
      .filter((item) => !item.approveSlider);
  } else if (showAllTimesheets) {
    formattedTimeSheets = timeSheets
      .filter((item) => {
        return isPmIn.includes(item.projectId?._id);
      })
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
          approveSlider: timeSheet.approved ? true : false
        };
      });
  } else {
    formattedTimeSheets = timeSheets?.map((timeSheet) => {
      return {
        _id: timeSheet._id,
        employeeId: `${timeSheet?.employeeId?.firstName} ${timeSheet?.employeeId?.lastName}`,
        projectId: timeSheet.projectId?.name,
        date: timeSheet.date ? new Date(timeSheet.date).toISOString().split('T')[0] : '',
        taskId: timeSheet.taskId?.taskName,
        hours: timeSheet.hours,
        status: timeSheet.approved ? 'Approved' : 'Disapproved',
        isDeleted: false,
        approveSlider: timeSheet.approved ? true : false,
        rate:
          rateList?.find(
            (item) => item.id === timeSheet.projectId?._id || item.id === timeSheet.projectId
          )?.rate ?? 0
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
    setShowModalDeleteMoreThanOne(true);
  };

  const handleCloseMessage = () => {
    setShowDeletedModal(false);
    setShowDeletedModalMessage('');
  };

  return (
    <>
      <Loader isLoading={isFetching} />
      <Sidebar />
      <Modal showModal={showDeletedModal} handleClose={handleCloseMessage} modalTitle={'Success!'}>
        {showDeletedModalMessage}
      </Modal>
      <Modal showModal={showModalDelete} handleClose={cancelDelete} modalTitle={'DELETE'}>
        <p>{rowToDelete && `Are you sure you want to delete ${rowToDelete.taskId}?`}</p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={deleteTimeSheet}
            id="deleteButton"
            width={'40px'}
            height={'40px'}
            type="submit"
            value="delete"
          >
            <i className="fa-solid fa-check" />
          </Button>
        </div>
      </Modal>
      <Modal
        showModal={showModalDeleteMoreThanOne}
        handleClose={cancelDeleteMoreThan1}
        modalTitle={'DELETE'}
      >
        <p>{rowToDelete && `Are you sure you want to delete ${selectedTS.length} timesheets?`}</p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={deleteMoreThan1TS}
            id="deleteButton"
            width={'40px'}
            height={'40px'}
            type="submit"
            value="delete"
          >
            <i className="fa-solid fa-check" />
          </Button>
        </div>
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
        <div className={styles.pmNavTabs}>
          <button
            className={selectedButton === 1 ? styles.selectedTab : styles.unselectedTab}
            id="showMyTimesheetsButton"
            onClick={() => showMyTS()}
          >
            My timesheets
          </button>
          <button
            className={selectedButton === 2 ? styles.selectedTab : styles.unselectedTab}
            id="showTimesheetsToApproveButton"
            onClick={() => showTSToApprove()}
          >
            to approve
          </button>
          <button
            id="showAllTimesheetsButton"
            className={selectedButton === 3 ? styles.selectedTab : styles.unselectedTab}
            onClick={() => showAllTS()}
          >
            All timesheets
          </button>
          <button
            id="deleteSelectedTimesheetsButton"
            className={selectedTS.length ? styles.enabled : styles.disabled}
            onClick={() => deleteSelectedTSAction()}
          >
            Delete selected ts
          </button>
        </div>
      )}
      <EmployeeTimesheetTable
        title={role}
        headers={['EMPLOYEE', 'Project', 'Start date', 'Task', 'Hours', 'Status', 'Edit', 'Delete']}
        keys={['employeeId', 'projectId', 'date', 'taskId', 'hours', 'status']}
        data={formattedTimeSheets}
        role={role}
        onEdit={openEditTimeSheet}
        onAdd={openAddTimeSheet}
        onDelete={deleteTimeSheetModal}
        onApprove={statusChanger}
        onSelect={selectTS}
      />
    </>
  );
}
export default TimeSheet;
