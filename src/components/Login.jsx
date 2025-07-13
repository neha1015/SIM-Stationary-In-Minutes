import React, { useState, useEffect, useRef } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [otp, setOtp] = useState('');
  const [savedEmails, setSavedEmails] = useState([]);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const emailRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedEmails')) || [];
    setSavedEmails(stored);
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  //otp ka setup krna h s so that email pr otp aye
    const sendOtp = () => {
    const email = emailRef.current?.value.trim();
    if (!email.endsWith('@abes.ac.in')) {
      alert('Please enter your college email (e.g. name@abes.ac.in)');
      return;
    }

    alert(`OTP sent to ${email}`);
    setOtpSent(true);
    setTimer(30); 

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
        {/* <img src="/simbg.png" alt="SIM Logo" className="login-logo" /> */}
        <img src={`${import.meta.env.BASE_URL}simbg.png`} alt="SIM Logo" className="login-logo" />


          <h2>Stationary In Minutes</h2>
          <p className="sub-heading">ABES Engineering College</p>

          <input
            type="email"
            name="email"
            placeholder="College Email ID"
            ref={emailRef}
            list="emails"
            autoComplete="email"
            required
          />
          <datalist id="emails">
            {savedEmails.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>

          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            autoComplete="one-time-code"
            required
          />

          {otpSent && (
            <p className="resend-otp">
              Didn't receive OTP?{' '}
              <button
                type="button"
                onClick={sendOtp}
                disabled={timer > 0}
                className="resend-button"
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
              </button>
            </p>
          )}

          <div className="buttons">
            <button type="button" onClick={sendOtp} disabled={timer > 0}>
              {otpSent ? (timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP') : 'Send OTP'}
            </button>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
