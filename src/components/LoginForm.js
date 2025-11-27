import React, { useState } from "react";
import { authenticateUser, getAllUsers } from "../database/users";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showUserList, setShowUserList] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user = authenticateUser(email, password);
    
    if (user) {
      // Pass the entire user object to onLogin
      onLogin(user);
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleUserSelect = (userEmail, userPassword) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setShowUserList(false);
  };

  const allUsers = getAllUsers();

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      
      {/* User selection toggle */}
      <button 
        type="button"
        onClick={() => setShowUserList(!showUserList)}
        style={styles.toggleButton}
      >
        {showUserList ? "Hide Test Users" : "Show Test Users"}
      </button>

      {/* User list */}
      {showUserList && (
        <div style={styles.userList}>
          <h4>Available Test Users:</h4>
          {allUsers.map((user, index) => (
            <div 
              key={index}
              style={styles.userItem}
              onClick={() => handleUserSelect(user.email, user.password)}
            >
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Password:</strong> {user.password}</div>
              <div><strong>Name:</strong> {user.name}</div>
              <div><strong>Role:</strong> {user.role}</div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Log In
        </button>
      </form>

      {/* Quick login hints */}
      <div style={styles.hints}>
        <p>Try any of the test users above, or use:</p>
        <p><strong>admin@admin.se</strong> / <strong>123</strong></p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
    background: "#f7f7f7",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  button: {
    padding: "12px",
    borderRadius: "5px",
    background: "#4285F4",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },
  toggleButton: {
    padding: "8px 16px",
    borderRadius: "5px",
    background: "#34A853",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginBottom: "15px"
  },
  userList: {
    textAlign: "left",
    background: "white",
    padding: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginBottom: "15px"
  },
  userItem: {
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #eee",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  userItemHover: {
    backgroundColor: "#f0f0f0"
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px"
  },
  hints: {
    marginTop: "20px",
    padding: "10px",
    background: "#e8f4fd",
    borderRadius: "5px",
    fontSize: "14px"
  }
};