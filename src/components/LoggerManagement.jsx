import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import loggerService from '../services/loggerService';
import './LoggerManagement.css';
// Remove unused LoggerPage import

const timerOptions = [1, 2, 3]; // Timer duration options in minutes
const logLevels = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE']; // Available log levels

const LoggerManagement = () => {
    const { app } = useParams();
    const [loggers, setLoggers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        classOnly: false,
        configured: false
    });
    const [filteredLoggers, setFilteredLoggers] = useState([]);
    const [globalTimer, setGlobalTimer] = useState(1);
    const [originalLevels, setOriginalLevels] = useState({});
    const [timerEndTime, setTimerEndTime] = useState(null);
    const [activeTimer, setActiveTimer] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [lastChangedLogger, setLastChangedLogger] = useState(null);

    const fetchLoggers = useCallback(async () => {
        try {
            const data = await loggerService.getLoggers(app);
            setLoggers(data);
            setFilteredLoggers(data);
            setLoading(false);
            // Store original levels for reset functionality
            const levels = {};
            data.forEach(logger => {
                levels[logger.path] = logger.level;
            });
            setOriginalLevels(levels);
        } catch (err) {
            setError(`Failed to fetch loggers: ${err.message}`);
            setLoading(false);
        }
    }, [app, setLoading]); // Add setLoading to the dependency array

    useEffect(() => {
        const filtered = loggers.filter(logger => {
            const matchesSearch = logger.path.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesClassOnly = !filters.classOnly || (
                logger.path.toLowerCase().includes('.class') ||
                logger.path.toLowerCase().includes('class.')
            );
            const matchesConfigured = !filters.configured || logger.configured === true;
            return matchesSearch && matchesClassOnly && matchesConfigured;
        });
        setFilteredLoggers(filtered);
    }, [searchTerm, filters, loggers]);

    useEffect(() => {
        fetchLoggers();
    }, [fetchLoggers]);

    const resetAllLogLevels = async () => {
        try {
            // Only reset the ROOT logger to its original level
            if (originalLevels['ROOT']) {
                await loggerService.updateLogLevel(app, 'ROOT', originalLevels['ROOT']);
            }
            await fetchLoggers();
        } catch (err) {
            setError(`Failed to reset log levels: ${err.message}`);
        }
    };

    const handleFilterChange = (filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    useEffect(() => {
        let interval;
        if (timerEndTime) {
            interval = setInterval(() => {
                const remaining = timerEndTime - Date.now();
                if (remaining <= 0) {
                    setTimeRemaining(null);
                    clearInterval(interval);
                } else {
                    const minutes = Math.floor(remaining / 60000);
                    const seconds = Math.floor((remaining % 60000) / 1000);
                    setTimeRemaining({ minutes, seconds });
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerEndTime]);

    const handleLevelChange = async (loggerPath, newLevel) => {
        try {
            await loggerService.updateLogLevel(app, loggerPath, newLevel);
            
            // Clear existing timer if any
            if (activeTimer) {
                clearTimeout(activeTimer);
            }

            // Start new timer
            const timer = setTimeout(async () => {
                if (loggerPath === 'ROOT') {
                    await resetAllLogLevels();
                } else {
                    // Reset only the specific logger to 'INFO' level
                    await loggerService.updateLogLevel(app, loggerPath, 'INFO');
                }
                setTimerEndTime(null);
                setActiveTimer(null);
                setTimeRemaining(null);
                setLastChangedLogger(null);
                await fetchLoggers(); // Fetch latest data after timer reset
            }, globalTimer * 60000);

            setActiveTimer(timer);
            setTimerEndTime(new Date(Date.now() + globalTimer * 60000));
            setLastChangedLogger({ path: loggerPath, level: newLevel });
            await fetchLoggers(); // Fetch latest data immediately after level change
        } catch (err) {
            setError(`Failed to update logger level: ${err.message}`);
        }
    };

    const handleResetLoggerLevel = async (loggerPath) => {
        try {
            // Set the log level to 'INFO' when the individual reset button is clicked
            await loggerService.updateLogLevel(app, loggerPath, 'INFO');
            await fetchLoggers(); // Refresh the list to show the updated level from the backend
        } catch (err) {
            setError(`Failed to reset logger level for ${loggerPath}: ${err.message}`);
        }
    };

    return (
        <div className="logger-management">
            <BackButton />
            <h2>{app} Logger Management</h2>
            {loading ? (
                <div className="loading">Loading loggers...</div>
            ) : (
                <>
                    <div className="header">
                        <div className="filters">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={filters.classOnly}
                                    onChange={() => handleFilterChange('classOnly')}
                                /> class only
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={filters.configured}
                                    onChange={() => handleFilterChange('configured')}
                                /> configured
                            </label>
                        </div>
                        <div className="search-box">
                            <input 
                                type="text" 
                                placeholder="Filter..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="global-timer-control">
                        <div className="timer-label">Select required log level duration</div>
                        <select
                            className="timer-select"
                            value={globalTimer}
                            onChange={(e) => setGlobalTimer(parseInt(e.target.value))}
                        >
                            {timerOptions.map(min => (
                                <option key={min} value={min}>{min} minute{min > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                        {timeRemaining && (
                            <div className="timer-info">
                                <div className="time-display">
                                    Time remaining: {timeRemaining.minutes}m {timeRemaining.seconds}s
                                </div>
                                {lastChangedLogger && (
                                    <div className="level-display">
                                        Changed level: {lastChangedLogger.path.split('.').pop()}: {lastChangedLogger.level}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="reset-button-container">
                        <button className="reset-button" onClick={resetAllLogLevels}>Reset All Log Levels</button>
                    </div>
                    {error && (
                        <div className="error-banner">
                            <span className="error-message">{error}</span>
                            <button className="retry-button" onClick={fetchLoggers}>Retry</button>
                        </div>
                    )}
                    {/* <LoggerPage 
                        app={app}
                        timerEndTime={timerEndTime}
                    /> */}
                    <div className="loggers-list">
                        {filteredLoggers.map((logger, index) => (
                            <div key={`${logger.path}-${index}`} className="logger-row">
                                <span className="logger-name">{logger.name}</span>
                                <div className="logger-actions"> {/* New container for buttons */}
                                    <div className="level-buttons">
                                        {logLevels.map((level) => (
                                            <button
                                                key={`${logger.path}-${level}`}
                                                data-level={level}
                                                className={`level-button ${logger.level === level ? 'active' : ''}`}
                                                onClick={() => handleLevelChange(logger.path, level)}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        className="reset-single-logger-button"
                                        onClick={() => handleResetLoggerLevel(logger.path)}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LoggerManagement;