import React from "react";

export default function DualityColumn({ 
  task, 
  isEditing, 
  onStartEdit, 
  onChange, 
  onStopEdit 
}) {
  return (
    <td className="editable-cell">
      {isEditing ? (
        <input
          type="text"
          value={task.duality}
          onChange={(e) => onChange(task.id, 'duality', e.target.value)}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input"
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'duality')}
          className="cell-content"
        >
          {task.duality || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}