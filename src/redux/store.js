import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { projectsReducer } from './projects/reducers';
import { employeesReducer } from './employees/reducers';
import { superAdminReducer } from './superadmins/reducers';
import { tasksReducer } from './tasks/reducers';

const rootReducer = combineReducers({
  projects: projectsReducer,
  employees: employeesReducer,
  superAdmins: superAdminReducer,
  tasks: tasksReducer
});

const configureStore = () => {
  const enhacer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhacer);
};

const store = configureStore();

export default store;
