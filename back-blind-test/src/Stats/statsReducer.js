export const statsActions = {
  SET_STATS: "STATS_SET_STATS",
  IS_LOADING: "STATS_IS_LOADING",
  IS_ON_ERROR: "STATS_IS_ON_ERROR",
};

const initialState = {
  nbPlayers: "",
  nbGames: "",
  nbQuestions: "",
  isLoading: false,
  error: "",
};

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case statsActions.IS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: initialState.error,
      };
    case statsActions.SET_STATS:
      return {
        ...state,
        nbPlayers: action.nbPlayers,
        nbGames: action.nbGames,
        nbQuestions: action.nbQuestions,
        isLoading: false,
        error: initialState.error,
      };
    case statsActions.IS_ON_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
