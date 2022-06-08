import { useState, useEffect } from 'react';
import EditProject from '../EditProject';
import Modal from '../../Shared/Modal';
import Table from '../../Shared/Table';
import CreateProject from '../CreateProject';
import Sidebar from '../../Shared/Sidebar';

function List() {
  const [projects, setProjects] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState({
    name: '',
    description: '',
    clientName: '',
    startDate: '',
    endDate: '',
    projectManager: '',
    team: [],
    tasks: []
  });

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const formattedProjects = projects.map((project) => {
    return {
      _id: project._id,
      name: project.name,
      description: project.description,
      clientName: project.clientName,
      startDate: new Date(project.startDate).toLocaleDateString(),
      endDate: new Date(project.endDate).toLocaleDateString(),
      projectManager: project.projectManager,
      team: project.team.map((member) => member.firstName).join(' - ') || '-',
      tasks: project.tasks.map((task) => task.taskName).join(' - ') || '-'
    };
  });

  const editProject = (id) => {
    const currentEditing = projects.find((project) => project._id === id);
    setEdit(true);
    setEditingProject(currentEditing);
  };

  const closeModal = () => {
    setEdit(false);
  };

  const updateProjects = (editedProject) => {
    const updatedProjects = projects.map((project) => {
      if (project._id === editedProject._id) {
        return editedProject;
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const deleteProject = (id) => {
    const areYouSure = confirm('Are you sure you want to delete it?');
    if (areYouSure) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, { method: 'delete' })
        .then((response) => response.json())
        .then((json) => {
          alert(json.message);
          setProjects(projects.filter((project) => project._id !== id));
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((json) => {
        setProjects(json.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Sidebar></Sidebar>
      {<CreateProject showCreateModal={showCreateModal} handleClose={handleCloseCreateModal} />}
      {edit ? (
        <Modal showModal={edit} handleClose={closeModal} modalTitle="Update project">
          <EditProject
            initial={editingProject}
            updateProjects={updateProjects}
            close={closeModal}
          />
        </Modal>
      ) : (
        ''
      )}
      <Table // HERE HERE HERE HERE HERE HERE
        title="Projects"
        headers={[
          'name',
          'description',
          'clientName',
          'startDate',
          'endDate',
          'projectManager',
          'team',
          'tasks',
          '',
          ''
        ]}
        data={formattedProjects}
        onEdit={editProject}
        onDelete={deleteProject}
        onAdd={handleOpenCreateModal}
      />
    </div>
  );
}

export default List;
