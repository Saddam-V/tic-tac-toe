import { useState } from "react";
export default function Player({ name, symbol, activePlayer, setGlobalName }) {
  const [editedName, setEditedName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing((editingState) => !editingState);
    if (isEditing) {
      setGlobalName(symbol, editedName);
    }
  }

  function handleChange(event) {
    setEditedName(event.target.value);
  }

  return (
    <li className={activePlayer ? "active" : undefined}>
      <span className="player">
        {isEditing ? <input type="text" value={editedName} onChange={handleChange} /> : <span className="player-name">{editedName}</span>}
        <span>{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
