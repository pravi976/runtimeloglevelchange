import React from 'react';
import LoggerManagement from './components/LoggerManagement';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>Spring Boot Admin</span>
      </header>
      <main>
        <LoggerManagement />
      </main>
    </div>
  );
}

export default App;
