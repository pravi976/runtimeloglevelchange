import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import loggerService from '../services/loggerService';
import './LoggerManagement.css';

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
    const logLevels = ['OFF', 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'];

    const fetchLoggers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await loggerService.getLoggers(app);
            setLoggers(data);
            setError(null);
        } catch (err) {
            setError(`Failed to fetch loggers: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, [app]);

    useEffect(() => {
        fetchLoggers();
    }, [fetchLoggers]);

    const handleLevelChange = async (loggerPath, newLevel) => {
        try {
            await loggerService.updateLogLevel(app, loggerPath, newLevel);
            await fetchLoggers(); // Refresh the list after update
        } catch (err) {
            setError(`Failed to update logger level: ${err.message}`);
        }
    };

    const handleReset = async (loggerPath) => {
        try {
            await loggerService.updateLogLevel(app, loggerPath, 'INFO');
            await fetchLoggers();
        } catch (err) {
            setError(`Failed to reset logger: ${err.message}`);
        }
    };

    const handleFilterChange = (filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
    };

    const filteredLoggers = useMemo(() => {
        return loggers
            .filter(logger => {
                if (filters.classOnly && !logger.name.endsWith('.class')) {
                    return false;
                }
                if (filters.configured && logger.level === 'INFO') {
                    return false;
                }
                return logger.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
    }, [loggers, filters.classOnly, filters.configured, searchTerm]);

    if (loading) {
        return <div className="loading">Loading loggers...</div>;
    }

    return (
        <div className="logger-management">
            <BackButton />
            <h2>{app} Logger Management</h2>
            {error && (
                <div className="error-banner">
                    <span className="error-message">{error}</span>
                    <button className="retry-button" onClick={fetchLoggers}>Retry</button>
                </div>
            )}
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
            <div className="loggers-list">
                {filteredLoggers.map((logger, index) => (
                    <div key={`${logger.path}-${index}`} className="logger-row">
                        <span className="logger-name">{logger.name}</span>
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