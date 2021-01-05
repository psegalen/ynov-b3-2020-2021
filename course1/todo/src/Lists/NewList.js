import { useState } from "react";
import "../Tasks/NewTask.css";

const NewList = ({ onCancelClick, onAddClick }) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("000000");

  return (
    <div className="new-task-root">
      <h4>Ajout d'une nouvelle liste</h4>
      <div>
        Titre de la liste :
        <input
          type="text"
          className="new-task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        Couleur de la liste :
        <input
          type="color"
          className="new-task-title"
          value={`#${color}`}
          onChange={(e) => setColor(e.target.value.substr(1))}
        />
      </div>
      <div className="new-task-buttons">
        <button onClick={onCancelClick}>Annuler</button>
        <button onClick={() => onAddClick(title, color)}>
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default NewList;
