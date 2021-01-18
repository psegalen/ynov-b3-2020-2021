export const userActions = {
  IS_AUTHENTICATED: "USER_IS_AUTHENTICATED",
  IS_ANONYMOUS: "USER_IS_ANONYMOUS",
};

const initialState = {
  isAuthenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case userActions.IS_ANONYMOUS:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
