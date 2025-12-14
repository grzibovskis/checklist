import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login/Login";
import StartPage from "./pages/Start/Start";
import StatisticsPage from "./pages/Statistics/Statistics";

import AccountTeam from "./pages/CheckLists/AccountsTeam/AccountTeam.js";
import CorporateActionsTeam from "./pages/CheckLists/CorporateActionsTeam/CorporateActionsTeam.js";
import IncomeTeam from "./pages/CheckLists/IncomeTeam/IncomeTeam.js";
import IpaTeam from "./pages/CheckLists/IpaTeam/IpaTeam.js";
import SettlementTeam from "./pages/CheckLists/SettlementTeam/SettlementTeam.js";
import TaxTeam from "./pages/CheckLists/TaxTeam/TaxTeam.js";
import VotingTeam from "./pages/CheckLists/VotingTeam/VotingTeam.js";

import IncomeTeamTemplatePage from "./pages/CheckLists/IncomeTeam/Template/IncomeTeamTemplate.js";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <Routes>
      <Route path="/" element={<StartPage user={user} />} />
      <Route path="/start" element={<StartPage user={user} />} />
      <Route path="/statistics" element={<StatisticsPage user={user} />} />

      {/* TEAM PAGES */}
      <Route path="/account-team" element={<AccountTeam user={user} />} />
      <Route path="/corporate-actions-team" element={<CorporateActionsTeam user={user} />} />
      <Route path="/income-team" element={<IncomeTeam user={user} />} />
      <Route path="/ipa-team" element={<IpaTeam user={user} />} />
      <Route path="/settlement-team" element={<SettlementTeam user={user} />} />
      <Route path="/tax-team" element={<TaxTeam user={user} />} />
      <Route path="/voting-team" element={<VotingTeam user={user} />} />

      <Route path="/income-template" element={<IncomeTeamTemplatePage user={user} />} />
    </Routes>
  );
}
