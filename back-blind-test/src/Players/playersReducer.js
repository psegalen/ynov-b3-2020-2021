export const playersActions = {
  IS_LOADING: "PLAYER_IS_LOADING",
  SET_PLAYERS: "PLAYERS_SET_PLAYERS",
};

const initialState = {
  isLoading: false,
  data: [],
};

export const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case playersActions.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case playersActions.SET_PLAYERS:
      return {
        ...state,
        data: action.players,
        isLoading: false,
      };
    default:
      return state;
  }
};
