export const playersActions = {
  IS_LOADING: "PLAYER_IS_LOADING",
  SET_PLAYERS: "PLAYERS_SET_PLAYERS",
  SET_RIGHTS: "PLAYERS_SET_RIGHTS",
  IS_READY: "PLAYER_IS_READY",
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
    case playersActions.SET_RIGHTS:
      return {
        ...state,
        isLoading: false,
        data: state.data.map((player) => {
          if (player.id === action.playerId) {
            return { ...player, backOffice: action.backOffice };
          }
          return player;
        }),
      };
    case playersActions.IS_READY:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
