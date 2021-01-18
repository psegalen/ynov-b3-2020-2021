/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList, fetchLists } from "../data/listsEffects";
import ListsGrid from "./ListsGrid";
import NewList from "./NewList";

const Lists = () => {
  const dispatch = useDispatch();
  const [isNew, setIsNew] = useState(false);
  const lists = useSelector((state) => state.lists.data);
  const isLoading = useSelector((state) => state.lists.isLoading);

  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  let body = undefined;

  if (isNew) {
    body = (
      <NewList
        onAddClick={(title, color) => {
          dispatch(addList(title, color));
          setIsNew(false);
        }}
        onCancelClick={() => setIsNew(false)}
      />
    );
  } else if (isLoading) {
    body = <div data-uk-spinner className="todo-spinner"></div>;
  } else if (lists.length === 0) {
    body = <div className="no-task">Pas de liste à afficher</div>;
  } else {
    body = <ListsGrid lists={lists} />;
  }

  return (
    <div className="App">
      <h1>Mes listes de choses à faire</h1>
      <hr />
      {body}
      {isNew ? undefined : (
        <a href="#" onClick={() => setIsNew(true)}>
          + Nouvelle liste
        </a>
      )}
    </div>
  );
};

export default Lists;
