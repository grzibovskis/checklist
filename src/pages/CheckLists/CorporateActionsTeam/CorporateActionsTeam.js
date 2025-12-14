import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./corporateActionsTeam.css";

export default function CorporateActionsTeam({ user }) {
  return (
    <div className="corporate-actions-team-container">
      <Header user={user} />

      <div className="corporate-actions-team-content">
        <h1>Corporate Actions Team</h1>
      </div>

      <Footer />
    </div>
  );
}