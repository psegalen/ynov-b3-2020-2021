const initialState = {
  tasks: [],
  lastFetchDate: null,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.tasks };
    default:
      return state;
  }
};
