/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import "./TasksList.css";

const TasksList = ({ tasks, toggleIsCompleted, deleteTask }) => {
  return (
    <ul className="uk-list uk-list-striped tasks-list">
      {tasks.map((task) => (
        <li className="task-root" key={task.id}>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleIsCompleted(task)}
          />
          <span
            className={`task-title ${
              task.isCompleted ? "striked" : ""
            }`}
          >
            {task.title}
          </span>
          <a
            href="#"
            data-uk-icon="icon: trash"
            aria-label="Supprimer"
            onClick={() => {
              if (
                confirm(
                  "Etes-vous certain de vouloir supprimer cette tâche ?"
                )
              ) {
                deleteTask(task);
              }
            }}
          ></a>
        </li>
      ))}
    </ul>
  );
};

export default TasksList;
