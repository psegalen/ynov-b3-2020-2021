import apiHelper from "../apiHelper";
import { playersActions } from "./playersReducer";

export const fetchPlayers = () => (dispatch) => {
  dispatch({ type: playersActions.IS_LOADING });
  apiHelper.getPlayers().then((result) => {
    if (result.status === "ok") {
      dispatch({
        type: playersActions.SET_PLAYERS,
        players: result.players,
      });
    } else {
      console.error(result);
      dispatch({
        type: playersActions.SET_PLAYERS,
        players: [],
      });
    }
  });
};
