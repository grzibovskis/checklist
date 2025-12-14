import React from "react";

export default function IsinColumn({ 
  task, 
  isEditing, 
  onStartEdit, 
  onChange, 
  onStopEdit 
}) {
  return (
    <td className="editable-cell isin-column">
      {isEditing ? (
        <input
          type="text"
          value={task.isin || ''}
          onChange={(e) => onChange(task.id, 'isin', e.target.value)}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input"
          placeholder="ISIN code"
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'isin')}
          className="cell-content"
        >
          {task.isin || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}