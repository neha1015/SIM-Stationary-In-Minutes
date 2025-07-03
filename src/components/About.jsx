import React, { useEffect, useState } from 'react';
import '../styles/About.css';

const AboutUs = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  return (
    <div className="about-wrapper">
      <div className={`about-container ${visible ? 'fade-in' : ''}`}>
        <h2>About <span className="highlight">Stationary In Minutes</span></h2>

        <div className="about-card">
          <p>Save time with instant online ordering</p>
          <p>Quick document uploads & easy printing</p>
          <p>No queues, no slips — just fast service</p>
          <p><strong>Simple, fast, efficient — made for ABES students</strong></p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
