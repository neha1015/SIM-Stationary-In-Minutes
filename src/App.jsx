// src/App.jsx
// import './style.css';
import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

  const handleLogin = (email) => {
    setUserEmail(email);
  };

  return (
    <div>
      {userEmail ? (
        <Dashboard email={userEmail} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
