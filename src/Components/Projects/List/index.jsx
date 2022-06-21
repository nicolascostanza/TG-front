import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'Components/Shared/Table';
import EditProject from 'Components/Projects/ProjectForms/EditProject';
import CreateProject from 'Components/Projects/ProjectForms/CreateProject';
import Sidebar from 'Components/Shared/Sidebar';
import Loader from 'Components/Shared/Loader';
import * as actions from 'redux/projects/actions';
import * as projectsThunks from 'redux/projects/thunks';
import * as employeesThunks from 'redux/employees/thunks';
import * as tasksThunks from 'redux/tasks/thunks';

function List() {
  const [editingProject, setEditingProject] = useState({});
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const allEmployees = useSelector((state) => state.employees.list);
  const allTasks = useSelector((state) => state.tasks.list);
  const isFetchingProjects = useSelector((state) => state.projects.isFetching);
  const isFetchingEmployees = useSelector((state) => state.employees.isFetching);
  const isFetchingTasks = useSelector((state) => state.tasks.isFetching);
  const showCreateModal = useSelector((state) => state.projects.createModalShow);
  const showEditModal = useSelector((state) => state.projects.editModalShow);

  useEffect(() => {
    dispatch(projectsThunks.getProjects());
    dispatch(employeesThunks.getEmployees());
    dispatch(tasksThunks.getTasks());
  }, []);

  const handleOpenCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

  const closeModal = () => {
    const iWantToClose = confirm('Are you sure you want to exit?');
    if (iWantToClose) {
      dispatch(actions.closeAllModals());
    }
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

  // FUNCTION TO SET THE PROJECT EDITION
  const editProject = (id) => {
    const currentEditing = projects.find((project) => project._id === id);
    setEditingProject(currentEditing);
    dispatch(actions.showEditModal());
  };

  const deleteProject = (id) => {
    const areYouSure = confirm('Are you sure you want to delete it?');
    if (areYouSure) {
      dispatch(projectsThunks.deleteProject(id));
    }
  };

  return (
    <>
      <Loader isLoading={isFetchingProjects || isFetchingEmployees || isFetchingTasks} />
      <Sidebar>
        <h2>Projects</h2>
        <a>All your projects</a>
        <a></a>
      </Sidebar>
      {showCreateModal ? (
        <CreateProject
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
