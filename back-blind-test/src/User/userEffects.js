import { userActions } from "./userReducer";

export const authenticateUser = (email, password, onSuccess) => (
  dispatch
) => {
  dispatch({ type: userActions.IS_AUTHENTICATED, email, password });
  onSuccess();
};

export const disconnectUser = () => (dispatch) => {
  dispatch({ type: userActions.IS_ANONYMOUS });
};
