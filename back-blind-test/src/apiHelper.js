const apiRoot = "https://europe-west1-ynov-b3-21.cloudfunctions.net/";

const apiHelper = {
  getPlayer: (id) =>
    fetch(`${apiRoot}players?id=${id}`)
      .then((result) => result.json())
      .catch((err) => {
        console.log(err);
        return { status: "error", error: err.message };
      }),
};

export default apiHelper;
