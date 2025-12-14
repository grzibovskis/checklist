import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./ipaTeam.css";

export default function IpaTeam({ user }) {
  return (
    <div className="ipa-team-container">
      <Header user={user} />

      <div className="ipa-team-content">
        <h1>Ipa Team</h1>
      </div>

      <Footer />
    </div>
  );
}
