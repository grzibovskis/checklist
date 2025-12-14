import React from "react";

export default function TimeColumn({ 
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
          value={task.time}
          onChange={(e) => onChange(task.id, 'time', e.target.value)}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input"
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'time')}
          className="cell-content"
        >
          {task.time || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}