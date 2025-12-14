import React from "react";

export default function CheckboxPopup({ 
  show, 
  logs, 
  onRemoveTick, 
  onClose 
}) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (!show) return null;

  return (
    <div className="checkbox-popup-overlay">
      <div className="checkbox-popup">
        <div className="checkbox-popup-header">
          <h3>Checkbox History</h3>
          <button className="close-popup" onClick={onClose}>×</button>
        </div>
        
        <div className="checkbox-popup-content">
          <div className="checkbox-history">
            <h4>History Logs:</h4>
            {logs.length > 0 ? (
              <div className="history-list">
                {logs.map((log, index) => (
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
              onClick={onRemoveTick}
            >
              Yes, Remove Tick
            </button>
            <button 
              className="popup-btn cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}