import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import TimeColumn from "./columns/TimeColumn";
import TaskColumn from "./columns/TaskColumn";
import PrimaryColumn from "./columns/PrimaryColumn";
import CheckColumn from "./columns/CheckColumn";
import DualityColumn from "./columns/DualityColumn";
import ItemsColumn from "./columns/ItemsColumn";
import CommentsColumn from "./columns/CommentsColumn";
import ShortNameColumn from "./columns/ShortNameColumn";
import IsinColumn from "./columns/IsinColumn";
import CorpRefColumn from "./columns/CorpRefColumn";
import TransactionsColumn from "./columns/TransactionsColumn";
import ActionsColumn from "./columns/ActionsColumn";
import CheckboxPopup from "./columns/CheckboxPopup";
import TableHeader from "./columns/TableHeader";
import "./incomeTeamTemplate.css";

export default function IncomeTeamTemplate({ user }) {
  // State
  const [tasks, setTasks] = useState([getDefaultTask()]);
  const [editingCell, setEditingCell] = useState({ rowId: null, cellKey: null });
  const [checkboxPopup, setCheckboxPopup] = useState({
    show: false,
    rowId: null,
    checkboxKey: null,
    logs: []
  });

  // Constants
  const storageKey = "income_team_template";

  // Helper Functions
  function getDefaultTask(id = 1) {
    return {
      id,
      time: "",
      task: "",
      primary: "",
      check1: false,
      duality: "",
      check2: false,
      items: "", // New field
      comments: "", // New field
      shortName: "", // New field
      isin: "", // New field
      corpRef: "", // New field
      transactions: "", // New field
      check1Logs: [],
      check2Logs: []
    };
  }

  // Effects
  useEffect(() => {
    const savedTasks = localStorage.getItem(storageKey);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Error parsing saved tasks:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks]);

  // Handler Functions
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
      const logs = task[`${checkboxKey}Logs`] || [];
      setCheckboxPopup({
        show: true,
        rowId,
        checkboxKey,
        logs
      });
    } else {
      toggleCheckbox(rowId, checkboxKey);
    }
  };

  const toggleCheckbox = (rowId, checkboxKey) => {
    setTasks(prev => prev.map(task => {
      if (task.id === rowId) {
        const newValue = !task[checkboxKey];
        const logsKey = `${checkboxKey}Logs`;
        const newLog = {
          userName: user?.username || user?.name || "Current User",
          timestamp: new Date().toISOString(),
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
      toggleCheckbox(checkboxPopup.rowId, checkboxPopup.checkboxKey);
    }
    closeCheckboxPopup();
  };

  const closeCheckboxPopup = () => {
    setCheckboxPopup({
      show: false,
      rowId: null,
      checkboxKey: null,
      logs: []
    });
  };

  const addNewTask = () => {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    setTasks(prev => [...prev, getDefaultTask(newId)]);
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
    const isAdmin = user?.role === 'admin' || user?.isAdmin;
    
    // Only admin can click on Attach file, Deactivate
    const adminActions = ['Attach file', 'Deactivate'];
    
    if (adminActions.includes(action) && !isAdmin) {
      alert("Only administrators can perform this action");
      return;
    }

    switch(action) {
      case 'New Task':
        addNewTask();
        break;
      case 'Delete Task':
        deleteTask(rowId);
        break;
      case 'Attach file':
        handleAttachFile(rowId);
        break;
      case 'Deactivate':
        handleDeactivate(rowId);
        break;
      default:
        break;
    }
  };

  const handleAttachFile = (rowId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.png';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`File "${file.name}" attached to task ${rowId}`);
      }
    };
    
    input.click();
  };

  const handleDeactivate = (rowId) => {
    if (window.confirm("Are you sure you want to deactivate this task?")) {
      setTasks(prev => prev.map(task => 
        task.id === rowId ? { ...task, active: false } : task
      ));
      alert(`Task ${rowId} has been deactivated`);
    }
  };

  // Check if cell is being edited
  const isEditing = (rowId, cellKey) => {
    return editingCell.rowId === rowId && editingCell.cellKey === cellKey;
  };

  return (
    <div className="income-team-template-page-container">
      <Header user={user} showBack={true} backRoute="/income-team" />
      
      <div className="income-team-template-content">
        <div className="template-header">
          <h1>Template Page - Income</h1>
          <button className="add-task-button" onClick={addNewTask}>
            + Add Task
          </button>
        </div>

        <div className="table-container">
          <table className="income-template-table">
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <TimeColumn
                    task={task}
                    isEditing={isEditing(task.id, 'time')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <TaskColumn
                    task={task}
                    isEditing={isEditing(task.id, 'task')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <PrimaryColumn
                    task={task}
                    isEditing={isEditing(task.id, 'primary')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <CheckColumn
                    task={task}
                    checkKey="check1"
                    onCheckboxClick={handleCheckboxClick}
                  />
                  
                  <DualityColumn
                    task={task}
                    isEditing={isEditing(task.id, 'duality')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <CheckColumn
                    task={task}
                    checkKey="check2"
                    onCheckboxClick={handleCheckboxClick}
                  />
                  
                  {/* New columns added here */}
                  <ItemsColumn
                    task={task}
                    isEditing={isEditing(task.id, 'items')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <CommentsColumn
                    task={task}
                    isEditing={isEditing(task.id, 'comments')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <ShortNameColumn
                    task={task}
                    isEditing={isEditing(task.id, 'shortName')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <IsinColumn
                    task={task}
                    isEditing={isEditing(task.id, 'isin')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <CorpRefColumn
                    task={task}
                    isEditing={isEditing(task.id, 'corpRef')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <TransactionsColumn
                    task={task}
                    isEditing={isEditing(task.id, 'transactions')}
                    onStartEdit={startEditing}
                    onChange={handleCellChange}
                    onStopEdit={stopEditing}
                  />
                  
                  <ActionsColumn
                    rowId={task.id}
                    isFirstRow={index === 0}
                    user={user}
                    onAction={handleAction}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CheckboxPopup
          show={checkboxPopup.show}
          logs={checkboxPopup.logs}
          onRemoveTick={removeCheckboxTick}
          onClose={closeCheckboxPopup}
        />
      </div>

      <Footer />
    </div>
  );
}