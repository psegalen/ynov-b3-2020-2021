import firebase from "firebase";
const apiRoot = "https://europe-west1-ynov-b3-21.cloudfunctions.net/";

const handleError = (err) => {
  console.log(err);
  return { status: "error", error: err.message };
};

const apiHelper = {
  getPlayer: (id) =>
    fetch(`${apiRoot}players?id=${id}`)
      .then((result) => result.json())
      .catch(handleError),
  getStats: () =>
    fetch(`${apiRoot}game`)
      .then((result) => result.json())
      .catch(handleError),
  getPlayers: () =>
    fetch(`${apiRoot}players`)
      .then((result) => result.json())
      .catch(handleError),
  giveAdminRights: (playerId, backOffice) =>
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) =>
        fetch(`${apiRoot}players?admin=true`, {
          method: "PATCH",
          body: JSON.stringify({ playerId, backOffice }),
          headers: {
            BlindTestToken: token,
            "Content-Type": "application/json",
          },
        }).then((result) => result.json())
      ),
  createQuestion: (question) =>
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token) =>
        fetch(`${apiRoot}questions`, {
          method: "POST",
          body: JSON.stringify(question),
          headers: {
            BlindTestToken: token,
            "Content-Type": "application/json",
          },
        }).then((result) => result.json())
      ),
};

export default apiHelper;
