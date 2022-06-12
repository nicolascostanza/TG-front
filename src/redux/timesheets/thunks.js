import { getTimesheetApi } from '../../Components/TimeSheets/api';
import * as actions from './actions';

export const getTimesheet = () => {
  return (dispatch) => {
    dispatch(actions.getTimesheetPending());
    getTimesheetApi()
      .then((response) => {
        dispatch(actions.addTimeSheetFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(actions.addTimeSheetFailed(error));
      });
  };
};
