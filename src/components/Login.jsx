// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fakeAuth = (username, password) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username.trim() && password.length >= 4) {
          resolve({ username });
        } else {
          reject(
            new Error("Invalid username or password (password min 4 chars)")
          );
        }
      }, 500);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!username.trim() || !password) {
      setErr("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const user = await fakeAuth(username.trim(), password);
      localStorage.setItem("app_user", JSON.stringify(user));
      setUser(user); // ✅ important
      navigate("/product", { replace: true });
    } catch (err) {
      setErr(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page container mt-5 pt-5 d-flex justify-content-center">
      <form
        className="card p-4 shadow-sm login-card"
        onSubmit={handleSubmit}
        style={{ minWidth: "300px", maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3">Login</h3>
        {err && <div className="alert alert-danger py-2">{err}</div>}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password (min 4 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <div className="d-grid">
          <button
            className="btn btn-theme py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>
        <div className="text-muted small text-center mt-3">
          Demo login — any username + password ≥ 4 chars accepted
        </div>
      </form>
    </div>
  );
};

export default Login;
