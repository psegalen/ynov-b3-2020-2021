import { tasksActions } from "./tasksActions";

const initialState = {
  data: {},
  isLoading: false,
  isOnError: false,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case tasksActions.SET_TASKS:
      return {
        ...state,
        data: { ...state.data, [action.listId]: action.tasks },
        isLoading: false,
        isOnError: false,
      };
    case tasksActions.TASK_CREATED:
      return {
        ...state,
        data: {
          ...state.data,
          [action.listId]: state.data[action.listId].concat(
            action.task
          ),
        },
        isLoading: false,
        isOnError: false,
      };
    case tasksActions.TASK_DELETED:
      const newTasksAfterDeletion = state.data[action.listId].filter(
        (task) => task.id !== action.task.id
      );
      return {
        ...state,
        data: {
          ...state.data,
          [action.listId]: newTasksAfterDeletion,
        },
        isLoading: false,
        isOnError: false,
      };
    case tasksActions.TASK_TOGGLED:
      const newTasks = state.data[action.listId].slice();
      for (let i = 0; i < newTasks.length; i++) {
        const task = newTasks[i];
        if (task.id === action.task.id) {
          newTasks[i] = action.task;
        }
      }
      return {
        ...state,
        data: {
          ...state.data,
          [action.listId]: newTasks,
        },
        isLoading: false,
        isOnError: false,
      };
    case tasksActions.TASKS_ARE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case tasksActions.TASKS_ARE_ON_ERROR:
      return {
        ...state,
        isOnError: true,
      };
    default:
      return state;
  }
};
