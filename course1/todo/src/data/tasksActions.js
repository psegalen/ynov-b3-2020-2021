export const tasksActions = {
  SET_TASKS: "SET_TASKS",
};

export const setTasks = (tasks, listId) => ({
  type: tasksActions.SET_TASKS,
  tasks,
  listId,
});
