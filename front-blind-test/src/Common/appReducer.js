export const appActions = {
  IS_LOADING: "APP_IS_LOADING",
  IS_READY: "APP_IS_READY",
};

const initialState = {
  isLoading: true,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case appActions.IS_READY:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
