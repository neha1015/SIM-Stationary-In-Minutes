import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ setSection, handleLogout }) => {
  const [active, setActive] = useState('neworder');

  const handleClick = (sectionName) => {
    setActive(sectionName);
    setSection(sectionName);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/simbg.png" alt="SIM Logo" className="logo-img" />
      </div>

      <ul className="nav-center">
        <li
          className={active === 'neworder' ? 'active' : ''}
          onClick={() => handleClick('neworder')}
        >
          New Order
        </li>
        <li
          className={active === 'history' ? 'active' : ''}
          onClick={() => handleClick('history')}
        >
          Order History
        </li>
        <li
          className={active === 'pricing' ? 'active' : ''}
          onClick={() => handleClick('pricing')}
        >
          Pricing
        </li>
        <li
          className={active === 'about' ? 'active' : ''}
          onClick={() => handleClick('about')}
        >
          About Us
        </li>
        <li
          className={active === 'help' ? 'active' : ''}
          onClick={() => handleClick('help')}
        >
          Help
        </li>
      </ul>

      <div className="nav-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
