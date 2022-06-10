import { useEffect, useState } from 'react';
import styles from '../List/list.module.css';
import AddTimeSheets from '../Add';
import Table from '../../Shared/Table';
import EditTimeSheets from '../Edit';
import Sidebar from '../../Shared/Sidebar';

function TimeSheet() {
  const [showEditModal, setShowEditModal] = useState(false);
  const openEditTimeSheet = (id) => {
    setEditId(id);
    setShowEditModal(true);
  };
  const [timeSheets, setTimeSheets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const openAddTimeSheet = () => {
    setShowModal(true);
  };
  const [editId, setEditId] = useState('');
  const handleClose = () => {
    setShowModal(false);
    setShowEditModal(false);
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        setTimeSheets(response.data);
      })
      .catch((err) => console.err(err));
  }, []);
  const deleteTimeSheet = (id) => {
    const resp = confirm('Are you sure you want to delete it?');
    if (resp) {
      fetch(`${process.env.REACT_APP_API_URL}/time-sheets/${id}`, {
        method: 'DELETE'
      })
        .then((response) => {
          response.json();
        })
        .then((json) => {
          if (json.status) {
            alert('Succesfully deleted');
          }
        });
      setTimeSheets(timeSheets.filter((timeSheet) => timeSheet._id !== id));
    }
  };
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
      <AddTimeSheets showModal={showModal} handleClose={handleClose}></AddTimeSheets>
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
