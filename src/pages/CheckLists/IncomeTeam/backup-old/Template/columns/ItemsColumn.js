import React from "react";

export default function ItemsColumn({ 
  task, 
  isEditing, 
  onStartEdit, 
  onChange, 
  onStopEdit 
}) {
  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    onChange(task.id, 'items', value);
  };

  return (
    <td className="editable-cell items-column">
      {isEditing ? (
        <input
          type="text"
          value={task.items || ''}
          onChange={handleChange}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input items-input"
          placeholder="123"
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'items')}
          className="cell-content"
        >
          {task.items || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}