export const userActions = {
  IS_AUTHENTICATED: "USER_IS_AUTHENTICATED",
  IS_ANONYMOUS: "USER_IS_ANONYMOUS",
  IS_LOADING: "USER_IS_LOADING",
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
    default:
      return state;
  }
};
