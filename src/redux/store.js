import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { projectsReducer } from './projects/reducers';
import { tasksReducer } from './tasks/reducers';

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer
});

const configureStore = () => {
  const enhacer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhacer);
};

const store = configureStore();

export default store;
