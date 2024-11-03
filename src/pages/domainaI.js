// src/pages/DomainAI.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './DomainAI.css';


function DomainAI({ userId }) { // Pass userId as a prop
    const [industries, setIndustries] = useState([]);
    const [extensions, setExtensions] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedExtensions, setSelectedExtensions] = useState([]);
    const [customTLD, setCustomTLD] = useState('');
    const [showCustomTLD, setShowCustomTLD] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [primaryKeywords, setPrimaryKeywords] = useState(['', '', '']);
    const [secondaryKeywords, setSecondaryKeywords] = useState(['', '', '']);
    const [aiResponse, setAiResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initialize Google Generative AI with API key from environment variables
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GENAI_API_KEY);

    const fetchIndustries = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/industries');
            const formattedIndustries = response.data.map(industry => ({
                value: industry.Industry,
                label: industry.Industry,
            }));
            setIndustries(formattedIndustries);
        } catch (error) {
            console.error('Error fetching industries:', error);
        }
    };

    const fetchExtensions = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/extensions');
            setExtensions(response.data);
        } catch (error) {
            console.error('Error fetching extensions:', error);
        }
    };

    useEffect(() => {
        fetchIndustries();
        fetchExtensions();
    }, []);

    const handleProjectTitleChange = (e) => {
        setProjectTitle(e.target.value);
    };

    const handleProjectDescriptionChange = (e) => {
        setProjectDescription(e.target.value);
    };

    const handlePrimaryKeywordChange = (index, value) => {
        const updatedKeywords = [...primaryKeywords];
        updatedKeywords[index] = value;
        setPrimaryKeywords(updatedKeywords);
    };

    const handleSecondaryKeywordChange = (index, value) => {
        const updatedKeywords = [...secondaryKeywords];
        updatedKeywords[index] = value;
        setSecondaryKeywords(updatedKeywords);
    };

    const toggleTLDInput = () => {
        setShowCustomTLD(!showCustomTLD);
        if (!showCustomTLD) {
            setCustomTLD('');
            setSelectedExtensions([]);
        }
    };

    const handleGenerate = async () => {
        // Validate required fields
        if (!projectTitle.trim() || !projectDescription.trim() || !selectedIndustry) {
            alert('Please fill in all required fields: Project Title, Project Description, and Industry.');
            return;
        }

        setLoading(true);
        const prompt = `
Provide creative and unique domain name suggestions for the 
${selectedIndustry?.value} industry. The domain should relate to 
${projectTitle} ${projectDescription} and include these keywords: ${primaryKeywords.filter(k => k).join(', ')}, 
${secondaryKeywords.filter(k => k).join(', ')}. Please include 
the following extensions: ${selectedExtensions.map(option => option.value).join(', ')}${customTLD ? ', ' + customTLD : ''}. Also 
provide SEO Metadata & Taglines based on the prompt and domains!
        `;
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            setAiResponse(result.response.text());
        } catch (error) {
            console.error('Error generating AI response:', error);
            alert('Something went wrong while generating the response. Please try again.');
        }
        setLoading(false);
    };

    const handleBookmark = async (domainName) => {
        try {
            await axios.post('http://localhost:5050/api/bookmarks', {
                userId,
                domainName
            });
            alert('Bookmark added successfully!');
        } catch (error) {
            console.error('Error adding bookmark:', error);
            alert('Error adding bookmark. Please try again.');
        }
    };

    const extensionOptions = extensions.map((extension) => ({
        value: extension.Extension,
        label: extension.Extension,
    }));

    return (
        <div className="domain-ai-container">
            <div className="domain-ai-card">
                <h1 className="domain-ai-title">Name Initiater</h1>

                {/* Project Title */}
                <div className="form-group">
                    <label className="form-label">Project Title</label>
                    <input
                        type="text"
                        placeholder="Enter project title"
                        value={projectTitle}
                        onChange={handleProjectTitleChange}
                        className="form-input"
                    />
                </div>

                {/* Project Description */}
                <div className="form-group">
                    <label className="form-label">Project Description</label>
                    <textarea
                        placeholder="Enter project description"
                        value={projectDescription}
                        onChange={handleProjectDescriptionChange}
                        className="form-textarea"
                        rows="4"
                    />
                </div>

                {/* Primary Keywords */}
                <div className="form-group">
                    <label className="form-label">Primary Keywords (max 3)</label>
                    <div className="keywords-container">
                        {primaryKeywords.map((keyword, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Keyword ${index + 1}`}
                                value={keyword}
                                onChange={(e) => handlePrimaryKeywordChange(index, e.target.value)}
                                className="keyword-input"
                                maxLength="30"
                            />
                        ))}
                    </div>
                </div>

                {/* Secondary Keywords */}
                <div className="form-group">
                    <label className="form-label">Secondary Keywords (max 3)</label>
                    <div className="keywords-container">
                        {secondaryKeywords.map((keyword, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Keyword ${index + 1}`}
                                value={keyword}
                                onChange={(e) => handleSecondaryKeywordChange(index, e.target.value)}
                                className="keyword-input"
                                maxLength="30"
                            />
                        ))}
                    </div>
                </div>

                {/* Select Industry */}
                <div className="form-group">
                    <label className="form-label">Select Industry</label>
                    <Select
                        options={industries}
                        value={selectedIndustry}
                        onChange={setSelectedIndustry}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder="Select an Industry"
                    />
                </div>

                {/* Toggle Extensions / Custom TLD */}
                <div className="form-group toggle-container">
                    <button onClick={toggleTLDInput} className="toggle-button">
                        {showCustomTLD ? 'Select Extensions' : 'Enter Custom TLD'}
                    </button>
                </div>

                {/* Select Extensions or Enter Custom TLD */}
                {!showCustomTLD ? (
                    <div className="form-group">
                        <label className="form-label">Select Extensions</label>
                        <Select
                            isMulti
                            options={extensionOptions}
                            value={selectedExtensions}
                            onChange={setSelectedExtensions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Select multiple extensions..."
                        />
                    </div>
                ) : (
                    <div className="form-group custom-tld-group">
                        <label className="form-label">Enter Custom TLD</label>
                        <input
                            type="text"
                            placeholder="e.g., .tech, .io"
                            value={customTLD}
                            onChange={(e) => setCustomTLD(e.target.value)}
                            className="form-input"
                        />
                    </div>
                )}

                {/* Generate Button */}
                <div className="form-group toggle-container">
                    <button onClick={handleGenerate} className="generate-button">Generate</button>
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div className="loading-indicator">
                        <div className="spinner"></div>
                        <span>Generating suggestions...</span>
                    </div>
                )}

                {/* AI Response */}
                {aiResponse && (
                    <div className="response-container">
                        <h2 className="response-title">AI Generated Suggestions</h2>
                        <div className="suggestions-list">
                            {aiResponse.split('\n').filter(line => line.trim()).map((line, index) => (
                                <div key={index} className="suggestion-item">
                                    <span className="suggestion-text">{line}</span>
                                    <button 
                                        onClick={() => handleBookmark(line)} 
                                        className="bookmark-button"
                                    >
                                        Bookmark
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DomainAI;