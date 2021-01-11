export const tasksActions = {
  SET_TASKS: "SET_TASKS",
  TASK_TOGGLED: "TASK_TOGGLED",
  TASK_DELETED: "TASK_DELETED",
  TASK_CREATED: "TASK_CREATED",
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
