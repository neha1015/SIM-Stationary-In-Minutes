import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [savedEmails, setSavedEmails] = useState([]);

  useEffect(() => {
    // Load previously saved emails from localStorage
    const stored = JSON.parse(localStorage.getItem('savedEmails')) || [];
    setSavedEmails(stored);
  }, []);

  const sendOtp = () => {
    if (!email.endsWith('@abes.ac.in')) {
      alert('Please enter your college email (e.g. name@abes.ac.in)');
      return;
    }

    alert(`OTP sent to ${email}`);

    // Save the current email to suggestions
    if (email.trim()) {
      const updated = [...new Set([email, ...savedEmails])];
      localStorage.setItem('savedEmails', JSON.stringify(updated));
      setSavedEmails(updated);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      alert('Please enter OTP.');
      return;
    }

    onLogin(email);
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <form className="login-form" onSubmit={handleLogin}>
          <img src="/simbg.png" alt="SIM Logo" className="login-logo" />
          <h2>SIM Stationary</h2>
          <p className="sub-heading">ABES Engineering College</p>

          {/* ✅ Email input with datalist */}
          <input
            list="emails"
            type="email"
            placeholder="College Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
          <datalist id="emails">
            {savedEmails.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>

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
