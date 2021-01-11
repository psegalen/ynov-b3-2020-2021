/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiHelper from "../apiHelper";
import { ListsContext } from "../data/ListsContext";
import { TodoModes } from "../utils";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [mode, setMode] = useState(TodoModes.LOADING);
  const { listId } = useParams();
  const { lists, getLists } = useContext(ListsContext);
  const list = lists.find((l) => l.id === listId);

  useEffect(() => {
    getLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showTasks = (listId) => {
    apiHelper.getTasks(listId).then((apiTasks) => {
      if (apiTasks === null) {
        // Server returned an error
        setMode(TodoModes.ERROR);
      } else {
        setTasks(apiTasks);
        setMode(TodoModes.LIST);
      }
    });
  };

  useEffect(() => {
    showTasks(listId);
  }, [listId]);

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
    apiHelper.createTask(title, listId).then((addedTask) => {
      const newTasks = tasks.slice();
      newTasks.push(addedTask);
      setTasks(newTasks);
      setMode(TodoModes.LIST);
      // TODO : maintain taskCount among lists
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
              <li>
                <Link to="/">Toutes les listes</Link>
              </li>
              <hr />
              {lists.map((list) => (
                <li>
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
