import React, { useState, useEffect, useRef } from "react";

export default function ActionsColumn({ 
  rowId, 
  isFirstRow, 
  user, 
  onAction 
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  
  const isAdmin = user?.role === 'admin' || user?.isAdmin;
  
  const actions = [
    'New Task',
    'Delete Task',
    ...(isAdmin ? ['Attach file', 'Deactivate'] : [])
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (action) => {
    onAction(action, rowId);
    setShowDropdown(false);
  };

  return (
    <td>
      <div className="action-buttons">
        <button 
          ref={buttonRef}
          className="action-button"
          onClick={toggleDropdown}
          aria-label="Actions"
        >
          ⋮
        </button>
        {showDropdown && (
          <>
            <div 
              ref={dropdownRef} 
              className="dropdown-menu"
            >
              {actions.map((action) => (
                <button
                  key={action}
                  className="dropdown-item"
                  onClick={() => handleItemClick(action)}
                  disabled={isFirstRow && action === 'Delete Task'}
                >
                  {action}
                </button>
              ))}
            </div>
            <div 
              className="dropdown-backdrop" 
              onClick={() => setShowDropdown(false)}
            />
          </>
        )}
      </div>
    </td>
  );
}