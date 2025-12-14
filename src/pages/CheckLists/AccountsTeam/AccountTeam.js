import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./accountTeam.css";

export default function AccountTeam({ user }) {
  return (
    <div className="accounts-team-container">
      <Header user={user} />

      <div className="accounts-team-content">
        <h1>Account Team</h1>
      </div>

      <Footer />
    </div>
  );
}
