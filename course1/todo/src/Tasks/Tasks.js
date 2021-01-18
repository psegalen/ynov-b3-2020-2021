/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchLists } from "../data/listsEffects";
import {
  addTask,
  deleteTask,
  fetchTasks,
  toggleTask,
} from "../data/tasksEffects";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

const Tasks = () => {
  const dispatch = useDispatch();
  const [isNew, setIsNew] = useState(false);
  const { listId } = useParams();
  const lists = useSelector((state) => state.lists.data);
  const tasks =
    useSelector((state) => state.tasks.data[listId]) || [];
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const isOnError = useSelector((state) => state.tasks.isOnError);
  const list = lists.find((l) => l.id === listId);

  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  useEffect(() => {
    dispatch(fetchTasks(listId));
  }, [listId]);

  let body = undefined;
  if (isNew) {
    body = (
      <NewTask
        onAddClick={(title) => {
          dispatch(addTask(title, listId));
          setIsNew(false);
        }}
        onCancelClick={() => setIsNew(false)}
      />
    );
  } else if (isLoading) {
    body = <div data-uk-spinner className="todo-spinner"></div>;
  } else if (isOnError) {
    body = <div className="no-task">Une erreur est survenue</div>;
  } else if (tasks.length === 0) {
    body = <div className="no-task">Pas de tâche à afficher</div>;
  } else {
    body = (
      <TasksList
        tasks={tasks}
        toggleIsCompleted={(task) =>
          dispatch(toggleTask(task, listId))
        }
        deleteTask={(task) => dispatch(deleteTask(task, listId))}
      />
    );
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
      {isNew ? undefined : (
        <a href="#" onClick={() => setIsNew(true)}>
          + Nouvelle tâche
        </a>
      )}
    </div>
  );
};

export default Tasks;
