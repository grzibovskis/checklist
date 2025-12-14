import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header.js";
import Footer from "../../../components/Footer/Footer.js";
import ComponentIncomeTeam from "../../../components/CheckLists/incomeTeam/ComponentIncomeTeam.js"; 
import "./incomeTeam.css";

const getMonth = (date) => date.getMonth();

export default function IncomeTeam({ user }) {
  const navigate = useNavigate(); 
  const [checklists, setChecklists] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [inputDate, setInputDate] = useState("");
  const [error, setError] = useState("");

  // which month is open (null = all closed)
  const [openMonth, setOpenMonth] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // OPEN POPUP
  const openPopup = () => {
    setInputDate("");
    setError("");
    setShowPopup(true);
  };

  // SAVE CHECKLIST - UPDATED to use consistent date format
  const saveChecklist = () => {
    if (!inputDate) {
      setError("Please select date.");
      return;
    }

    const dateObj = new Date(inputDate);
    
    // Format date consistently for comparison
    const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Use consistent label format
    const dateLabel = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const exists = checklists.some(
      item => {
        const itemFormattedDate = item.date.toISOString().split('T')[0];
        return itemFormattedDate === formattedDate;
      }
    );

    if (exists) {
      setError("Checklist with this date already exists!");
      return;
    }

    const newItem = {
      id: Date.now(),
      date: dateObj,
      label: dateLabel,
      storageKey: `checklist_${formattedDate}` // Add a unique storage key
    };

    // Initialize empty tasks for this date in localStorage
    const defaultTask = [
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
    
    localStorage.setItem(`checklist_${formattedDate}`, JSON.stringify(defaultTask));

    setChecklists([...checklists, newItem]);
    setShowPopup(false);
  };

  // toggle month
  const toggleMonth = (index) => {
    setOpenMonth(openMonth === index ? null : index);
  };

  return (
    <div className="income-team-container">

      <Header user={user} />

      <div className="income-team-body">

        {/* LEFT COLUMN */}
        <div className="left-column">

          <button className="add-btn" onClick={openPopup}>
            + Checklist
          </button>

          <button 
            className="template-btn"
            onClick={() => navigate("/income-template")}
          >
            Template
          </button>

          {months.map((month, mIndex) => (
            <div key={mIndex} className="month-block">

              <div 
                className="month-title"
                onClick={() => toggleMonth(mIndex)}
              >
                {month}
                <span className="arrow">
                  {openMonth === mIndex ? "▲" : "▼"}
                </span>
              </div>

              {/* DROP DOWN CONTENT */}
              {openMonth === mIndex && (
                <div className="month-content">

                  {checklists
                    .filter(c => getMonth(c.date) === mIndex)
                    .map(item => (
                      <div
                        key={item.id}
                        className={`date-item ${
                          selectedChecklist?.id === item.id ? "active" : ""
                        }`}
                        onClick={() => setSelectedChecklist(item)}
                      >
                        {item.label}
                      </div>
                  ))}

                  {/* if month empty */}
                  {checklists.filter(c => getMonth(c.date) === mIndex).length === 0 && (
                    <div className="empty">No checklists</div>
                  )}

                </div>
              )}

            </div>
          ))}

        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">

          {!selectedChecklist && (
            <div className="placeholder">
              Select a date to see information
            </div>
          )}

          {selectedChecklist && (
            <ComponentIncomeTeam data={selectedChecklist} />
          )}

        </div>

      </div>

      <Footer />

      {/* POPUP WINDOW */}
      {showPopup && (
        <div className="popup-overlay">

          <div className="popup-box">

            <h2>Create Checklist</h2>

            <input
              type="date"
              value={inputDate}
              onChange={e => setInputDate(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <div className="popup-buttons">
              <button onClick={saveChecklist}>Save</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}