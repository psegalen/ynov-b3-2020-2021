import { listenForAuthChange } from "../User/userEffects";
import { appActions } from "./appReducer";

export const launchSequence = () => (dispatch) => {
  dispatch({ type: appActions.IS_LOADING });

  // Place authentication listener on Firebase auth SDK
  dispatch(
    listenForAuthChange(() => dispatch({ type: appActions.IS_READY }))
  );
};
