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
  const [showEditModal, setShowEditModal] = useState(false);
  const openEditTimeSheet = (id) => {
    setEditId(id);
    setShowEditModal(true);
  };
  // const [timeSheets, setTimeSheets] = useState([]);
  const dispatch = useDispatch();
  const timeSheets = useSelector((state) => state.timesheet.list);
  const isFetching = useSelector((state) => state.timesheet.isFetching);
  const showCreateModal = useSelector((state) => state.timesheet.showCreateModal);
  const openAddTimeSheet = () => {
    dispatch(actions.showCreateModal());
  };
  const [editId, setEditId] = useState('');
  const handleClose = () => {
    dispatch(actions.closeModals());
  };
  useEffect(() => {
    dispatch(thunks.getTimesheets());
  }, []);
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
      _id: timeSheet._id,
      employeeId: timeSheet.employeeId._id,
      description: timeSheet.description,
      project: timeSheet.project,
      date: new Date(timeSheet.date).toDateString(),
      task_name: timeSheet.task.map((task) => task.taskName).join(' - ') || '-',
      hours: timeSheet.hours,
      approved: timeSheet.approved ? 'Approved' : 'Disapoproved',
      role: timeSheet.role
    };
  });
  return (
    <div className={styles.container}>
      <Sidebar></Sidebar>
      <EditTimeSheets showModal={showEditModal} handleClose={handleClose} editId={editId} />
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
