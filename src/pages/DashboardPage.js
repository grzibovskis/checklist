import React, { useState } from "react";
import "./dashboardPages.css";

export default function DashboardPage({ user }) {
  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <div className="headerLeft">
          <h1 className="dashboardTitle">Task Manager</h1>
          <p className="subtitle">Welcome back, {user.name}! 👋</p>
        </div>
        <div className="headerRight">
          <span className="userInfo">{user.role} • {user.email}</span>
          <button onClick={handleLogout} className="logoutButton">
            Logout
          </button>
        </div>
      </div>
      
      <div className="statsContainer">
        <div className="statCard">
          <h3>Pending Tasks</h3>
          <DataTable>
            {({ rows }) => (
              <p className="statNumber">
                {rows.filter(row => row.primary === null || row.duality === null).length}
              </p>
            )}
          </DataTable>
        </div>
      </div>
      
      <DataTable />
    </div>
  );
}

function DataTable({ children }) {
  const [rows, setRows] = useState([
    { 
      id: 1, 
      time: "09:00", 
      task: "Morning standup meeting with the team", 
      primary: null, 
      duality: null, 
      add: "",
      items: [""],
      events: [
        { isin: "", shortName: "", corpRef: "", transaction: "" }
      ]
    }
  ]);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleCheck = (index, field) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = updatedRows[index][field] 
      ? null 
      : new Date().toLocaleString();
    setRows(updatedRows);
  };

  const handleAddChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].add = value;
    
    // Initialize the appropriate data structure based on selection
    if (value === "Items") {
      updatedRows[index].items = updatedRows[index].items || [""];
      updatedRows[index].events = [];
    } else if (value === "Event") {
      updatedRows[index].events = updatedRows[index].events || [
        { isin: "", shortName: "", corpRef: "", transaction: "" }
      ];
      updatedRows[index].items = [];
    } else {
      updatedRows[index].items = [];
      updatedRows[index].events = [];
    }
    
    setRows(updatedRows);
  };

  const addNewRow = () => {
    const newRow = {
      id: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      task: "",
      primary: null,
      duality: null,
      add: "",
      items: [],
      events: []
    };
    setRows([...rows, newRow]);
  };

  const removeRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const updateTask = (id, newTask) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, task: newTask } : row
    ));
  };

  const updateTime = (id, newTime) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, time: newTime } : row
    ));
  };

  // Items functions
  const addItem = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].items.push("");
    setRows(updatedRows);
  };

  const updateItem = (rowIndex, itemIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].items[itemIndex] = value;
    setRows(updatedRows);
  };

  const removeItem = (rowIndex, itemIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].items.splice(itemIndex, 1);
    setRows(updatedRows);
  };

  // Events functions
  const addEvent = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].events.push({
      isin: "", shortName: "", corpRef: "", transaction: ""
    });
    setRows(updatedRows);
  };

  const updateEvent = (rowIndex, eventIndex, field, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].events[eventIndex][field] = value;
    setRows(updatedRows);
  };

  const removeEvent = (rowIndex, eventIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].events.splice(eventIndex, 1);
    setRows(updatedRows);
  };

  // If children is a function (for pending tasks count), call it with rows
  if (typeof children === 'function') {
    return children({ rows });
  }

  return (
    <div className="tableContainer">
      <div className="tableHeader">
        <h2 className="tableTitle">Task Timeline</h2>
        <div className="controlsContainer">
          <button 
            onClick={() => setIsEditMode(!isEditMode)} 
            className="editButton"
          >
            <span className="editIcon">✏️</span>
            {isEditMode ? "Done Editing" : "Edit"}
          </button>
          
          {isEditMode && (
            <button onClick={addNewRow} className="addButton">
              <span className="plusIcon">+</span>
              Add New Task
            </button>
          )}
        </div>
      </div>

      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr className="tableHeaderRow">
              <th className="th">Time</th>
              <th className="th taskColumn">Task</th>
              <th className="th">Primary</th>
              <th className="th">Duality</th>
              <th className="th">Add</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <React.Fragment key={row.id}>
                <tr className="tableRow">
                  {/* Time Column - Editable */}
                  <td className="td">
                    <input
                      type="text"
                      value={row.time}
                      onChange={(e) => updateTime(row.id, e.target.value)}
                      className="timeInput"
                      placeholder="HH:MM"
                    />
                  </td>

                  {/* Task Column - More space, editable */}
                  <td className="td">
                    <textarea
                      value={row.task}
                      onChange={(e) => updateTask(row.id, e.target.value)}
                      className="taskInput"
                      placeholder="Enter task description..."
                      rows={2}
                    />
                  </td>

                  {/* Primary Checkbox */}
                  <td className="td">
                    <div className="checkboxContainer">
                      <label className="checkboxLabel">
                        <input
                          type="checkbox"
                          checked={row.primary !== null}
                          onChange={() => handleCheck(index, "primary")}
                          className="hiddenCheckbox"
                        />
                        <span className="checkmark"></span>
                      </label>
                      {row.primary && (
                        <span className="timestamp">{row.primary}</span>
                      )}
                    </div>
                  </td>

                  {/* Duality Checkbox */}
                  <td className="td">
                    <div className="checkboxContainer">
                      <label className="checkboxLabel">
                        <input
                          type="checkbox"
                          checked={row.duality !== null}
                          onChange={() => handleCheck(index, "duality")}
                          className="hiddenCheckbox"
                        />
                        <span className="checkmark"></span>
                      </label>
                      {row.duality && (
                        <span className="timestamp">{row.duality}</span>
                      )}
                    </div>
                  </td>

                  {/* Add Dropdown */}
                  <td className="td">
                    <select
                      value={row.add}
                      onChange={(e) => handleAddChange(index, e.target.value)}
                      className="dropdown"
                    >
                      <option value="">Select...</option>
                      <option value="Items">Items</option>
                      <option value="Event">Event</option>
                    </select>
                  </td>

                  {/* Actions - Remove Button */}
                  <td className="td">
                    <button 
                      onClick={() => removeRow(row.id)}
                      className="removeButton"
                      disabled={rows.length <= 1}
                    >
                      <span className="minusIcon">−</span>
                    </button>
                  </td>
                </tr>

                {/* Additional Tables based on selection */}
                {row.add === "Items" && row.items && (
                  <tr>
                    <td colSpan={6} className="td">
                      <div className="itemsContainer">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <strong>Items</strong>
                          <button 
                            onClick={() => addItem(index)}
                            className="addButton"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                          >
                            + Add Item
                          </button>
                        </div>
                        {row.items.map((item, itemIndex) => (
                          <div key={itemIndex} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                            <input
                              type="number"
                              value={item}
                              onChange={(e) => updateItem(index, itemIndex, e.target.value)}
                              className="numberInput"
                              placeholder="Enter item number"
                              style={{ flex: 1 }}
                            />
                            <button 
                              onClick={() => removeItem(index, itemIndex)}
                              className="removeButton"
                              style={{ padding: '6px 10px', fontSize: '12px' }}
                            >
                              −
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}

                {row.add === "Event" && row.events && (
                  <tr>
                    <td colSpan={6} className="td">
                      <div className="eventTable">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#495057' }}>
                          <strong style={{ color: 'white' }}>Event Details</strong>
                          <button 
                            onClick={() => addEvent(index)}
                            className="addButton"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                          >
                            + Add Event Row
                          </button>
                        </div>
                        <table>
                          <thead>
                            <tr>
                              <th>ISIN</th>
                              <th>Short-Name</th>
                              <th>Corp. Ref.</th>
                              <th>Transaction</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.events.map((event, eventIndex) => (
                              <tr key={eventIndex}>
                                <td>
                                  <input
                                    type="text"
                                    value={event.isin}
                                    onChange={(e) => updateEvent(index, eventIndex, 'isin', e.target.value)}
                                    className="textInput"
                                    placeholder="ISIN"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    value={event.shortName}
                                    onChange={(e) => updateEvent(index, eventIndex, 'shortName', e.target.value)}
                                    className="textInput"
                                    placeholder="Short Name"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    value={event.corpRef}
                                    onChange={(e) => updateEvent(index, eventIndex, 'corpRef', e.target.value)}
                                    className="textInput"
                                    placeholder="Corp. Ref."
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    value={event.transaction}
                                    onChange={(e) => updateEvent(index, eventIndex, 'transaction', e.target.value)}
                                    className="textInput"
                                    placeholder="Transaction"
                                  />
                                </td>
                                <td>
                                  <button 
                                    onClick={() => removeEvent(index, eventIndex)}
                                    className="removeButton"
                                    style={{ padding: '6px 10px', fontSize: '12px' }}
                                  >
                                    −
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
                
                {/* Bigger border between tasks */}
                {index < rows.length - 1 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '8px 0', background: '#f8f9fa' }}>
                      <div style={{ height: '2px', background: '#e1e5e9', margin: '0' }}></div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="emptyState">
          <p>No tasks yet. Click "Add New Task" to get started!</p>
        </div>
      )}
    </div>
  );
}