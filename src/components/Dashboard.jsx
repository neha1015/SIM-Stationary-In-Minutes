import React, { useState } from 'react';
import Navbar from './Navbar';
import About from './About';
import NewOrder from './NewOrder'; 
import History from './History';
import Pricing from './Pricing';
import Help from './Help';

const Dashboard = ({ email }) => {
  const [section, setSection] = useState('neworder');

  const renderSection = () => {
    switch (section) {
      case 'neworder':
        return <NewOrder />;
      case 'history':
        return <History />;
      case 'pricing':
        return <Pricing />;
      case 'help':
        return <Help />;
      case 'about':
        return <About />;
      default:
        return <NewOrder />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.reload(); 
  };

  return (
    <div>
      <Navbar setSection={setSection} handleLogout={handleLogout} />
    <div className="dashboard-content" style={{ padding: '15px', paddingTop: '80px' }}>

        <h2>Welcome, {email}</h2>
        {renderSection()}
      </div>
    </div>
  );
};

export default Dashboard;
