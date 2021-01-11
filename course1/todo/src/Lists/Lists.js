/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import apiHelper from "../apiHelper";
import { TodoModes } from "../utils";
import ListsGrid from "./ListsGrid";
import NewList from "./NewList";

const Lists = () => {
  const [mode, setMode] = useState(TodoModes.LOADING);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    apiHelper.getLists().then((apiLists) => {
      setLists(apiLists);
      setMode(TodoModes.LIST);
    });
  }, []);

  const addList = (title, color) => {
    apiHelper.createList(title, color).then((addedList) => {
      const newLists = lists.slice();
      newLists.push(addedList);
      setLists(newLists);
      setMode(TodoModes.LIST);
    });
  };

  let body =
    lists.length === 0 ? (
      <div className="no-task">Pas de liste à afficher</div>
    ) : (
      <ListsGrid lists={lists} />
    );

  if (mode === TodoModes.NEW) {
    body = (
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
      <h1>Mes listes de choses à faire</h1>
      <hr />
      {body}
      {mode === TodoModes.NEW ? undefined : (
        <a href="#" onClick={() => setMode(TodoModes.NEW)}>
          + Nouvelle liste
        </a>
      )}
    </div>
  );
};

export default Lists;
