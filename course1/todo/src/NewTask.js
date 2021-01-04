import { useState } from "react";
import "./NewTask.css";

const NewTask = ({ onCancelClick, onAddClick }) => {
  const [title, setTitle] = useState("");

  return (
    <div className="new-task-root">
      <h4>Ajout d'une nouvelle tâche</h4>
      <div>
        Titre de la tâche :
        <input
          type="text"
          className="new-task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="new-task-buttons">
        <button onClick={onCancelClick}>Annuler</button>
        <button onClick={() => onAddClick(title)}>Ajouter</button>
      </div>
    </div>
  );
};

export default NewTask;
