import React, { useState } from 'react';
import './DomainStatus.css'; // Importing external CSS for styling

const DomainStatus = () => {
  const [domainName, setDomainName] = useState('');
  const [domainInfo, setDomainInfo] = useState(null);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  const fetchDomainInfo = async () => {
    setError('');
    setDomainInfo(null);
    setNotification('');

    // Regex to validate domain format (e.g., example.com)
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

    if (!domainRegex.test(domainName)) {
      setError('Please enter a valid domain name in the format: domain.extension');
      return;
    }

    try {
      const response = await fetch(`https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_EvkU4AQLg0JRJjGEe6KHxaqbHSfQ4&domainName=${domainName}&outputFormat=json`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Check if the domain is taken or available
      // Check if the WhoisRecord is present and has registryData
      if (data.WhoisRecord && data.WhoisRecord.registrant) {
        // Domain is taken
        setDomainInfo(data.WhoisRecord);
        setNotification('Domain is taken.');
      } else {
        // Domain is available
        setNotification('Domain is available for purchase!');
        setDomainInfo(null);
      }
    } catch (error) {
      setError('Failed to fetch domain information: ' + error.message);
    }
  };

  return (
    <div className="domain-status-container">
      <h1 className="title">Domain Status Checker</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter domain name (e.g., example.com)"
          value={domainName}
          onChange={(e) => setDomainName(e.target.value)}
          className="domain-input"
        />
        <button onClick={fetchDomainInfo} className="check-button">Check Status</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {notification && (
        <p className={`notification-message ${notification.includes('available') ? 'success' : 'error'}`}>
          {notification}
        </p>
      )}

      {domainInfo && (
        <div className="domain-info">
          {/* Domain Information Section */}
          <div className="info-section">
            <h2>Domain Information</h2>
            <p><strong>Domain Name:</strong> {domainInfo.domainName}</p>
            <p><strong>Registrar Name:</strong> {domainInfo.registrarName || 'REDACTED'}</p>
            <p><strong>Registrar IANA ID:</strong> {domainInfo.registrarIANAID || 'REDACTED'}</p>
            <p><strong>Created Date:</strong> {domainInfo.registryData?.createdDate ? new Date(domainInfo.registryData.createdDate).toLocaleString() : 'N/A'}</p>
            <p><strong>Updated Date:</strong> {domainInfo.registryData?.updatedDate ? new Date(domainInfo.registryData.updatedDate).toLocaleString() : 'N/A'}</p>
            <p><strong>Expires Date:</strong> {domainInfo.registryData?.expiresDate ? new Date(domainInfo.registryData.expiresDate).toLocaleString() : 'N/A'}</p>
          </div>

          {/* Registrant Information Section */}
          <div className="info-section">
            <h2>Registrant Information</h2>
            {domainInfo.registryData && domainInfo.registryData.registrant ? (
              <>
                <p><strong>Name:</strong> {domainInfo.registryData.registrant.name || 'REDACTED FOR PRIVACY'}</p>
                <p><strong>Organization:</strong> {domainInfo.registryData.registrant.organization || 'Private by Design, LLC'}</p>
                <p><strong>Street:</strong> {domainInfo.registryData.registrant.street1 || 'REDACTED FOR PRIVACY'}</p>
                <p><strong>City:</strong> {domainInfo.registryData.registrant.city || 'REDACTED FOR PRIVACY'}</p>
                <p><strong>State:</strong> {domainInfo.registryData.registrant.state || 'NC'}</p>
                <p><strong>Postal Code:</strong> {domainInfo.registryData.registrant.postalCode || 'REDACTED FOR PRIVACY'}</p>
                <p><strong>Country:</strong> {domainInfo.registryData.registrant.country || 'UNITED STATES'}</p>
              </>
            ) : (
              <p>No registrant information available (domain may be available).</p>
            )}
          </div>

          {/* Name Servers Section */}
          <div className="info-section">
            <h2>Name Servers</h2>
            {domainInfo.registryData?.nameServers?.hostNames?.length > 0 ? (
              <ul className="name-servers">
                {domainInfo.registryData.nameServers.hostNames.map((ns, index) => (
                  <li key={index}>{ns}</li>
                ))}
              </ul>
            ) : (
              <p>No name servers found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainStatus;