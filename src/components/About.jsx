import React from 'react';
import '../styles/About.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1 className="main-heading">
         Welcome to <span className="highlighted">SIM: Stationary In Minutes</span>
      </h1>
      <p className="subtext">Smart, Quick & Paperless Ordering — just for ABES students</p>

      <div className="feature-block">
        <h2>Why Choose SIM?</h2>
       <ul className="feature-list">
          <li><span className="tick">✔</span> <b>Instant Ordering </b>— No more standing in queues.</li>
          <li><span className="tick">✔</span> <b>Quick Uploads </b>— Upload PDFs in seconds.</li>
          <li><span className="tick">✔</span> <b>Fast Service</b> — No slips, just quick delivery.</li>
         <li><span className="tick">✔</span> <b>Built for ABES Students </b>— A solution tailored to your campus.</li>
</ul>

      </div>

      <blockquote className="quote">
        “Saving students hours every week — that's the SIM promise.”
      </blockquote>

      <button className="cta-button">Start Your Order Now →</button>

       <h3 className="footer-text">
      Made with <span className="heart">♥</span> 
    </h3>
    </div>
    
  );
};

export default AboutUs;
