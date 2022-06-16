import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { projectsReducer } from './projects/reducers';
import { timesheetReducer } from './timesheets/reducers';
import { employeesReducer } from './employees/reducers';
import { superAdminReducer } from './superadmins/reducers';
import { adminsReducer } from './admins/reducers';

const rootReducer = combineReducers({
  projects: projectsReducer,
  timesheet: timesheetReducer,
  employees: employeesReducer,
  superAdmins: superAdminReducer,
  admins: adminsReducer
});

const configureStore = () => {
  const enhacer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhacer);
};

const store = configureStore();

export default store;
