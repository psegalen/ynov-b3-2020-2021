import apiHelper from "../apiHelper";
import { taskToggled } from "./tasksActions";

export const toggleTask = (task, listId) => (dispatch) => {
  apiHelper
    .toggleTask(task)
    .then((modifiedTask) =>
      dispatch(taskToggled(modifiedTask, listId))
    );
};
