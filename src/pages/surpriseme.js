// src/pages/SurpriseMe.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './SurpriseMe.css'; // Importing the CSS file for styling

const SurpriseMe = () => {
  const [randomExtensions, setRandomExtensions] = useState([]);
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI("AIzaSyCb-oNcl6SemSUffkNKyx2RrOTi1RErZPA");

  // Fetch random extensions
  const fetchRandomExtensions = async () => {
    try {
      const response = await axios.get('http://localhost:5050/api/random-extensions');
      setRandomExtensions(response.data.map(ext => ext.Extension));
    } catch (error) {
      console.error('Error fetching random extensions:', error);
    }
  };

  // Handle generation of domain names
  const handleGenerate = async () => {
    setLoading(true);
    const prompt = `Generate creative and unique domain names using the following extensions: ${randomExtensions.join(', ')}`;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      // Ensure result.response.text is accessed correctly
      setAiResponse(result.response.text); // Assuming text is a property
    } catch (error) {
      console.error('Error generating AI response:', error);
    }
    setLoading(false);
  };

  // useEffect to fetch random extensions on component mount
  useEffect(() => {
    fetchRandomExtensions();
  }, []);

  return (
    <div className="surprise-me-container">
      <h1 className="title">Get Random Domain</h1>
      <p className="subtitle">Let AI amaze you with unique domain name ideas.</p>
      
      <div className="btn-container">
        <button onClick={handleGenerate} className="btn-generate">
          {loading ? 'Generating...' : 'Generate Domain Names'}
        </button>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {aiResponse && (
        <div className="response-container">
          <h2 className="response-title">AI Generated Domain Names</h2>
          <ul className="suggestions-list">
            {aiResponse.split('\n').map((line, index) => (
              <li key={index} className="suggestion-item">
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SurpriseMe;
