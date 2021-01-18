export const tasksActions = {
  SET_TASKS: "SET_TASKS",
  TASK_TOGGLED: "TASK_TOGGLED",
  TASK_DELETED: "TASK_DELETED",
  TASK_CREATED: "TASK_CREATED",
  TASKS_ARE_LOADING: "TASKS_ARE_LOADING",
  TASKS_ARE_ON_ERROR: "TASKS_ARE_ON_ERROR",
};

export const setTasks = (tasks, listId) => ({
  type: tasksActions.SET_TASKS,
  tasks,
  listId,
});

export const taskToggled = (task, listId) => ({
  type: tasksActions.TASK_TOGGLED,
  task,
  listId,
});

export const taskDeleted = (task, listId) => ({
  type: tasksActions.TASK_DELETED,
  task,
  listId,
});

export const taskCreated = (task, listId) => ({
  type: tasksActions.TASK_CREATED,
  task,
  listId,
});

export const tasksAreLoading = () => ({
  type: tasksActions.TASKS_ARE_LOADING,
});

export const tasksAreOnError = () => ({
  type: tasksActions.TASKS_ARE_ON_ERROR,
});
