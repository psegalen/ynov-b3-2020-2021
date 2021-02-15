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
};

export default apiHelper;
