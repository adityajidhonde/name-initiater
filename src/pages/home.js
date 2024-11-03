// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css'; // Include CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Name Initiater</h1>
        <p>The ultimate tool for discovering the perfect domain name!</p>
        <Link to="/domain-ai" className="cta-button">Get Started</Link>
      </header>
      <section className="features-section">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Domain Search</h3>
            <p>Quickly search for available domain names with our intelligent suggestions.</p>
          </div>
          <div className="feature-card">
            <h3>AI Suggestions</h3>
            <p>Get AI-powered recommendations based on your keywords and preferences.</p>
          </div>
          <div className="feature-card">
            <h3>Domain Status</h3>
            <p>Check the status of your domains and receive real-time updates.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Name Initiater. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;