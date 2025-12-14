import React, { useState, useRef, useEffect, useCallback } from "react";
import "./componentIncomeTeam.css";

export default function ComponentIncomeTeam({ data }) {
  // Use the storageKey from parent component for localStorage
  const storageKey = data?.storageKey || 
                   (data?.label ? `checklist_${data.label.replace(/\//g, '-')}` : null);
  
  // Load tasks for this specific date from localStorage
  const loadTasksForDate = useCallback(() => {
    if (!storageKey) return [
      { 
        id: 1, 
        time: "", 
        task: "", 
        duality: "", 
        checkbox1: false, 
        primary: "", 
        checkbox2: false,
        checkbox1Logs: [],
        checkbox2Logs: []
      }
    ];

    const savedTasks = localStorage.getItem(storageKey);
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error("Error parsing saved tasks:", error);
      }
    }

    return [
      { 
        id: 1, 
        time: "", 
        task: "", 
        duality: "", 
        checkbox1: false, 
        primary: "", 
        checkbox2: false,
        checkbox1Logs: [],
        checkbox2Logs: []
      }
    ];
  }, [storageKey]);

  const [tasks, setTasks] = useState(() => loadTasksForDate());
  const [editingCell, setEditingCell] = useState({ rowId: null, cellKey: null });
  const [checkboxPopup, setCheckboxPopup] = useState({
    show: false,
    rowId: null,
    checkboxKey: null,
    isChecked: false,
    logs: []
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    }
  }, [tasks, storageKey]);

  // Reset tasks when date changes (when data prop changes)
  useEffect(() => {
    if (storageKey) {
      const loadedTasks = loadTasksForDate();
      setTasks(loadedTasks);
      setEditingCell({ rowId: null, cellKey: null });
      setCheckboxPopup({
        show: false,
        rowId: null,
        checkboxKey: null,
        isChecked: false,
        logs: []
      });
    }
  }, [storageKey]); // Changed dependency from dateKey to storageKey

  const handleCellChange = (rowId, cellKey, value) => {
    setTasks(prev => prev.map(task => 
      task.id === rowId ? { ...task, [cellKey]: value } : task
    ));
  };

  const handleCheckboxClick = (rowId, checkboxKey) => {
    const task = tasks.find(t => t.id === rowId);
    if (!task) return;
    
    const currentValue = task[checkboxKey];
    
    if (currentValue) {
      // Checkbox is currently checked - show popup for unchecking
      const logs = task[`${checkboxKey}Logs`] || [];
      setCheckboxPopup({
        show: true,
        rowId,
        checkboxKey,
        isChecked: currentValue,
        logs
      });
    } else {
      // Checkbox is currently unchecked - check it immediately
      toggleCheckbox(rowId, checkboxKey, "Current User", new Date().toISOString());
    }
  };

  const toggleCheckbox = (rowId, checkboxKey, userName, timestamp) => {
    setTasks(prev => prev.map(task => {
      if (task.id === rowId) {
        const newValue = !task[checkboxKey];
        const logsKey = `${checkboxKey}Logs`;
        const newLog = {
          userName,
          timestamp,
          action: newValue ? "checked" : "unchecked"
        };
        
        return {
          ...task,
          [checkboxKey]: newValue,
          [logsKey]: [...(task[logsKey] || []), newLog]
        };
      }
      return task;
    }));
  };

  const removeCheckboxTick = () => {
    if (checkboxPopup.rowId && checkboxPopup.checkboxKey) {
      toggleCheckbox(
        checkboxPopup.rowId, 
        checkboxPopup.checkboxKey, 
        "Current User", 
        new Date().toISOString()
      );
    }
    closeCheckboxPopup();
  };

  const closeCheckboxPopup = () => {
    setCheckboxPopup({
      show: false,
      rowId: null,
      checkboxKey: null,
      isChecked: false,
      logs: []
    });
  };

  const addNewTask = () => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    setTasks(prev => [
      ...prev,
      { 
        id: newId, 
        time: "", 
        task: "", 
        duality: "", 
        checkbox1: false, 
        primary: "", 
        checkbox2: false,
        checkbox1Logs: [],
        checkbox2Logs: []
      }
    ]);
  };

  const deleteTask = (rowId) => {
    if (tasks.length > 1) {
      setTasks(prev => prev.filter(task => task.id !== rowId));
    } else {
      alert("You must have at least one task");
    }
  };

  const startEditing = (rowId, cellKey) => {
    setEditingCell({ rowId, cellKey });
  };

  const stopEditing = () => {
    setEditingCell({ rowId: null, cellKey: null });
  };

  const handleAction = (action, rowId) => {
    switch(action) {
      case 'New Task':
        addNewTask();
        break;
      case 'Delete Task':
        deleteTask(rowId);
        break;
      case 'Items':
      case 'Events':
      case 'Comments':
      case 'Attach file':
      case 'Deactivate':
        console.log(`${action} clicked for row ${rowId}`);
        // You can implement these functions later
        break;
      default:
        break;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="component-income-team">
      <h2>Checklist Details</h2>
      <p>Date: {data?.label || "No date provided"}</p>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Time</th>
              <th style={{ width: '550px' }}>Task</th>
              <th style={{ width: '50px' }}>Duality</th>
              <th style={{ width: '30px' }}>Checkbox</th>
              <th style={{ width: '50px' }}>Primary</th>
              <th style={{ width: '30px' }}>Checkbox</th>
              <th style={{ width: '120px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                {/* Time Cell */}
                <td className="editable-cell">
                  {editingCell.rowId === task.id && editingCell.cellKey === 'time' ? (
                    <input
                      type="text"
                      value={task.time}
                      onChange={(e) => handleCellChange(task.id, 'time', e.target.value)}
                      onBlur={stopEditing}
                      onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                      autoFocus
                      className="cell-input"
                    />
                  ) : (
                    <div
                      onClick={() => startEditing(task.id, 'time')}
                      className="cell-content"
                    >
                      {task.time || <span className="placeholder">Enter time</span>}
                    </div>
                  )}
                </td>

                {/* Task Cell */}
                <td className="editable-cell">
                  {editingCell.rowId === task.id && editingCell.cellKey === 'task' ? (
                    <textarea
                      value={task.task}
                      onChange={(e) => handleCellChange(task.id, 'task', e.target.value)}
                      onBlur={stopEditing}
                      className="cell-input"
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() => startEditing(task.id, 'task')}
                      className="cell-content"
                    >
                      {task.task || <span className="placeholder">Enter task description</span>}
                    </div>
                  )}
                </td>

                {/* Duality Cell */}
                <td className="editable-cell">
                  {editingCell.rowId === task.id && editingCell.cellKey === 'duality' ? (
                    <input
                      type="text"
                      value={task.duality}
                      onChange={(e) => handleCellChange(task.id, 'duality', e.target.value)}
                      onBlur={stopEditing}
                      onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                      autoFocus
                      className="cell-input"
                    />
                  ) : (
                    <div
                      onClick={() => startEditing(task.id, 'duality')}
                      className="cell-content"
                    >
                      {task.duality || <span className="placeholder">-</span>}
                    </div>
                  )}
                </td>

                {/* First Checkbox */}
                <td>
                  <input
                    type="checkbox"
                    checked={task.checkbox1}
                    onChange={() => handleCheckboxClick(task.id, 'checkbox1')}
                    className="table-checkbox"
                  />
                </td>

                {/* Primary Cell */}
                <td className="editable-cell">
                  {editingCell.rowId === task.id && editingCell.cellKey === 'primary' ? (
                    <input
                      type="text"
                      value={task.primary}
                      onChange={(e) => handleCellChange(task.id, 'primary', e.target.value)}
                      onBlur={stopEditing}
                      onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
                      autoFocus
                      className="cell-input"
                    />
                  ) : (
                    <div
                      onClick={() => startEditing(task.id, 'primary')}
                      className="cell-content"
                    >
                      {task.primary || <span className="placeholder">-</span>}
                    </div>
                  )}
                </td>

                {/* Second Checkbox */}
                <td>
                  <input
                    type="checkbox"
                    checked={task.checkbox2}
                    onChange={() => handleCheckboxClick(task.id, 'checkbox2')}
                    className="table-checkbox"
                  />
                </td>

                {/* Action Button with Dropdown */}
                <td>
                  <ActionDropdown 
                    rowId={task.id} 
                    onAction={handleAction}
                    isFirstRow={index === 0}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Checkbox Popup */}
      {checkboxPopup.show && (
        <div className="checkbox-popup-overlay">
          <div className="checkbox-popup">
            <div className="checkbox-popup-header">
              <h3>Checkbox Details</h3>
              <button className="close-popup" onClick={closeCheckboxPopup}>×</button>
            </div>
            
            <div className="checkbox-popup-content">
              <div className="checkbox-history">
                <h4>History:</h4>
                {checkboxPopup.logs.length > 0 ? (
                  <div className="history-list">
                    {checkboxPopup.logs.map((log, index) => (
                      <div key={index} className="history-item">
                        <span className="history-user">{log.userName}</span>
                        <span className="history-action">{log.action}</span>
                        <span className="history-time">{formatTimestamp(log.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-history">No history available</p>
                )}
              </div>
              
              <div className="checkbox-popup-actions">
                <button 
                  className="popup-btn remove-btn"
                  onClick={removeCheckboxTick}
                >
                  Remove Tick ✓
                </button>
                <button 
                  className="popup-btn cancel-btn"
                  onClick={closeCheckboxPopup}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Action Dropdown Component (unchanged from your version)
function ActionDropdown({ rowId, onAction, isFirstRow }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const actions = [
    'Items',
    'Events',
    'Comments',
    'Attach file',
    'Deactivate',
    'New Task',
    'Delete Task'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate dropdown position
  const getDropdownPosition = () => {
    if (!buttonRef.current) return {};
    
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      position: 'fixed',
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.right - 150 + window.scrollX}px`,
      zIndex: 1001
    };
  };

  return (
    <div className="action-dropdown">
      <button 
        ref={buttonRef}
        className="action-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⋮
      </button>
      {isOpen && (
        <>
          <div 
            ref={dropdownRef}
            className="dropdown-menu"
            style={getDropdownPosition()}
          >
            {actions.map((action) => (
              <button
                key={action}
                className="dropdown-item"
                onClick={() => {
                  onAction(action, rowId);
                  setIsOpen(false);
                }}
                disabled={isFirstRow && action === 'Delete Task'}
              >
                {action}
              </button>
            ))}
          </div>
          <div 
            className="dropdown-backdrop" 
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}