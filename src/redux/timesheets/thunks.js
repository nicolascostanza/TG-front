import {
  getTimesheetApi,
  deleteTimesheetApi,
  addTimesheetApi
} from '../../Components/TimeSheets/api';
import * as actions from './actions';

export const getTimesheets = () => {
  return (dispatch) => {
    dispatch(actions.getTimesheetPending());
    getTimesheetApi()
      .then((response) => {
        dispatch(actions.getTimesheetFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.getTimesheetFailed(error));
      });
  };
};

export const deleteTimesheets = (id) => {
  return (dispatch) => {
    dispatch(actions.deleteTimeSheetPending());
    deleteTimesheetApi(id)
      .then((response) => {
        dispatch(actions.deleteTimeSheetFulfilled(response.data._id));
      })
      .catch((error) => {
        dispatch(actions.deleteTimeSheetFailed(error));
      });
  };
};

export const addTimesheets = (TimeSheet) => {
  return (dispatch) => {
    dispatch(actions.addTimeSheetPending());
    addTimesheetApi(TimeSheet)
      .then((response) => {
        dispatch(actions.addTimeSheetFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.addTimeSheetFailed(error));
      });
  };
};
