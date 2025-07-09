import React, { useState } from 'react';
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      // ✅ Save token and user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect to home/profile/dashboard
      navigate('/');
      window.location.reload(); // refresh to reflect logout

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <>
      <section className="auth-body">
        <div className="auth-container">
          <div className="close-icon" onClick={handleClose}>
            <img src="/assets/close.png" alt="Close" height={"23rem"} />
          </div>
          <div className="auth-card">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Login to continue shopping luxury ✨</p>

            <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="auth-btn">Login</button>
              <p className="auth-bottom-text">Don’t have an account? <Link to="/register">Sign up</Link></p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
