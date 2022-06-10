import { useState, useEffect } from 'react';
import Table from '../../Shared/Table';
import EditProject from '../ProjectForms/EditProject';
import CreateProject from '../ProjectForms/CreateProject';
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

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const editProject = (id) => {
    const currentEditing = projects.find((project) => project._id === id);
    setEdit(true);
    setEditingProject(currentEditing);
  };

  const closeModal = () => {
    const iWantToClose = confirm('Are you sure you want to exit?');
    if (iWantToClose) {
      setShowCreateModal(false);
      setEdit(false);
    }
  };

  const forceCloseModal = () => {
    setShowCreateModal(false);
    setEdit(false);
  };

  const appendToProjects = (project) => {
    setProjects([...projects, project]);
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
    <>
      <Sidebar>
        <a>Your projects</a>
      </Sidebar>
      {showCreateModal ? (
        <CreateProject
          appendToProjects={appendToProjects}
          showCreateModal={showCreateModal}
          handleClose={closeModal}
          forceCloseModal={forceCloseModal}
        />
      ) : null}
      {edit ? (
        <EditProject
          initial={editingProject}
          showModal={edit}
          handleClose={closeModal}
          updateProjects={updateProjects}
          forceCloseModal={forceCloseModal}
        />
      ) : null}
      <Table
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
        data={projects}
        onEdit={editProject}
        onDelete={deleteProject}
        onAdd={handleOpenCreateModal}
      />
    </>
  );
}

export default List;
