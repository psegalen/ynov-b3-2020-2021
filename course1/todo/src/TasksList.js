/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import "./TasksList.css";

const TasksList = ({ tasks, toggleIsCompleted }) => {
    return (
        <ul className="uk-list uk-list-striped tasks-list">
            {tasks.map((task) => (
                <li className="task-root">
                    <input type="checkbox" checked={task.isCompleted} onChange={() => toggleIsCompleted(task)} />
                    <span className={`task-title ${task.isCompleted ? "striked" : ""}`}>{task.title}</span>
                    <a href="#" data-uk-icon="icon: trash" aria-label="Supprimer"></a>
                </li>
            ))}
        </ul>
    );
}

export default TasksList;
