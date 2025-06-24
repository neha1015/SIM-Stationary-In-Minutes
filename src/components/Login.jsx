// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const sendOtp = () => {
    if (!email.endsWith('@abes.ac.in')) {
      alert('Please enter your college email (e.g. name@abes.ac.in)');
      return;
    }
    alert(`OTP sent to ${email}`);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!otp) {
      alert('Please enter OTP.');
      return;
    }
    localStorage.setItem('userEmail', email);
    onLogin(email); // Calls App.js
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>SIM Stationary</h2>
          <p className="sub-heading">ABES Engineering College</p>

          <input
            type="email"
            placeholder="College Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <div className="buttons">
            <button type="button" onClick={sendOtp}>Send OTP</button>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
