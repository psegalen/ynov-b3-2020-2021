/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import apiHelper from "../apiHelper";
import { setLists } from "../data/listsActions";
import { setTasks } from "../data/tasksActions";
import { TodoModes } from "../utils";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

const Tasks = () => {
  const [mode, setMode] = useState(TodoModes.LOADING);
  const { listId } = useParams();
  const lists = useSelector((state) => state.lists.data);
  const list = lists.find((l) => l.id === listId);
  const dispatch = useDispatch();
  const lastFetch = useSelector((state) => state.lists.lastFetchDate);
  const tasks =
    useSelector((state) => state.tasks.data[listId]) || [];

  useEffect(() => {
    const tenMinutes = 10 * 60 * 1000;
    if (
      lists.length === 0 ||
      lastFetch === null ||
      lastFetch < new Date().getTime() - tenMinutes
    ) {
      apiHelper.getLists().then((apiLists) => {
        // Dispatch setlists action
        dispatch(setLists(apiLists));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showTasks = (listId) => {
    apiHelper.getTasks(listId).then((apiTasks) => {
      if (apiTasks === null) {
        // Server returned an error
        setMode(TodoModes.ERROR);
      } else {
        dispatch(setTasks(apiTasks, listId));
        setMode(TodoModes.LIST);
      }
    });
  };

  useEffect(() => {
    showTasks(listId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const toggleIsCompleted = (task) => {
    apiHelper.toggleTask(task).then((modifiedTask) => {
      // TODO : dispatch a dedicated action
    });
  };
  const deleteTask = (task) => {
    apiHelper.deleteTask(task).then((success) => {
      if (success) {
        // TODO : dispatch a dedicated action
        // TODO : maintain taskCount among lists
      } else {
        alert("La suppression est impossible sur le serveur");
      }
    });
  };
  const addTask = (title) => {
    apiHelper.createTask(title, listId).then((addedTask) => {
      // TODO : dispatch a dedicated action
      // TODO : maintain taskCount among lists
      setMode(TodoModes.LIST);
    });
  };

  let body =
    mode === TodoModes.ERROR ? (
      <div className="no-task">Une erreur est survenue</div>
    ) : tasks.length === 0 ? (
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
      <div className="App-header">
        <h1>Mes choses à faire</h1>
        <div className="uk-inline">
          <button
            className="uk-button uk-button-default"
            type="button"
          >
            Listes
          </button>
          <div data-uk-dropdown="pos: bottom-right">
            <ul className="uk-list">
              <li key="allLists">
                <Link to="/">Toutes les listes</Link>
              </li>
              <hr />
              {lists.map((list) => (
                <li key={list.id}>
                  <Link to={`/tasks/${list.id}`}>{list.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <hr />
      {list ? (
        <div className="list-name">
          <h2
            style={{ color: `#${list.color}`, textAlign: "center" }}
          >
            {list.title}
          </h2>
        </div>
      ) : undefined}
      {body}
      {mode === TodoModes.NEW ? undefined : (
        <a href="#" onClick={() => setMode(TodoModes.NEW)}>
          + Nouvelle tâche
        </a>
      )}
    </div>
  );
};

export default Tasks;
