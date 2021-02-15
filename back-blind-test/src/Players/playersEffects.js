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

export const givePlayerRights = (playerId, backOffice) => (
  dispatch
) => {
  apiHelper.giveAdminRights(playerId, backOffice).then((result) => {
    if (result.status === "ok") {
      dispatch({
        type: playersActions.SET_RIGHTS,
        playerId,
        backOffice,
      });
      alert("Les droits ont bien été changés !");
    } else {
      dispatch({ type: playersActions.IS_READY });
      alert(
        `Erreur lors de la modification des droits : ${result.error}`
      );
    }
  });
};
