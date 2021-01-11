import { listsActions } from "./listsActions";
import { tasksActions } from "./tasksActions";

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
    case listsActions.ADD_NEW_LIST:
      return {
        ...state,
        data: state.data.concat(action.list),
      };
    case tasksActions.TASK_CREATED:
    case tasksActions.TASK_DELETED:
      const newData = state.data.slice();
      for (let i = 0; i < state.data.length; i++) {
        const list = state.data[i];
        if (list.id === action.listId) {
          list.taskCount +=
            action.type === tasksActions.TASK_DELETED ? -1 : 1;
        }
      }
      return {
        ...state,
        data: newData,
      };
    default:
      return state;
  }
};
