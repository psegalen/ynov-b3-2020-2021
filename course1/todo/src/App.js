/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
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
    const storageValue = localStorage.getItem("TODO_TASKS");
    if (storageValue) {
      setTasks(JSON.parse(storageValue));
    }
    setTimeout(() => setMode(TodoModes.LIST), 1000);
  }, []);
  useEffect(() => {
    if (mode !== TodoModes.LOADING) {
      console.log("Tasks changed, synchronizing...");
      localStorage.setItem("TODO_TASKS", JSON.stringify(tasks));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const toggleIsCompleted = (task) => {
    const newTasks = tasks.slice();
    for (let i = 0; i < newTasks.length; i++) {
      const newTask = newTasks[i];
      if (newTask.id === task.id) {
        newTasks[i] = { ...task, isCompleted: !task.isCompleted };
      }
    }
    setTasks(newTasks);
  };
  const deleteTask = (task) => {
    const taskIndex = tasks.findIndex(
      (stateTask) => stateTask.id === task.id
    );
    const newTasks = tasks
      .slice(0, taskIndex)
      .concat(tasks.slice(taskIndex + 1, tasks.length));
    setTasks(newTasks);
  };
  const addTask = (title) => {
    const newTasks = tasks.slice();
    newTasks.push({
      id: `${parseInt(Math.random() * 10000)}`,
      title,
      isCompleted: false,
    });
    setTasks(newTasks);
    setMode(TodoModes.LIST);
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
