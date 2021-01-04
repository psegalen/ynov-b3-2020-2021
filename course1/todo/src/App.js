/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import apiHelper from "./apiHelper";
import "./App.css";
import NewTask from "./Tasks/NewTask";
import TasksList from "./Tasks/TasksList";

const TodoModes = {
  LOADING: "TODO-LOADING",
  LIST: "TODO-LIST",
  NEW: "NEW-TODO",
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState(TodoModes.LOADING);
  useEffect(() => {
    apiHelper.getTasks().then((apiTasks) => {
      setTasks(apiTasks);
      setMode(TodoModes.LIST);
    });
  }, []);
  useEffect(() => {
    if (mode !== TodoModes.LOADING) {
      console.log("Tasks changed, synchronizing...");
      localStorage.setItem("TODO_TASKS", JSON.stringify(tasks));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const toggleIsCompleted = (task) => {
    apiHelper.toggleTask(task).then((modifiedTask) => {
      const newTasks = tasks.slice();
      const taskIndex = tasks.findIndex(
        (stateTask) => stateTask.id === task.id
      );
      newTasks[taskIndex] = modifiedTask;
      setTasks(newTasks);
    });
  };
  const deleteTask = (task) => {
    apiHelper.deleteTask(task).then((success) => {
      if (success) {
        const taskIndex = tasks.findIndex(
          (stateTask) => stateTask.id === task.id
        );
        const newTasks = tasks
          .slice(0, taskIndex)
          .concat(tasks.slice(taskIndex + 1, tasks.length));
        setTasks(newTasks);
      } else {
        alert("La suppression est impossible sur le serveur");
      }
    });
  };
  const addTask = (title) => {
    apiHelper.createTask(title).then((addedTask) => {
      const newTasks = tasks.slice();
      newTasks.push(addedTask);
      setTasks(newTasks);
      setMode(TodoModes.LIST);
    });
  };

  let body =
    tasks.length === 0 ? (
      <div className="no-task">Pas de tâche à afficher</div>
    ) : (
      <TasksList
        tasks={tasks}
        toggleIsCompleted={toggleIsCompleted}
        deleteTask={deleteTask}
      />
    );
  if (mode === TodoModes.NEW) {
    body = (
      <NewTask
        onAddClick={addTask}
        onCancelClick={() => setMode(TodoModes.LIST)}
      />
    );
  } else if (mode === TodoModes.LOADING) {
    body = <div data-uk-spinner className="todo-spinner"></div>;
  }

  return (
    <div className="App">
      <h1>Mes choses à faire</h1>
      <hr />
      {body}
      {mode === TodoModes.NEW ? undefined : (
        <a href="#" onClick={() => setMode(TodoModes.NEW)}>
          + Nouvelle tâche
        </a>
      )}
    </div>
  );
};

export default App;
