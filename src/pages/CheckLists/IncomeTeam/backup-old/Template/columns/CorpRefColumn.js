import React from "react";

export default function CorpRefColumn({ 
  task, 
  isEditing, 
  onStartEdit, 
  onChange, 
  onStopEdit 
}) {
  return (
    <td className="editable-cell corpref-column">
      {isEditing ? (
        <input
          type="text"
          value={task.corpRef || ''}
          onChange={(e) => onChange(task.id, 'corpRef', e.target.value)}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input"
          placeholder="Corp ref"
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'corpRef')}
          className="cell-content"
        >
          {task.corpRef || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}