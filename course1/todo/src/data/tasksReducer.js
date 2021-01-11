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
    case tasksActions.TASK_CREATED:
      return {
        ...state,
        data: {
          ...state.data,
          [action.listId]: state.data[action.listId].concat(
            action.task
          ),
        },
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
      };
    default:
      return state;
  }
};
