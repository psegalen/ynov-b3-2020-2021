/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import "./ListsGrid.css";

const ListsGrid = ({ lists }) => {
  return (
    <div
      className="uk-grid-large uk-child-width-1-3@s uk-text-center lists-root"
      data-uk-grid
    >
      {lists.map((list) => (
        <div key={list.id}>
          <Link
            className="uk-card uk-card-default uk-card-body"
            to={`/tasks/${list.id}`}
          >
            <div
              className="list-color"
              style={{ backgroundColor: `#${list.color}` }}
            ></div>
            <h4>{list.title}</h4>
            <h6>
              {list.taskCount > 0
                ? `${list.taskCount} tâche${
                    list.taskCount > 1 ? "s" : ""
                  }`
                : "Vide"}
            </h6>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListsGrid;
