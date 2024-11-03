// src/pages/ChatAssistant.js
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ChatAssistant.css'; // Importing the CSS file for styling

function ChatAssistant() {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setPromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Initialize Google Generative AI with API key from environment variables
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GENAI_API_KEY);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    if (!inputValue.trim()) return; // Prevent empty submissions

    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      const text = result.response.text();
      
      // Append both user prompt and AI response
      setPromptResponses(prev => [...prev, { user: inputValue, ai: text }]);
      setInputValue('');
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getResponseForGivenPrompt();
    }
  };

  return (
    <div className="chat-assistant-container">
      <div className="chat-card">
        <h2 className="chat-title">Chat Assistant</h2>
        <p className="chat-description">Ask me anything related to:</p>
        
        <div className="topics-container">
          <div className="topic-item">
            <span className="topic-icon">🌐</span>
            <span className="topic-text">Domain names and TLDs</span>
          </div>
          <div className="topic-item">
            <span className="topic-icon">💻</span>
            <span className="topic-text">Web hosting and services</span>
          </div>
          <div className="topic-item">
            <span className="topic-icon">☁️</span>
            <span className="topic-text">Cloudflare and CDN solutions</span>
          </div>
        </div>

        <p className="chat-examples">Here are some example prompts you can try:</p>
        
        <div className="examples-container">
          <div className="example-item">
            <span className="example-icon">❓</span>
            <span className="example-text">What are some popular domain extensions?</span>
          </div>
          <div className="example-item">
            <span className="example-icon">❓</span>
            <span className="example-text">Can you recommend a good web hosting provider?</span>
          </div>
          <div className="example-item">
            <span className="example-icon">❓</span>
            <span className="example-text">How do I set up Cloudflare for my website?</span>
          </div>
        </div>
        
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me something you want..."
            className="chat-input"
            aria-label="Chat input"
          />
          <button
            onClick={getResponseForGivenPrompt}
            className="chat-send-button"
            disabled={loading}
            aria-label="Send"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>

        {loading && (
          <div className="loading-indicator" role="status" aria-live="polite">
            <div className="spinner"></div>
            <span className="loading-text">Processing...</span>
          </div>
        )}

        <div className="responses-section">
          {promptResponses.map((response, index) => (
            <div key={index} className="response-bubble">
              <div className="user-prompt">
                <span className="prompt-label">You:</span> {response.user}
              </div>
              <div className="ai-response">
                <span className="response-label">Assistant:</span> {response.ai}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatAssistant;