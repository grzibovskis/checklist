import React, { useState } from "react";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import "./incomeTeamTemplate.css";

export default function IncomeTeam({ user }) {
  const [columns, setColumns] = useState([
    { name: "Time", width: 50 },
    { name: "Task", width: 400 },
    { name: "Primary", width: 60 },
    { name: "Check", width: 45, checkbox: true },
    { name: "Duality", width: 80 },
    { name: "Check", width: 65, checkbox: true },
    { name: "Items", width: 40 },
    { name: "Short-Name", width: 80 },
    { name: "ISIN", width: 100 },
    { name: "Corp.Ref", width: 100 },
    { name: "ACK", width: 40 },
    { name: "Comments", width: 100 }
  ]);

  const [rows, setRows] = useState([
    Array(columns.length)
      .fill(null)
      .map(() => ({ value: "", highlight: false, readonly: false }))
  ]);

  const [popup, setPopup] = useState({ open: false, index: null, name: "", width: 100 });

  const addRow = () => {
    setRows([
      ...rows,
      Array(columns.length)
        .fill(null)
        .map(() => ({ value: "", highlight: false, readonly: false }))
    ]);
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

  const toggleHighlight = (r, c) => {
    const updated = [...rows];
    updated[r][c].highlight = !updated[r][c].highlight;
    setRows(updated);
  };

  const handleAddBelow = (rIdx) => {
    const newRow = columns.map((col, cIdx) => {
      // For Time and Task columns, set gray and readonly
      if (col.name === "Time" || col.name === "Task") {
        return { value: "", highlight: false, readonly: true };
      }
      return { value: "", highlight: false, readonly: false };
    });

    const updated = [...rows];
    updated.splice(rIdx + 1, 0, newRow);
    setRows(updated);
  };

  const handleRemoveRow = (rIdx) => {
    const row = rows[rIdx];
    // Cannot remove if Time or Task is editable
    if (!row[0].readonly && !row[1].readonly) return;
    const updated = [...rows];
    updated.splice(rIdx, 1);
    setRows(updated);
  };

  const openPopup = (index) => {
    const col = columns[index];
    setPopup({ open: true, index, name: col.name, width: col.width });
  };

  const applyPopup = () => {
    const updated = [...columns];
    updated[popup.index].name = popup.name;
    updated[popup.index].width = Math.min(500, Math.max(20, Number(popup.width)));
    setColumns(updated);
    setPopup({ ...popup, open: false });
  };

  return (
    <div className="income-team-container">
      <Header user={user} showBack={true} backRoute="/income-team" />

      <div className="income-team-content">
        <h1>Income Team</h1>

        <div className="income-team-table-controls">
          <button onClick={addRow}>+ Add Row</button>
        </div>

        <div className="income-team-table-wrapper">
          <table className="income-team-table">
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    style={{ width: col.width }}
                    onClick={() => openPopup(idx)}
                    className="income-team-header"
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
                    // Short-Name buttons
                    if (col.name === "Short-Name") {
                      return (
                        <td key={cIdx} style={{ width: col.width }}>
                          <div className="income-team-cell-wrapper">
                            {/* Textbox */}
                            <textarea
                              value={cell.value}
                              readOnly={cell.readonly}
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                              className="income-team-textarea"
                              style={{
                                background: cell.readonly
                                  ? "#d3d3d3"
                                  : cell.highlight
                                  ? "#707070ff"
                                  : "#fafafa",
                              }}
                            />
                            {/* Buttons under textbox */}
                            <div className="shortname-btn-container">
                              <button
                                className="shortname-btn add-btn"
                                onClick={() => handleAddBelow(rIdx)}
                              >
                                +
                              </button>
                              <button
                                className="shortname-btn remove-btn"
                                onClick={() => handleRemoveRow(rIdx)}
                              >
                                –
                              </button>
                            </div>
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td key={cIdx} style={{ width: col.width }}>
                        {col.checkbox ? (
                          <input
                            type="checkbox"
                            checked={!!cell.value}
                            onChange={() => toggleCheckbox(rIdx, cIdx)}
                          />
                        ) : (
                          <div className="income-team-cell-wrapper">
                            <textarea
                              value={cell.value}
                              readOnly={cell.readonly}
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                              className="income-team-textarea"
                              style={{
                                background: cell.readonly
                                  ? "#7e7e7eff"
                                  : cell.highlight
                                  ? "#707070ff"
                                  : "#fafafa"
                              }}
                            />
                            {(col.name === "Primary" || col.name === "Duality") && (
                              <button
                                className="highlight-btn"
                                onClick={() => toggleHighlight(rIdx, cIdx)}
                              >
                                {cell.highlight ? "Inactive" : "Active"}
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

      {popup.open && (
        <div className="income-team-popup-overlay">
          <div className="income-team-popup-box">
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

            <div className="income-team-popup-buttons">
              <button className="income-team-apply-btn" onClick={applyPopup}>
                Apply
              </button>
              <button
                className="income-team-cancel-btn"
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
