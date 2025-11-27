import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [user, setUser] = useState(null);

  // Now setUser receives the full user object, not just email
  return (
    <div>
      {!user ? (
        <LoginPage onLogin={setUser} />
      ) : (
        <DashboardPage user={user} />
      )}
    </div>
  );
}