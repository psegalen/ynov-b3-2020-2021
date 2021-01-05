/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import apiHelper from "./apiHelper";
import "./App.css";
import ListsGrid from "./Lists/ListsGrid";
import NewList from "./Lists/NewList";
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
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  useEffect(() => {
    apiHelper.getLists().then((apiLists) => {
      setLists(apiLists);
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

  const showTasks = (list) => {
    apiHelper.getTasks(list.id).then((apiTasks) => {
      setTasks(apiTasks);
      setSelectedList(list);
      setMode(TodoModes.LIST);
    });
  };

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
        // TODO : maintain taskCount among lists
      } else {
        alert("La suppression est impossible sur le serveur");
      }
    });
  };
  const addTask = (title) => {
    apiHelper.createTask(title, selectedList.id).then((addedTask) => {
      const newTasks = tasks.slice();
      newTasks.push(addedTask);
      setTasks(newTasks);
      setMode(TodoModes.LIST);
      // TODO : maintain taskCount among lists
    });
  };
  const addList = (title, color) => {
    apiHelper.createList(title, color).then((addedList) => {
      const newLists = lists.slice();
      newLists.push(addedList);
      setLists(newLists);
      setMode(TodoModes.LIST);
    });
  };

  let body =
    (tasks.length === 0 && selectedList) ||
    (lists.length === 0 && !selectedList) ? (
      <div className="no-task">
        Pas de {selectedList ? "tâche" : "liste"} à afficher
      </div>
    ) : selectedList ? (
      <TasksList
        tasks={tasks}
        toggleIsCompleted={toggleIsCompleted}
        deleteTask={deleteTask}
      />
    ) : (
      <ListsGrid lists={lists} showTasks={showTasks} />
    );
  if (mode === TodoModes.NEW) {
    body = selectedList ? (
      <NewTask
        onAddClick={addTask}
        onCancelClick={() => setMode(TodoModes.LIST)}
      />
    ) : (
      <NewList
        onAddClick={addList}
        onCancelClick={() => setMode(TodoModes.LIST)}
      />
    );
  } else if (mode === TodoModes.LOADING) {
    body = <div data-uk-spinner className="todo-spinner"></div>;
  }

  return (
    <div className="App">
      <h1>Mes {selectedList ? "" : "listes de"} choses à faire</h1>
      <hr />
      {body}
      {mode === TodoModes.NEW ? undefined : (
        <a href="#" onClick={() => setMode(TodoModes.NEW)}>
          + Nouvelle {selectedList ? "tâche" : "liste"}
        </a>
      )}
    </div>
  );
};

export default App;
