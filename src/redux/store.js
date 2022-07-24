import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { projectsReducer } from './projects/reducers';
import { timesheetReducer } from './timesheets/reducers';
import { employeesReducer } from './employees/reducers';
import { superAdminReducer } from './superadmins/reducers';
import { tasksReducer } from './tasks/reducers';
import { adminsReducer } from './admins/reducers';
import { authReducer } from './auth/reducers';
import { accessibilityReducer } from './accessibility/reducers';
import { currentUserReducer } from './currentUser/reducers';

const rootReducer = combineReducers({
  projects: projectsReducer,
  timesheet: timesheetReducer,
  employees: employeesReducer,
  superAdmins: superAdminReducer,
  tasks: tasksReducer,
  admins: adminsReducer,
  auth: authReducer,
  accessibility: accessibilityReducer,
  currentUser: currentUserReducer
});

const configureStore = () => {
  const enhacer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhacer);
};

const store = configureStore();

export default store;
