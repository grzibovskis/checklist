import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

export default function Header({ user, showBack = false, backRoute = null }) {
  const navigate = useNavigate();

  const goToStart = () => {
    navigate("/start");
  };

  const goBack = () => {
    if (backRoute) {
      navigate(backRoute);
    }
  };

  const goToStatistics = () => {
    navigate("/statistics");
  };

  return (
    <header className="header-container">
      <div className="header-left">
        Hello, {user?.name || "User"}
      </div>

      <div className="header-right">

        {showBack && (
          <button className="back-button" onClick={goBack}>
            Back
          </button>
        )}

        <button className="start-button" onClick={goToStart}>
          Start
        </button>

        <button className="stats-button" onClick={goToStatistics}>
          Statistics
        </button>
      </div>
    </header>
  );
}
