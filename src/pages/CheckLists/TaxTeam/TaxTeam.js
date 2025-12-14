import React, { useState } from "react"; 
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./taxTeam.css";

export default function TaxTeam({ user }) {
  const [columns, setColumns] = useState([
    { name: "Time", width: 50 },
    { name: "Task", width: 400 },
    { name: "Primary", width: 60 },
    { name: "Check", width: 45, checkbox: true },
    { name: "Duality", width: 80 },
    { name: "Check", width: 65, checkbox: true }
  ]);

  const [rows, setRows] = useState([
    Array(6).fill(null).map(() => ({ value: "", highlight: false }))
  ]);

  const [popup, setPopup] = useState({
    open: false,
    index: null,
    name: "",
    width: 100
  });

  const addColumn = () => {
    setColumns([
      ...columns,
      { name: `Column ${columns.length + 1}`, width: 100, checkbox: false }
    ]);
    setRows(rows.map(row => [
      ...row,
      { value: "", highlight: false }
    ]));
  };

  const removeColumn = () => {
    if (columns.length <= 6) return;
    setColumns(columns.slice(0, -1));
    setRows(rows.map(row => row.slice(0, -1)));
  };

  const updateCell = (r, c, value) => {
    const updated = [...rows];
    updated[r][c].value = value;
    setRows(updated);
  };

  const toggleCheckbox = (r, c) => {
    const updated = [...rows];
    updated[r][c] = !updated[r][c];
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      Array(columns.length).fill(null).map(() => ({ value: "", highlight: false }))
    ]);
  };

  const openPopup = (index) => {
    const col = columns[index];
    setPopup({
      open: true,
      index,
      name: col.name,
      width: col.width
    });
  };

  const applyPopup = () => {
    const updated = [...columns];
    updated[popup.index].name = popup.name;
    updated[popup.index].width = Math.min(500, Math.max(20, Number(popup.width)));
    setColumns(updated);
    setPopup({ ...popup, open: false });
  };

  const toggleHighlight = (r, c) => {
    const updated = [...rows];
    updated[r][c].highlight = !updated[r][c].highlight;
    setRows(updated);
  };


  return (
    <div className="tax-team-container">
      <Header user={user} />

      <div className="tax-team-content">
        <h1>Tax Team</h1>

        {/* CONTROL PANEL */}
        <div className="tax-team-table-controls">
          <button onClick={addColumn}>+ Add Column</button>
          <button onClick={removeColumn}>– Remove Column</button>
          <button onClick={addRow}>+ Add Row</button>
        </div>

        {/* TABLE */}
        <div className="tax-team-table-wrapper">
          <table className="tax-team-table">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    style={{ width: col.width }}
                    onClick={() => openPopup(idx)}
                    className="tax-team-header"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => {
                    const col = columns[cIdx];
                    return (
                      <td key={cIdx} style={{ width: col.width }}>
                        {col.checkbox ? (
                          <input
                            type="checkbox"
                            checked={!!cell}
                            onChange={() => toggleCheckbox(rIdx, cIdx)}
                          />
                        ) : (
                          <div className="tax-team-cell-wrapper">
                            <textarea
                              value={cell.value}
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                              className={
                                col.name === "Primary" || col.name === "Duality"
                                  ? "tax-team-textarea small"
                                  : "tax-team-textarea"
                              }
                              style={{
                                background: cell.highlight ? "#707070ff" : "#fafafa"
                              }}
                            />
                            
                            {(col.name === "Primary" || col.name === "Duality") && (
                              <button
                                className="highlight-btn"
                                onClick={() => toggleHighlight(rIdx, cIdx)}
                              >
                                {cell.highlight ? "Active" : "Inactive"}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />

      {/* POPUP */}
      {popup.open && (
        <div className="tax-team-popup-overlay">
          <div className="tax-team-popup-box">
            <h2>Edit Column</h2>

            <label>Column Name</label>
            <input
              value={popup.name}
              onChange={(e) => setPopup({ ...popup, name: e.target.value })}
            />

            <label>Column Width (20px – 500px)</label>
            <input
              type="number"
              value={popup.width}
              onChange={(e) => setPopup({ ...popup, width: e.target.value })}
            />

            <div className="tax-team-popup-buttons">
              <button className="tax-team-apply-btn" onClick={applyPopup}>
                Apply
              </button>
              <button
                className="tax-team-cancel-btn"
                onClick={() => setPopup({ ...popup, open: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
