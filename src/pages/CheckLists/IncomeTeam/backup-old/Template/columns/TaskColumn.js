import React from "react";

export default function TaskColumn({ 
  task, 
  isEditing, 
  onStartEdit, 
  onChange, 
  onStopEdit 
}) {
  return (
    <td className="editable-cell task-column"> {/* Added task-column class */}
      {isEditing ? (
        <textarea
          value={task.task}
          onChange={(e) => onChange(task.id, 'task', e.target.value)}
          onBlur={onStopEdit}
          className="cell-input"
          autoFocus
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'task')}
          className="cell-content"
        >
          {task.task || <span className="placeholder">Enter task description</span>}
        </div>
      )}
    </td>
  );
}