import React, { useState, useEffect, useRef } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [otp, setOtp] = useState('');
  const [savedEmails, setSavedEmails] = useState([]);
  const emailRef = useRef(null); // ✅ useRef for uncontrolled input

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedEmails')) || [];
    setSavedEmails(stored);
  }, []);

  const sendOtp = () => {
    const email = emailRef.current?.value.trim();
    if (!email.endsWith('@abes.ac.in')) {
      alert('Please enter your college email (e.g. name@abes.ac.in)');
      return;
    }

    alert(`OTP sent to ${email}`);

    const updated = [...new Set([email, ...savedEmails])];
    localStorage.setItem('savedEmails', JSON.stringify(updated));
    setSavedEmails(updated);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();

    if (!email) {
      alert('Email is required.');
      return;
    }

    if (!otp.trim()) {
      alert('Please enter OTP.');
      return;
    }

    onLogin(email);
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <form className="login-form" onSubmit={handleLogin} autoComplete="on">
          <img src="/simbg.png" alt="SIM Logo" className="login-logo" />
          <h2>Stationary In Minutes</h2>
          <p className="sub-heading">ABES Engineering College</p>

          <input
            type="email"
            name="email"
            placeholder="College Email ID"
            ref={emailRef}
            list="emails"
            autoComplete="email"  // ✅ triggers black browser dropdown
            required
          />
          <datalist id="emails">
            {savedEmails.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>

          {/* OTP Input */}
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            autoComplete="one-time-code"
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
