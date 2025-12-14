import React from "react";

export default function ShortNameColumn({ 
  task, 
  isEditing, 
  onStartEdit, 
  onChange, 
  onStopEdit 
}) {
  return (
    <td className="editable-cell shortname-column">
      {isEditing ? (
        <input
          type="text"
          value={task.shortName || ''}
          onChange={(e) => onChange(task.id, 'shortName', e.target.value)}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input"
          placeholder="Short name"
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'shortName')}
          className="cell-content"
        >
          {task.shortName || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}