import React from 'react';
import './App.css';
import { HomePage } from './pages/home/Home';
import { ImagesList } from './components/ImagesList/ImagesList';
import { List } from 'immutable';
import { ImageModel } from './models/ImageModel';

const greeting: string = 'alexeyphoto.zone';

const testData: List<ImageModel> = List([
  new ImageModel('1', 'https://alexeyphoto.zone/assets/images/1-20180905-122358/768.jpg'),
  new ImageModel('2', 'https://alexeyphoto.zone/assets/images/2-20180907-041126/768.jpg'),
  new ImageModel('2', 'https://alexeyphoto.zone/assets/images/3-20180524-192817/768.jpg')
]);

const App: React.FC = () => {
  return (
    <div className="App">
      <HomePage title={greeting}>
        <div className="header">Header</div>
      </HomePage>
      <ImagesList images={testData} />
    </div>
  );
};

export default App;
