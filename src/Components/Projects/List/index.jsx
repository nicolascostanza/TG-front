import { useState, useEffect } from 'react';
import Table from '../../Shared/Table';
import EditProject from '../ProjectForms/EditProject';
import CreateProject from '../ProjectForms/CreateProject';
import Sidebar from '../../Shared/Sidebar';
import * as actions from '../../../redux/projects/actions';
import { useDispatch, useSelector } from 'react-redux';

// IMPORTANT: TRY TO EDIT A JUST CREATED PROJECT WILL BREAK THE APP
// I SHOULD FIND A WAY TO POPULATE THE RESPONSE OF CREATE !!!!!!!!!

function List() {
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
  const dispatch = useDispatch(); // So i can execute actions
  const projects = useSelector((state) => state.projects.list); // So i can access the state

  useEffect(() => {
    getProjects().then((response) => {
      dispatch(actions.getProjectsFulfilled(response.data));
    });
  }, []);

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
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
    dispatch(actions.addNewProject(project));
  };

  const getProjects = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  const updateProjects = (editedProject) => {
    const updatedProjects = projects.map((project) => {
      if (project._id === editedProject._id) {
        return editedProject;
      }
      return project;
    });
    dispatch(actions.updateProject(updatedProjects));
  };

  // This function set everything to edit a project
  const editProject = (id) => {
    const currentEditing = projects.find((project) => project._id === id);
    setEdit(true);
    setEditingProject(currentEditing);
  };

  const deleteProject = (id) => {
    const areYouSure = confirm('Are you sure you want to delete it?');
    if (areYouSure) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, { method: 'delete' })
        .then((response) => response.json())
        .then((json) => {
          alert(json.message);
          dispatch(actions.deleteProject(projects.filter((project) => project._id !== id)));
        })
        .catch((error) => console.log(error));
    }
  };

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
