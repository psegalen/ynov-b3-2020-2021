/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import "./App.css";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

const TodoModes = {
  LIST: "TODO-LIST",
  NEW: "NEW-TODO",
};

const App = () => {
  const initialTasks = [
    { id: "0", title: "Learn HTML", isCompleted: true },
    { id: "1", title: "Learn CSS", isCompleted: true },
    { id: "2", title: "Learn JavaScript", isCompleted: true },
    { id: "3", title: "Learn React", isCompleted: false },
    { id: "4", title: "Learn React Native", isCompleted: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [mode, setMode] = useState(TodoModes.LIST);

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
    setTasks(
      tasks
        .slice(0, taskIndex)
        .concat(tasks.slice(taskIndex + 1, tasks.length))
    );
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
