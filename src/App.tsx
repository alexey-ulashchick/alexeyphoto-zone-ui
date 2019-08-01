import React from 'react';
import './App.css';
import { HomePage } from './pages/home/Home';
import { ImagesList } from './components/ImagesList/ImagesList';
import { List } from 'immutable';

const greeting: string = "alexeyphoto.zone";

const App: React.FC = () => {
  return (
    <div className="App">
      <HomePage title={greeting}>
        <div className="header">Header</div>
      </HomePage>
      <ImagesList images={List([])}/>
    </div>
  );
}

export default App;
