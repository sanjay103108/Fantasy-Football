import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import "../styles/Login.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogIn = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await authService.login(email, password);
      if (response && response.accessToken) {
        navigate("/");
        window.location.reload();
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data || "Login failed. Please try again.");
      } else if (err.request) {
        setError("Unable to connect to the server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <h3>Log In</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogIn}>
        <input
          type="email"
          placeholder="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      <p>
        No account? <Link to={"/signup"}> Sign up here</Link>
      </p>
    </div>
  );
};

export default LogIn;
