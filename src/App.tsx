import React from 'react';
import './App.css';
import { HomePage } from './pages/home/Home';

const greeting: string = "alexeyphoto.zone";

const App: React.FC = () => {
  return (
    <div className="App">
      <HomePage title={greeting}>
        <div className="header">Header</div>
      </HomePage>
    </div>
  );
}

export default App;
