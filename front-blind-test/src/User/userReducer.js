export const userActions = {
  IS_AUTHENTICATED: "USER_IS_AUTHENTICATED",
  IS_ANONYMOUS: "USER_IS_ANONYMOUS",
  IS_LOADING: "USER_IS_LOADING",
  INCREMENT_PLAYER_NB_PLAYED: "USER_INCREMENT_PLAYER_NB_PLAYED",
};

const initialState = {
  isAuthenticated: false,
  uid: null,
  player: null,
  isLoading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.IS_LOADING:
      return { ...state, isLoading: true };
    case userActions.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        uid: action.uid,
        player: action.player,
        isLoading: false,
      };
    case userActions.IS_ANONYMOUS:
      return {
        ...state,
        isAuthenticated: false,
        uid: initialState.uid,
        player: initialState.player,
        isLoading: false,
      };
    case userActions.INCREMENT_PLAYER_NB_PLAYED:
      return {
        ...state,
        player: {
          ...state.player,
          nb_played_games: state.player.nb_played_games + 1,
        },
      };
    default:
      return state;
  }
};
