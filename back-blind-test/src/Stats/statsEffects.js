import apiHelper from "../apiHelper";
import { statsActions } from "./statsReducer";

export const fetchStats = () => (dispatch) => {
  dispatch({ type: statsActions.IS_LOADING });
  apiHelper.getStats().then((result) => {
    if (result.status === "ok") {
      dispatch({ type: statsActions.SET_STATS, ...result });
    } else {
      dispatch({
        type: statsActions.IS_ON_ERROR,
        error: result.error,
      });
    }
  });
};
