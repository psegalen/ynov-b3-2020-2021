import firebase from "firebase";
import apiHelper from "../apiHelper";
import { userActions } from "./userReducer";

const firebaseConfig = {
  apiKey: "AIzaSyAoi_dkAeY1FFdLPmWS5voHjbIxegqSzw8",
  authDomain: "ynov-b3-21.firebaseapp.com",
  projectId: "ynov-b3-21",
  storageBucket: "ynov-b3-21.appspot.com",
  messagingSenderId: "223121527532",
  appId: "1:223121527532:web:b89faa93e4a6af35b00bc9",
  measurementId: "G-F6BSWT0346",
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const authError = (dispatch, message) => {
  dispatch({ type: userActions.IS_ANONYMOUS });
  alert(message);
};

export const authenticateUser = (email, password, onSuccess) => (
  dispatch
) => {
  dispatch({ type: userActions.IS_LOADING });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      console.log(userCredentials.user.uid);
      // Verify that the user is allowed to access to the Back-Office
      apiHelper.getPlayer(userCredentials.user.uid).then((result) => {
        if (result.status === "ok") {
          if (result.player.backOffice) {
            dispatch({
              type: userActions.IS_AUTHENTICATED,
              uid: userCredentials.user.uid,
              player: result.player,
            });
            onSuccess();
          } else {
            authError(
              dispatch,
              "Vous n'avez pas le droit d'utiliser ce Back-Office !\nVous pouvez demander les droits à un administrateur."
            );
          }
        } else {
          authError(dispatch, result.error);
        }
      });
    })
    .catch((err) => {
      authError(dispatch, err.message);
    });
};

export const disconnectUser = () => (dispatch) => {
  dispatch({ type: userActions.IS_ANONYMOUS });
};
