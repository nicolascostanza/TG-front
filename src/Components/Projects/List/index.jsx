import { useState, useEffect } from 'react';
import Table from '../../Shared/Table';
import EditProject from '../ProjectForms/EditProject';
import CreateProject from '../ProjectForms/CreateProject';
import Sidebar from '../../Shared/Sidebar';
import * as actions from '../../../redux/projects/actions';
import * as thunks from '../../../redux/projects/thunks';
import { useDispatch, useSelector } from 'react-redux';

function List() {
  const [editingProject, setEditingProject] = useState({});
  const [allEmployees, setAllEmployees] = useState({});
  const [allTasks, setAllTasks] = useState({});
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const isFetching = useSelector((state) => state.projects.isFetching);
  const showCreateModal = useSelector((state) => state.projects.createModalShow);
  const showEditModal = useSelector((state) => state.projects.editModalShow);

  useEffect(() => {
    dispatch(thunks.getProjects());
    fetchEmployees();
    fetchTasks();
  }, []);

  const fetchEmployees = () => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((json) => {
        setAllEmployees(json.data);
      })
      .catch((error) => console.log(error));
  };

  const fetchTasks = () => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((json) => {
        setAllTasks(json.data);
      })
      .catch((error) => console.log(error));
  };

  const handleOpenCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

  const closeModal = () => {
    const iWantToClose = confirm('Are you sure you want to exit?');
    if (iWantToClose) {
      dispatch(actions.closeAllModals());
    }
  };

  const appendToProjects = (project) => {
    dispatch(actions.addNewProjectFulfilled(project));
  };

  const updatedProject = (editedProject) => {
    const updatedProjects = projects.map((project) => {
      if (project._id === editedProject._id) {
        return editedProject;
      }
      return project;
    });
    dispatch(actions.updateProjectFulfilled(updatedProjects));
  };

  // This function set everything to edit a project
  const editProject = (id) => {
    const currentEditing = projects.find((project) => project._id === id);
    dispatch(actions.showEditModal());
    setEditingProject(currentEditing);
  };

  const deleteProject = (id) => {
    const areYouSure = confirm('Are you sure you want to delete it?');
    if (areYouSure) {
      console.log('Estoy seguro');
      dispatch(thunks.deleteProject(id));
    }
  };

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <>
      <Sidebar>
        <h2>Projects</h2>
        <a>All your projects</a>
        <a></a>
      </Sidebar>
      {showCreateModal ? (
        <CreateProject
          appendToProjects={appendToProjects}
          showCreateModal={showCreateModal}
          handleClose={closeModal}
          allEmployees={allEmployees}
          allTasks={allTasks}
        />
      ) : null}
      {showEditModal ? (
        <EditProject
          initial={editingProject}
          showModal={showEditModal}
          handleClose={closeModal}
          updatedProject={updatedProject}
          allEmployees={allEmployees}
          allTasks={allTasks}
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
          'tasks'
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
