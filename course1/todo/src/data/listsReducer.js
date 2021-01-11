import { listsActions } from "./listsActions";

const initialState = {
  data: [],
  lastFetchDate: null,
};

export const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case listsActions.SET_LISTS:
      return {
        ...state,
        data: action.lists,
        lastFetchDate: new Date().getTime(),
      };
    default:
      return state;
  }
};
