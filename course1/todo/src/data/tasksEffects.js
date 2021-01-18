import apiHelper from "../apiHelper";
import {
  setTasks,
  taskCreated,
  taskDeleted,
  tasksAreLoading,
  tasksAreOnError,
  taskToggled,
} from "./tasksActions";

export const toggleTask = (task, listId) => (dispatch) => {
  dispatch(tasksAreLoading());
  apiHelper
    .toggleTask(task)
    .then((modifiedTask) =>
      dispatch(taskToggled(modifiedTask, listId))
    );
};

export const addTask = (title, listId) => (dispatch) => {
  dispatch(tasksAreLoading());
  apiHelper.createTask(title, listId).then((addedTask) => {
    dispatch(taskCreated(addedTask, listId));
  });
};

export const deleteTask = (task, listId) => (dispatch) => {
  dispatch(tasksAreLoading());
  apiHelper.deleteTask(task).then((success) => {
    if (success) {
      dispatch(taskDeleted(task, listId));
    } else {
      alert("La suppression est impossible sur le serveur");
    }
  });
};

export const fetchTasks = (listId) => (dispatch) => {
  dispatch(tasksAreLoading());
  apiHelper.getTasks(listId).then((apiTasks) => {
    if (apiTasks === null) {
      // Server returned an error
      dispatch(tasksAreOnError());
    } else {
      dispatch(setTasks(apiTasks, listId));
    }
  });
};
