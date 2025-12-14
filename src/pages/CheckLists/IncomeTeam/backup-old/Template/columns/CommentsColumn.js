import React from "react";

export default function CommentsColumn({ 
  task, 
  isEditing, 
  onStartEdit, 
  onChange, 
  onStopEdit 
}) {
  return (
    <td className="editable-cell comments-column">
      {isEditing ? (
        <input
          type="text"
          value={task.comments || ''}
          onChange={(e) => onChange(task.id, 'comments', e.target.value)}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input comments-input"
          placeholder="Add comment..."
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'comments')}
          className="cell-content"
        >
          {task.comments || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}