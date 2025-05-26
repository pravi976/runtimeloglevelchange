import axios from 'axios';
import { loggerEndpoints } from '../config/loggerEndpoints';

class LoggerService {
  parseLoggerData(data) {
    return data.map(item => {
      const [name, level] = item.split(' - ');
      return {
        name: name.startsWith('_') ? name.substring(1) : name,
        level: level === 'null' ? 'DEBUG' : level,
        path: name.startsWith('_') ? name.substring(1) : name
      };
    });
  }

  async getLoggers(appName) {
    try {
      const endpoint = loggerEndpoints[appName];
      if (!endpoint) {
        throw new Error(`No endpoint configured for ${appName}`);
      }
      
      const response = await axios.get(endpoint.getUrl);
      return this.parseLoggerData(response.data);
    } catch (error) {
      console.error(`Error fetching loggers for ${appName}:`, error);
      throw error;
    }
  }

  async updateLogLevel(appName, loggerName, level) {
    try {
      const endpoint = loggerEndpoints[appName];
      if (!endpoint) {
        throw new Error(`No endpoint configured for ${appName}`);
      }

      const encodedLoggerName = encodeURIComponent(loggerName);
      const response = await axios({
        method: 'post',
        url: `${endpoint.updateUrl}`,
        params: {
          LoggerName: encodedLoggerName,
          level: level
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.message === 'Network Error') {
        throw new Error('Unable to connect to the server. Please ensure the backend service is running.');
      }
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(`Failed to update logger: ${error.response.data.message || error.message}`);
      }
      throw error;
    }
  }
}

const loggerServiceInstance = new LoggerService();
export default loggerServiceInstance;