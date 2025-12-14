import React from "react";

export default function TransactionsColumn({ 
  task, 
  isEditing, 
  onStartEdit, 
  onChange, 
  onStopEdit 
}) {
  return (
    <td className="editable-cell transactions-column">
      {isEditing ? (
        <input
          type="text"
          value={task.transactions || ''}
          onChange={(e) => onChange(task.id, 'transactions', e.target.value)}
          onBlur={onStopEdit}
          onKeyDown={(e) => e.key === 'Enter' && onStopEdit()}
          autoFocus
          className="cell-input"
          placeholder="Trans"
        />
      ) : (
        <div
          onClick={() => onStartEdit(task.id, 'transactions')}
          className="cell-content"
        >
          {task.transactions || <span className="placeholder">-</span>}
        </div>
      )}
    </td>
  );
}