import React, { useState, useEffect } from 'react';
import './LoggerManagement.css';

// Move dummyLoggers outside the component to avoid recreation on each render
const dummyLoggers = [
    {
        name: 'ROOT',
        level: 'INFO',
        path: 'root'
    },
    {
        name: 'com',
        level: 'INFO',
        path: 'com'
    },
    {
        name: 'com.baeldung',
        level: 'DEBUG',
        path: 'com.baeldung'
    },
    {
        name: 'com.baeldung.spring',
        level: 'INFO',
        path: 'com.baeldung.spring'
    },
    {
        name: 'com.baeldung.spring.boot',
        level: 'WARN',
        path: 'com.baeldung.spring.boot'
    },
    {
        name: 'com.baeldung.spring.boot.management',
        level: 'ERROR',
        path: 'com.baeldung.spring.boot.management'
    }
];

const LoggerManagement = () => {
    const [loggers, setLoggers] = useState([]);
    const [loading, setLoading] = useState(true);
    const logLevels = ['OFF', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

    useEffect(() => {
        const initializeLoggers = () => {
            setTimeout(() => {
                setLoggers(dummyLoggers);
                setLoading(false);
            }, 1000);
        };

        initializeLoggers();
    }, []); // Empty dependency array is fine now as dummyLoggers is static

    const handleLevelChange = (loggerPath, newLevel) => {
        // Simulate API call
        setLoggers(loggers.map(logger => 
            logger.path === loggerPath ? { ...logger, level: newLevel } : logger
        ));

        /* Commented out actual API call
        try {
            const response = await fetch(`http://localhost:8080/api/loggers/${loggerPath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ level: newLevel }),
            });

            if (response.ok) {
                setLoggers(loggers.map(logger => 
                    logger.path === loggerPath ? { ...logger, level: newLevel } : logger
                ));
            }
        } catch (error) {
            console.error('Error updating logger level:', error);
        }
        */
    };

    const handleReset = (loggerPath) => {
        // Simulate reset by setting to default 'INFO' level
        setLoggers(loggers.map(logger => 
            logger.path === loggerPath ? { ...logger, level: 'INFO' } : logger
        ));

        /* Commented out actual API call
        try {
            const response = await fetch(`http://localhost:8080/api/loggers/${loggerPath}/reset`, {
                method: 'POST',
            });

            if (response.ok) {
                await fetchLoggers();
            }
        } catch (error) {
            console.error('Error resetting logger:', error);
        }
        */
    };

    if (loading) {
        return <div className="loading">Loading loggers...</div>;
    }

    // Rest of the component remains the same
    return (
        <div className="logger-management">
            <div className="header">
                <div className="filters">
                    <label>
                        <input type="checkbox" /> class only
                    </label>
                    <label>
                        <input type="checkbox" /> configured
                    </label>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="Filter..." />
                </div>
            </div>
            <div className="loggers-list">
                {loggers.map((logger) => (
                    <div key={logger.path} className="logger-row">
                        <span className="logger-name">{logger.name}</span>
                        <div className="level-buttons">
                            {logLevels.map((level) => (
                                <button
                                    key={level}
                                    data-level={level}
                                    className={`level-button ${logger.level === level ? 'active' : ''}`}
                                    onClick={() => handleLevelChange(logger.path, level)}
                                >
                                    {level}
                                </button>
                            ))}
                            <button 
                                className="reset-button"
                                onClick={() => handleReset(logger.path)}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoggerManagement;