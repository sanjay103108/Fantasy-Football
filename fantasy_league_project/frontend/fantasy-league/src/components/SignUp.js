import React, { useState } from "react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Signup = ({ toggleModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await authService.signup(
        email,
        password,
        teamName,
        username
      );
      if (response && response.accessToken) {
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        setError(err.response.data || "Signup failed. Please try again.");
      } else if (err.request) {
        setError("Unable to connect to the server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          required
          minLength={5}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          required
          minLength={4}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          minLength={4}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
