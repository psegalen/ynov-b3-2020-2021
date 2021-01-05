/* eslint-disable jsx-a11y/anchor-is-valid */
import "./ListsGrid.css";

const ListsGrid = ({ lists, showTasks }) => {
  return (
    <div
      class="uk-grid-large uk-child-width-1-3@s uk-text-center lists-root"
      data-uk-grid
    >
      {lists.map((list) => (
        <div>
          <a
            href="#"
            class="uk-card uk-card-default uk-card-body"
            onClick={() => showTasks(list)}
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
          </a>
        </div>
      ))}
    </div>
  );
};

export default ListsGrid;
