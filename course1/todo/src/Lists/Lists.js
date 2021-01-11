/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiHelper from "../apiHelper";
import { addNewList, setLists } from "../data/listsActions";
import { TodoModes } from "../utils";
import ListsGrid from "./ListsGrid";
import NewList from "./NewList";

const Lists = () => {
  const [mode, setMode] = useState(TodoModes.LOADING);
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.data);
  const lastFetch = useSelector((state) => state.lists.lastFetchDate);

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
        setMode(TodoModes.LIST);
      });
    } else {
      setMode(TodoModes.LIST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addList = (title, color) => {
    apiHelper.createList(title, color).then((addedList) => {
      dispatch(addNewList(addedList));
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
