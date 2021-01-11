import { tasksActions } from "./tasksActions";

const initialState = {
  data: {},
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case tasksActions.SET_TASKS:
      return {
        ...state,
        data: { ...state.data, [action.listId]: action.tasks },
      };
    default:
      return state;
  }
};
