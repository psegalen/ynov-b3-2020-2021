import firebase from "firebase";
import api from "../Common/api";
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

// This thunk gets the player corresponding to the user
export const getUserPlayer = (uid, onSuccess) => (dispatch) => {
  // Verify that the user is allowed to access to the Back-Office
  api.getPlayer(uid).then((result) => {
    if (result.status === "ok") {
      dispatch({
        type: userActions.IS_AUTHENTICATED,
        uid: uid,
        player: result.player,
      });
    } else {
      authError(dispatch, result.error);
    }
    if (onSuccess) onSuccess();
  });
};

// This thunk will place a listener on Firebase auth state change,
// automatically getting player is there's an authenticated user,
// forcing anonymous state if not
export const listenForAuthChange = (onSuccess) => (dispatch) =>
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(getUserPlayer(user.uid, onSuccess));
      firebase
        .auth()
        .currentUser.getIdToken()
        .then((t) => console.log(t));
    } else {
      dispatch({ type: userActions.IS_ANONYMOUS });
      onSuccess();
    }
  });

export const authenticateUser = (email, password, onSuccess) => (
  dispatch
) => {
  dispatch({ type: userActions.IS_LOADING });
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() =>
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          dispatch(
            getUserPlayer(userCredentials.user.uid, onSuccess)
          );
        })
        .catch((err) => {
          authError(dispatch, err.message);
        })
    );
};

// This is not a thunk, it just signs the user out, the listener will then set the state
export const disconnectUser = () => firebase.auth().signOut();

export const incrementPlayerNbPlayed = () => ({
  type: userActions.INCREMENT_PLAYER_NB_PLAYED,
});
