import React from 'react';
import './LoggerPage.css';

const LoggerPage = ({ app, serviceName, timerEndTime }) => {
  return (
    <div className="logger-page">
      <div className="logger-header">
        <h1>Log Level Configuration</h1>
        <p>{app} - {serviceName}</p>
      </div>
      {timerEndTime && (
        <div >
          <h3>Auto Reset Timer</h3>
          <p>{Math.ceil((timerEndTime - Date.now()) / 60000)} minutes remaining</p>
        </div>
      )}
      {/* Rest of your log level buttons */}
    </div>
  );
};

export default LoggerPage;