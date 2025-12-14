import React from "react";

export default function CheckColumn({ 
  task, 
  checkKey, 
  onCheckboxClick 
}) {
  const isChecked = task[checkKey];
  
  return (
    <td>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onCheckboxClick(task.id, checkKey)}
        className="table-checkbox"
      />
    </td>
  );
}