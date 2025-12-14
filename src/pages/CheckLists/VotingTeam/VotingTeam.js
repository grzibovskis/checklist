import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./votingTeam.css";

export default function VotingTeam({ user }) {
  return (
    <div className="voting-team-container">
      <Header user={user} />

      <div className="voting-team-content">
        <h1>Voting Team</h1>
      </div>

      <Footer />
    </div>
  );
}
