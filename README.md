# Runtime Log Level Management UI

A React-based web interface for dynamically managing application log levels in real-time. This tool provides a user-friendly dashboard to control logging levels across different packages and classes in your application.

## Features

- 📊 Real-time log level management
- 🎯 Package/class-specific logging control
- 🎨 Intuitive color-coded interface
- 🔄 Quick reset functionality
- 🔍 Logger filtering capabilities
- 💡 Visual feedback for active log levels

## Log Levels

The application supports standard logging levels:

- `OFF` - Turn off logging
- `ERROR` - Error events that might still allow the application to continue running
- `WARN` - Potentially harmful situations
- `INFO` - Informational messages highlighting application progress
- `DEBUG` - Detailed information for debugging
- `TRACE` - Most detailed level of logging

## Getting Started

1. Install dependencies:
```bash
npm install
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
npm install react-beautiful-dnd --legacy-peer-deps
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities --force

npm install react-beautiful-dnd
npm install react-beautiful-dnd --legacy-peer-deps
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities --legacy-peer-deps

=====================================================================================
Required commands

# Install dependencies
npm install

# Install drag and drop dependencies
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities --legacy-peer-deps

# Start the development server
npm start

# Build for production
npm run build

# Run the tests
npm test

# Run the tests with coverage
npm run test:coverage

npm install -g serve

# Install React Router for navigation
npm install react-router-dom

# Install styling dependencies
npm install styled-components

# Install for handling HTTP requests
npm install axios

# Development with specific port
npm start -- --port 3001

# Build with source maps
npm run build -- --profile

# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix

# Clear npm cache if facing installation issues
npm cache clean --force

# Install dependencies with exact versions
npm ci

# Update all dependencies to latest versions
npm update

# Check for outdated packages
npm outdated

# Run in production mode locally
serve -s build

### 1. Application Overview
This is a React-based Runtime Log Level Management UI application that allows users to manage logging levels across different applications and services. The main purpose is to provide a user-friendly interface for controlling log levels in real-time.

### 2. Project Structure Core Components
1. `App.js`
- Main application component
- Uses React Router for navigation
- Contains three main routes:
  - Root path ( / ): LoggerDashboard
  - Services list ( /logger/:app/services )
  - Logger management ( /logger/:app/service/:serviceId/logs )
2. `LoggerDashboard.js`
- Displays a grid of applications (C6.4, C2.4, C4, GPDE1.10)
- Implements drag-and-drop functionality for reordering apps
- Uses DndContext for drag-and-drop operations
### 3. Configuration Files
1. `loggerConfig.js`
- Defines navigation links for different logging features
- Contains three main sections:
  - Runtime Log Level
  - Log Configuration
  - Log Analysis
2. `loggerApps.js`
- Defines the available applications
- Each app has:
  - Unique ID
  - Name
  - Description
  - Navigation links
### 4. Features
1. Log Level Management
- Supports standard logging levels:
  - OFF
  - ERROR
  - WARN
  - INFO
  - DEBUG
  - TRACE
2. Drag and Drop Functionality
- Implemented in both LoggerDashboard and ServicesList
- Uses @dnd-kit library for smooth drag-and-drop operations
- Maintains state order after reordering
3. Routing System
- Hierarchical routing structure
- Dynamic parameters for app and service IDs
- Nested navigation capabilities
### 5. Styling
The application uses a combination of:

- CSS modules
- Styled-components (as indicated in dependencies)
- Custom CSS with:
  - Gradient backgrounds
  - Responsive design
  - Interactive hover effects
  - Table styling
  - Fixed header with animation
### 6. Development Setup
- Uses Create React App
- Dependencies include:
  - axios for HTTP requests
  - styled-components for styling
  - React Router for navigation
  - Testing utilities
### 7. Areas for Improvement
1. Testing Coverage
- Current test in `App.test.js` is basic
- Need more comprehensive test coverage
2. Configuration Issues
- Logger paths in `loggerApps.js` all point to the same path ( /logger/C6.4/logs )
- Should be unique for each application
3. State Management
- Currently using local state
- Might benefit from a global state management solution for larger scale
4. Error Handling
- No visible error boundaries or error handling mechanisms
- Should implement proper error handling for API calls
### 8. Development Workflow
The project includes various npm scripts for:

- Development ( npm start )
- Testing ( npm test )
- Building ( npm run build )
- Linting ( npm run lint )
- Code coverage ( npm run test:coverage )
This application provides a solid foundation for log level management but could benefit from additional features and improvements in testing and error handling.

About This Application:

This application is a Runtime Log Level Management System that solves several critical challenges in application logging and debugging:

### Core Purpose
The application provides a centralized web interface for dynamically managing log levels across different components of a distributed system without requiring application restarts.

### Key Features
1. Hierarchical Navigation
   
   - Dashboard → Services → Environments → Regions → Logger Management
   - Allows managing logs across different deployment environments and regions
2. Dynamic Log Level Control
   
   - Real-time adjustment of log levels (ERROR, WARN, INFO, DEBUG, TRACE)
   - Supports both individual and global logger configurations
   - Temporary log level changes with automatic reset functionality
3. Smart Filtering
   
   - Search functionality for specific loggers
   - Filter options for class-only loggers
   - Filter for configured/unconfigured loggers
4. Timer-based Reset
   
   - Automatic reset of log levels after a specified duration
   - Configurable timer options (1, 2, or 3 minutes)
   - Prevents forgotten debug logs in production
### Use Cases
1. Production Debugging
   
   - Problem: Need to increase log verbosity in production without deployment
   - Solution: Temporarily increase log levels for specific components
   - Benefit: Quick troubleshooting without service interruption
2. Performance Optimization
   
   - Problem: Identify performance bottlenecks in specific regions/environments
   - Solution: Selectively enable DEBUG logs for performance-critical components
   - Benefit: Targeted debugging without overwhelming log storage
3. Security Incident Response
   
   - Problem: Need detailed logs during security investigations
   - Solution: Quickly enable TRACE level logging for security-sensitive components
   - Benefit: Rapid response to security incidents
4. Development Support
   
   - Problem: Different logging needs across environments
   - Solution: Environment-specific log level management
   - Benefit: Appropriate logging levels for each stage of development
5. Resource Management
   
   - Problem: Excessive logging impacting system performance
   - Solution: Fine-grained control over log levels with automatic reset
   - Benefit: Optimal balance between debugging needs and system performance
This application significantly improves the operational efficiency of development and support teams by providing a user-friendly interface for managing log levels across complex distributed systems.