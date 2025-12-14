import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./settlementTeam.css";

export default function SettlementTeam({ user }) {
  return (
    <div className="settlement-team-container">
      <Header user={user} />

      <div className="settlement-team-content">
        <h1>Settlement Team</h1>
      </div>

      <Footer />
    </div>
  );
}
