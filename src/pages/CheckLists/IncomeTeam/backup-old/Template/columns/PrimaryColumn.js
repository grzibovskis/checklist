import React from "react";

export default function PrimaryColumn({ 
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
          value={task.primary}
          onChange={(e) => onChange(task.id, 'primary', e.target.value)}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input"
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'primary')}
          className="cell-content"
        >
          {task.primary || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}