import React from 'react';
import './About.css'; // Importing CSS for styles
import myimg from '../assets/Aditya_Dhonde_CSE (1).jpg'

const About = () => {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1>About Name Initiater</h1>
        <p>
            Name Initiator is a powerful domain name generator designed to spark creativity and help users discover the perfect domain for their brand or project. Leveraging AI, it generates unique, memorable domain suggestions that align with user preferences, making the process of finding a standout online identity simple and enjoyable. 
        </p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
        The mission of Name Initiator is to simplify and enhance the journey of finding the perfect online identity. By harnessing AI-driven insights, it strives to deliver creative, meaningful, and memorable domain name suggestions that reflect each user’s unique vision and brand. We aim to empower entrepreneurs, creators, and businesses by providing them with a seamless tool that inspires innovation and supports their growth. At Name Initiator, we believe the right domain name is the foundation of a powerful digital presence, and our mission is to make that foundation easy to build.  
        </p>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <p>
          DomainSuggest combines the power of advanced AI with real-time domain availability checks to deliver tailored suggestions. Here's how:
        </p>
        <ul>
          <li><strong>AI-Powered Suggestions:</strong> Using the latest AI models, we generate creative and relevant domain name options based on your input.</li>
          <li><strong>Real-Time Availability:</strong> Integrated with Whosi’s Domain API, we ensure the domains suggested are available for immediate registration.</li>
          <li><strong>Customization:</strong> Filter domain suggestions based on keywords, industry, and top-level domain (TLD) preferences.</li>
        </ul>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={myimg} alt="Aditya Dhonde" className="team-photo" />
            <h3>Aditya Dhonde</h3>
            <p>Student at NJIT</p>
          </div>
        
        </div>
      </section>

      <section className="values-section">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Innovation:</strong> We embrace technology to create forward-thinking solutions.</li>
          <li><strong>Simplicity:</strong> We make domain search as easy and efficient as possible.</li>
          <li><strong>Customer Focus:</strong> Your success is our priority, and we’re here to support you every step of the way.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;